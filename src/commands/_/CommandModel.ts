import { ModelStatus } from '@/constants/worker';
import { assert } from '@/core';
import type { CommandState, EntityId, InstructionState } from '@/types';
import type { ICommandModel, IDeltaValue, IGameContext, IOperationModel } from '@/types/model';
import { getCommandAsync } from '@/worker/client';

import createCommandRecord from './createCommandRecord';
import OperationModel from './OperationModel';

//@staticImplements<ICommandModel>()
abstract class CommandModel extends OperationModel {
    public static get isInLexicon(): boolean { return this.state.isInLexicon ?? false; }
    protected static set isInLexicon(isInLexicon: boolean) {
        if (this.state.isInLexicon === isInLexicon) return;

        this.state.isInLexicon = isInLexicon;
        this.game.synchronization.upsertCommand({ id: this.id, isInLexicon });
    }

    public static get level(): number { return this.state.level ?? 0; }
    protected static set level(level: number) {
        if (this.state.level === level) return;

        this.state.level = level;
        this.game.synchronization.upsertCommand({ id: this.id, level });
    }

    public static get progress(): number { return this.state.progress ?? 0; }
    protected static set progress(progress: number) {
        if (this.state.progress === progress) return;

        this.state.progress = progress;
        this.game.synchronization.upsertCommand({ id: this.id, progress });
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

    private static _state: CommandState;
    protected static get state(): CommandState { return this._state; }
    private static set state(value: CommandState) { this._state = value; }

    public static start(_time: number): void {
        this.assertStatus(ModelStatus.active);
    }

    public static synchronize(_time: number): void {
        this.assertStatus(ModelStatus.active);
    }

    public static finalize(_time: number): void {
        this.assertStatus(ModelStatus.active);
    }

    public static abort(_time: number): void {
        this.assertStatus(ModelStatus.active);
    }

    public static update(_time: IDeltaValue, _completion: IDeltaValue): void {
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
        ({ command: this.state } = await getCommandAsync(this.game.messageService, { commandId: this.id }));

        this.assertStatus(ModelStatus.loading);
        this.status = ModelStatus.active;
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