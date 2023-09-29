import { type CommandId } from '@/constants';
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

        this.view.level = level;
        this.game.synchronization.updateCommandView(this.id, { level });
        this.events.emit('level', level);
    }

    private static _sublevel = 0;
    public static get sublevel(): number { return this._sublevel; }
    protected static set sublevel(sublevel: number) {
        if (this._sublevel === sublevel) return;

        this._sublevel = sublevel;
        this.events.emit('sublevel', sublevel);
    }

    protected static get progress(): number { return this.view.progress; }
    protected static set progress(progress: number) {
        if (this.view.progress === progress) return;

        this.view.progress = progress;
        this.game.synchronization.updateCommandView(this.id, { progress });

        this.sublevel = Math.floor(progress / 0.2);
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

    public static start(_operationId: EntityId, _time: number): void {
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

    public static finalize(_operationId: EntityId, _time: number): void {
        this.assertStatus(ModelStatus.active);
    }

    public static abort(_operationId: EntityId, _time: number): void {
        this.assertStatus(ModelStatus.active);
    }

    public static update(_completion: IDeltaValue, _operationId: EntityId, _time: number): void {
        this.assertStatus(ModelStatus.active);
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

    protected static initializeView(): void {
        this.assertStatus(ModelStatus.loading);

        this.view = getDefaultCommandView(this.id);
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
}

export const [getModels, registerModel] = createCommandRecord<ICommandModel>();
export default CommandModel;
