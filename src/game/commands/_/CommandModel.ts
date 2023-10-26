import { EntityId } from '@reduxjs/toolkit';

import { MaxLevelByRole, CommandId } from '@/constants';
import { ModelStatus } from '@/constants/worker';
import { assert, EventEmitter } from '@/core';
import { getDefaultCommandView } from '@/game/commands/view';
import { CommandData, CommandView, InstructionData } from '@/types';
import { EventKey, EventReceiver, IEventEmitter } from '@/types/event';
import { ICommandModel, ICommandModelEventable, IDeltaValue, IGameContext, IOperationModel } from '@/types/model';
import { getCommandDataAsync } from '@/worker/client';

import createCommandRecord from './createCommandRecord';

declare interface IOperationModelConstructor {
    new (command: ICommandModel, parentRoutineId: EntityId, parentSubroutineId: EntityId): IOperationModel;
}

abstract class CommandModel implements ICommandModel {
    private readonly operationModel?: IOperationModelConstructor;

    private events: IEventEmitter<ICommandModelEventable> = new EventEmitter<ICommandModelEventable>();
    private data: CommandData;
    private view: CommandView;

    protected constructor(id: CommandId, operationModel?: IOperationModelConstructor) {
        this.id = id;
        this.data = { id };
        this.view = getDefaultCommandView(id);

        this.operationModel = operationModel;
    }

    // define standard pattern for commands which level in discrete steps (i.e. not via accumulation)
    protected readonly shouldRetainLevel: boolean = false;

    // define standard pattern for accumulating time
    protected readonly shouldAccumulateTime: boolean = false;
    protected readonly accumulateMultiplier: number = 1;
    private get sublevelAccumulationFactor(): number { return 420 * this.accumulateMultiplier; }
    private get levelAccumulationFactor(): number { return 15 * this.sublevelAccumulationFactor; }

    // define standard pattern for unlocking a command (isEnabled)
    protected readonly unlockCommandId?: CommandId;
    protected readonly unlockLevel: number = 0;
    protected readonly unlockVisibleSublevel: number = 1;
    protected readonly unlockEnabledSublevel: number = 2;

    public readonly id: CommandId;

    protected get isEnabled(): boolean { return this.view.isEnabled; }
    protected set isEnabled(isEnabled: boolean) {
        if (this.view.isEnabled === isEnabled) return;
        assert(!isEnabled || this.isVisible, `Unexpected command (${this.id}) is enabled but not visible.`);

        this.view.isEnabled = isEnabled;
        this.game.synchronization.updateCommandView(this.id, { isEnabled });

        if (isEnabled && this.unlockCommandId !== undefined) {
            const unlockCommand = this.game.commands[this.unlockCommandId];
            unlockCommand.off('level', this.handleUnlockCheckByLevel);
            unlockCommand.off('sublevel', this.handleUnlockCheckBySublevel);
        }
    }

    protected get isVisible(): boolean { return this.view.isVisible; }
    protected set isVisible(isVisible: boolean) {
        if (this.view.isVisible === isVisible) return;

        this.view.isVisible = isVisible;
        this.game.synchronization.updateCommandView(this.id, { isVisible });
    }

    public get level(): number { return this.view.level; }
    protected set level(level: number) {
        if (this.view.level === level) return;

        this._sublevel = 0;
        this.view.level = level;
        this.game.synchronization.updateCommandView(this.id, { level });

        if (this.shouldRetainLevel && (this.data.level !== level)) {
            this.data.level = level;
            this.game.synchronization.updateCommandData(this.id, { level });
        }

        this.events.emit('level', level);
    }

    private _sublevel = 0;
    public get sublevel(): number { return this._sublevel; }
    protected set sublevel(value: number) {
        const sublevel = Math.max(0, Math.min(value, 5));
        if (this._sublevel === sublevel) return;

        if (sublevel === 5) {
            this.level += 1;
        } else {
            this._sublevel = sublevel;
            this.events.emit('sublevel', sublevel);
        }
    }

    protected get progress(): number { return this.view.progress; }
    protected set progress(progress: number) {
        if (this.view.progress === progress) return;

        this.view.progress = progress;
        this.game.synchronization.updateCommandView(this.id, { progress });
    }

    private _status: ModelStatus = ModelStatus.idle;
    public get status(): ModelStatus { return this._status; }
    private set status(value: ModelStatus) { this._status = value; }

    private _game?: IGameContext;
    protected get game() {
        assert(this._game, "CommandModel 'game' property accessed before initialization.");
        return this._game;
    }
    private set game(game: IGameContext) { this._game = game; }

    public on<K extends EventKey<ICommandModelEventable>>(name: K, receiver: EventReceiver<ICommandModelEventable[K]>) {
        this.events.on(name, receiver);
    }

    public off<K extends EventKey<ICommandModelEventable>>(name: K, receiver: EventReceiver<ICommandModelEventable[K]>) {
        this.events.off(name, receiver);
    }

    public start(_time: number, _operationId: EntityId): void {
        this.assertStatus(ModelStatus.active);
    }

    public synchronize(_time: number): void {
        this.assertStatus(ModelStatus.active);
    }

