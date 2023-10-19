import { MaxLevelByRole, type CommandId } from '@/constants';
import { ModelStatus } from '@/constants/worker';
import { assert, EventEmitter } from '@/core';
import { getDefaultCommandView } from '@/game/commands/view';
import type { CommandData, CommandView, EntityId, InstructionState } from '@/types';
import type { EventKey, EventReceiver, IEventEmitter } from '@/types/event';
import type { ICommandModel, ICommandModelEventable, IDeltaValue, IGameContext, IOperationModel } from '@/types/model';
import { getCommandDataAsync } from '@/worker/client';

import createCommandRecord from './createCommandRecord';
import OperationModel from './OperationModel';

//@staticImplements<ICommandModel>()
abstract class CommandModel extends OperationModel {
    private static readonly events: IEventEmitter<ICommandModelEventable> = new EventEmitter<ICommandModelEventable>();
    private static data: CommandData;
    private static view: CommandView;

    // define standard pattern for accumulating time
    protected static readonly shouldAccumulateTime: boolean = false;
    protected static readonly accumulateMultiplier: number = 1;
    private static get sublevelAccumulationFactor(): number { return 420 * this.accumulateMultiplier; }
    private static get levelAccumulationFactor(): number { return 15 * this.sublevelAccumulationFactor; }

    // define standard pattern for unlocking a command (isEnabled)
    protected static readonly unlockCommandId?: CommandId;
    protected static readonly unlockLevel: number = 0;
    protected static readonly unlockVisibleSublevel: number = 1;
    protected static readonly unlockEnabledSublevel: number = 2;

    protected static get isEnabled(): boolean { return this.view.isEnabled; }
    protected static set isEnabled(isEnabled: boolean) {
        if (this.view.isEnabled === isEnabled) return;

        this.view.isEnabled = isEnabled;
        this.game.synchronization.updateCommandView(this.id, { isEnabled });
    }

    protected static get isVisible(): boolean { return this.view.isVisible; }
    protected static set isVisible(isVisible: boolean) {
        if (this.view.isVisible === isVisible) return;

        this.view.isVisible = isVisible;
        this.game.synchronization.updateCommandView(this.id, { isVisible });
    }

    public static get level(): number { return this.view.level; }
    protected static set level(level: number) {
        if (this.view.level === level) return;

        this._sublevel = 0;
        this.view.level = level;
        this.game.synchronization.updateCommandView(this.id, { level });
        this.events.emit('level', level);
    }

    private static _sublevel = 0;
    public static get sublevel(): number { return this._sublevel; }
    protected static set sublevel(value: number) {
        const sublevel = Math.max(0, Math.min(value, 5));
        if (this._sublevel === sublevel) return;

        if (sublevel === 5) {
            this.level += 1;
        } else {
            this._sublevel = sublevel;
            this.events.emit('sublevel', sublevel);
        }
    }

    protected static get progress(): number { return this.view.progress; }
    protected static set progress(progress: number) {
        if (this.view.progress === progress) return;

        this.view.progress = progress;
        this.game.synchronization.updateCommandView(this.id, { progress });
    }

    private static _status: ModelStatus = ModelStatus.idle;
    public static get status(): ModelStatus { return this._status; }
    private static set status(value: ModelStatus) { this._status = value; }

    private static _game?: IGameContext;
    protected static get game() {
        assert(this._game, "CommandModel 'game' property accessed before initialization.");
        return this._game;
    }
    private static set game(game: IGameContext) { this._game = game; }

    public static on<K extends EventKey<ICommandModelEventable>>(name: K, receiver: EventReceiver<ICommandModelEventable[K]>) {
        this.events.on(name, receiver);
    }

    public static off<K extends EventKey<ICommandModelEventable>>(name: K, receiver: EventReceiver<ICommandModelEventable[K]>) {
        this.events.off(name, receiver);
    }

    public static start(_time: number, _operationId: EntityId): void {
        this.assertStatus(ModelStatus.active);
    }