    private handleUnlockCheckByLevel: (level: number) => void
    = ((_this: CommandModel) => {
        return (level: number) => {
            if (level < _this.unlockLevel) return;
            if (level > _this.unlockLevel) {
                _this.isVisible = true;
                _this.isEnabled = true;
                return;
            }
    
            assert(_this.unlockCommandId, `Unexpected command (${_this.id}) 'handleUnlockCheckByLevel' with undefined 'unlockCommandId'.`);
            const unlockCommand = _this.game.commands[_this.unlockCommandId];
            unlockCommand.on('sublevel', _this.handleUnlockCheckBySublevel);
            _this.handleUnlockCheckBySublevel(unlockCommand.sublevel);
        };
    })(this);

    private handleUnlockCheckBySublevel: (sublevel: number) => void
    = ((_this: CommandModel) => {
        return (sublevel: number) => {
            if (sublevel >= _this.unlockVisibleSublevel) {
                _this.isVisible = true;
            }
    
            if (sublevel >= _this.unlockEnabledSublevel) {
                _this.isEnabled = true;
            }
            };
    })(this);

    public finalize(_time: number, _operationId: EntityId): void {
        this.assertStatus(ModelStatus.active);
    }

    public abort(_time: number, _operationId: EntityId): void {
        this.assertStatus(ModelStatus.active);
    }

    public update(timeDelta: IDeltaValue, operationId: EntityId): void {
        this.assertStatus(ModelStatus.active);

        this.update_accumulateTime(timeDelta, operationId);
    }

    private update_accumulateTime(timeDelta: IDeltaValue, operationId: EntityId) {
        if (!this.shouldAccumulateTime) return;

        const { role } = this.game.getOperation(operationId);
        const maxLevel = MaxLevelByRole[role];

        // level changes occur along multiples of twice the level accumulation factor; allocate using steps along this
        // threshold to ensure we don't allocate beyond the max level
        const threshold = 2 * this.levelAccumulationFactor;
        while (timeDelta.hasUnallocated && (this.level < maxLevel)) {
            const current = this.data.time ?? 0;
            this.data.time = current + timeDelta.allocate(threshold - (current % threshold));
            this.game.synchronization.updateCommandData(this.id, { time: this.data.time });
            this.recalculateLevelFromTime();
        }
    }

    public async createOperationAsync(
        instruction: InstructionData,
        parentRoutineId: EntityId,
        parentSubroutineId: EntityId,
    ): Promise<EntityId> {
        this.assertStatus(ModelStatus.active);

        assert(this.operationModel !== undefined, `Unexpected command (${this.id}) constructing operation with undefined operation model.`);

        const operation = new this.operationModel(this, parentRoutineId, parentSubroutineId);
        this.game.operations.set(operation.id, operation);

        await operation.initializeAsync(this.game, instruction);

        return operation.id;
    }

    public async initializeAsync(game: IGameContext): Promise<void> {
        this.assertStatus(ModelStatus.idle);
        this.status = ModelStatus.loading;

        this.game = game;
        ({ commandData: this.data } = await getCommandDataAsync(this.game.messageService, { commandId: this.id }));
        this.view = getDefaultCommandView(this.id);

        if (this.shouldRetainLevel && (this.data.level !== undefined)) {
            this.level = this.data.level;
        }

        if (this.shouldAccumulateTime && (this.data.time !== undefined)) {
            this.recalculateLevelFromTime();
        }

        if (this.unlockCommandId !== undefined) {
            const unlockCommand = this.game.commands[this.unlockCommandId];
            unlockCommand.on('level', this.handleUnlockCheckByLevel);
            this.handleUnlockCheckByLevel(unlockCommand.level);
        }

        this.assertStatus(ModelStatus.loading);
        this.status = ModelStatus.active;
    }

    public reset(): void {
        this.assertStatus(ModelStatus.active);

        this.data = { id: this.id };
        this.view = getDefaultCommandView(this.id);

        this._sublevel = 0;

        if (this.unlockCommandId !== undefined) {
            const unlockCommand = this.game.commands[this.unlockCommandId];
            unlockCommand.off('level', this.handleUnlockCheckByLevel);
            unlockCommand.off('sublevel', this.handleUnlockCheckBySublevel);
        }

        this.status = ModelStatus.idle;
    }

    protected assertInstructionMatches(instruction: InstructionData): void {
        const { commandId } = instruction;
        assert(commandId === this.id, `Instruction for command '${commandId}' does not match expected command '${this.id}'.`);
    }

    private assertStatus(...expected: ModelStatus[]): void {
        assert(expected.includes(this.status), `Command status '${this.status}' not in expected value(s): ${expected}`);
    }

    private recalculateLevelFromTime(): void {
        if (!this.shouldAccumulateTime) return;
        if (this.data.time === undefined) return;

        this.level = this.findAccumulationRoot(this.data.time / (this.levelAccumulationFactor));

        this.sublevel = this.findAccumulationRoot(this.data.time / (this.sublevelAccumulationFactor * (this.level + 1)) - 15 * this.level);

        this.progress = this.data.time / (10 * this.sublevelAccumulationFactor * (this.level + 1) * (this.sublevel + 1)) + this.sublevel / 10 - 1.5 * this.level / (this.sublevel + 1);
    }

    private findAccumulationRoot(value: number): number {
        assert(value >= 0 && value <= 30, `Unexpected value (${value}) in 'findAccumulationRoot'.`);
        return Math.floor(Math.sqrt(value + 0.25) - 0.5);
    }
}

export const [getModels, registerModel] = createCommandRecord<ICommandModel>();
export default CommandModel;