    public static synchronize(_time: number): void {
        this.assertStatus(ModelStatus.active);

        this.synchronize_unlock();
    }

    private static synchronize_unlock(): void {
        if (this.isEnabled) return;
        if (!this.unlockCommandId) return;

        const { level, sublevel } = this.game.commands[this.unlockCommandId];
        if (level < this.unlockLevel) return;
        if (level > this.unlockLevel) {
            this.isVisible = true;
            this.isEnabled = true;
            return;
        }

        if (sublevel >= this.unlockVisibleSublevel) {
            this.isVisible = true;
        }

        if (sublevel >= this.unlockEnabledSublevel) {
            this.isEnabled = true;
        }
    }

    public static finalize(_time: number, _operationId: EntityId): void {
        this.assertStatus(ModelStatus.active);
    }

    public static abort(_time: number, _operationId: EntityId): void {
        this.assertStatus(ModelStatus.active);
    }

    public static update(timeDelta: IDeltaValue, operationId: EntityId): void {
        this.assertStatus(ModelStatus.active);

        this.update_accumulateTime(timeDelta, operationId);
    }

    private static update_accumulateTime(timeDelta: IDeltaValue, operationId: EntityId) {
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

    public static async createOperationAsync(
        instruction: InstructionState,
        parentRoutineId: EntityId,
        parentSubroutineId: EntityId,
    ): Promise<EntityId> {
        this.assertStatus(ModelStatus.active);

        const operation = this.constructOperation(parentRoutineId, parentSubroutineId);
        this.game.operations.set(operation.id, operation);

        await operation.initializeAsync(this.game, instruction);

        return operation.id;
    }

    public static async initializeAsync(game: IGameContext): Promise<void> {
        this.assertStatus(ModelStatus.idle);
        this.status = ModelStatus.loading;

        this.game = game;
        ({ commandData: this.data } = await getCommandDataAsync(this.game.messageService, { commandId: this.id }));
        this.initializeView();

        this.assertStatus(ModelStatus.loading);
        this.status = ModelStatus.active;
    }

    public static reset(): void {
        this.assertStatus(ModelStatus.active);

        this.data = { id: this.id };
        this.view = getDefaultCommandView(this.id);

        this._sublevel = 0;

        this.status = ModelStatus.idle;
    }

    protected static initializeView(): void {
        this.assertStatus(ModelStatus.loading);

        this.view = getDefaultCommandView(this.id);

        if (this.shouldAccumulateTime && (this.data.time !== undefined)) {
            this.recalculateLevelFromTime();
        }
    }

    protected static assertInstructionMatches(instruction: InstructionState): void {
        const { commandId } = instruction;
        assert(commandId === this.id, `Instruction for command '${commandId}' does not match expected command '${this.id}'.`);
    }

    protected static constructOperation(_parentRoutineId: EntityId, _parentSubroutineId: EntityId): IOperationModel {
        throw Error(`Command '${this.id}' does not support operations.`);
    }

    private static assertStatus(...expected: ModelStatus[]): void {
        assert(expected.includes(this.status), `Command status '${this.status}' not in expected value(s): ${expected}`);
    }

    private static recalculateLevelFromTime(): void {
        if (!this.shouldAccumulateTime) return;
        if (this.data.time === undefined) return;

        this.level = this.findAccumulationRoot(this.data.time / (this.levelAccumulationFactor));

        this.sublevel = this.findAccumulationRoot(this.data.time / (this.sublevelAccumulationFactor * (this.level + 1)) - 15 * this.level);

        this.progress = this.data.time / (10 * this.sublevelAccumulationFactor * (this.level + 1) * (this.sublevel + 1)) + this.sublevel / 10 - 1.5 * this.level / (this.sublevel + 1);
    }

    private static findAccumulationRoot(value: number): number {
        assert(value >= 0 && value <= 30, `Unexpected value (${value}) in 'findAccumulationRoot'.`);
        return Math.floor(Math.sqrt(value + 0.25) - 0.5);
    }
}

export const [getModels, registerModel] = createCommandRecord<ICommandModel>();
export default CommandModel;
