import { ModelStatus } from '@/constants/worker';
import { assert } from '@/core';
import type { EntityId, RoutineState } from '@/types';
import type { IDeltaValue, IGameContext, IRoutineModel, ISubroutineModel } from '@/types/model';

import SubroutineModel from './SubroutineModel';

/**
 * Provides the gameplay model for a Routine.
 */
class RoutineModel implements IRoutineModel {
    private readonly state: RoutineState;

    public constructor() {
        this.state = {
            id: crypto.randomUUID(),
            subroutines: [ ],
            duration: 0,
            elapsed: 0,
        };
    }

    public get id(): EntityId { return this.state.id; }

    public get subroutines(): EntityId[] { return this.state.subroutines; }

    public get duration(): number { return this.state.duration; }
    public set duration(duration: number) {
        if (this.state.duration === duration) return;

        this.state.duration = duration;
        this.game.synchronization.updateRoutine({ duration });
    }

    public get elapsed(): number { return this.state.elapsed; }
    private set elapsed(elapsed: number) {
        if (this.state.elapsed === elapsed) return;

        this.state.elapsed = elapsed;
        this.game.synchronization.updateRoutine({ elapsed });
    }

    private _status: ModelStatus = ModelStatus.idle;
    public get status(): ModelStatus { return this._status; }
    private set status(value: ModelStatus) { this._status = value; }

    private _game?: IGameContext;
    protected get game(): IGameContext {
        assert(this._game, "OperationModel 'game' property accessed before initialization.");
        return this._game;
    }
    private set game(value: IGameContext) { this._game = value; }

    public async allocateSubroutineAsync(scriptId: EntityId): Promise<EntityId> {
        this.assertStatus(ModelStatus.loading, ModelStatus.active);

        let subroutine = this.subroutines
            .map(subroutineId => this.game.getSubroutine(subroutineId))
            .find(_ => _.status === ModelStatus.idle);
        if (!subroutine) {
            if (this.game.subroutines.size < 4) {
                subroutine = new SubroutineModel(this.id);
            } else {
                throw Error('Unable to allocate a new subroutine.');
            }
        }

        await subroutine.initializeAsync(this.game, scriptId);

        return subroutine.id;
    }

    public async initializeAsync(game: IGameContext, scriptId: EntityId): Promise<void> {
        this.assertStatus(ModelStatus.idle);
        this.status = ModelStatus.loading;

        this.game = game;
        this.game.synchronization.setRoutine(this.state);

        const subroutineId = await this.allocateSubroutineAsync(scriptId);
        this.subroutines.push(subroutineId);

        this.assertStatus(ModelStatus.loading);
        this.status = ModelStatus.pending;
    }

    public start(time: number) {
        this.assertStatus(ModelStatus.pending);

        this.subroutines
            .map(subroutineId => this.game.getSubroutine(subroutineId))
            .forEach(subroutine => {
                switch (subroutine.status) {
                    case ModelStatus.pending: {
                        subroutine.start(time);
                        this.duration = Math.max(this.duration, subroutine.duration);
                        break;
                    }
                }
            });

        this.status = ModelStatus.active;
    }

    public synchronize(time: number) {
        this.assertStatus(ModelStatus.active);

        this.subroutines
            .map(subroutineId => this.game.getSubroutine(subroutineId))
            .forEach(subroutine => {
                switch (subroutine.status) {
                    case ModelStatus.active:
                    case ModelStatus.complete: {
                        subroutine.synchronize(time);
                    }
                }
            });

        this.game.synchronization.routineIsComplete = !this.subroutines
            .map(subroutineId => this.game.getSubroutine(subroutineId))
            .some(subroutine => subroutine.status === ModelStatus.active);
    }

    public finalize(time: number) {
        this.assertStatus(ModelStatus.active);

        this.subroutines
            .map(subroutineId => this.game.getSubroutine(subroutineId))
            .forEach(subroutine => {
                switch (subroutine.status) {
                    case ModelStatus.complete:
                    case ModelStatus.idle:
                        subroutine.finalize(time);
                        break;
    
                    default:
                        throw Error(`RoutineModel.finalize called while subroutine (${subroutine.id}) has '${subroutine.status}' status.`);
                }
            });

        this.status = ModelStatus.final;
    }

    public abort(time: number) {
        this.assertStatus(ModelStatus.active);

        this.subroutines
            .map(subroutineId => this.game.getSubroutine(subroutineId))
            .forEach(subroutine => {
                switch (subroutine.status) {
                    case ModelStatus.complete:
                    case ModelStatus.idle:
                        // gracefully finalize if we can
                        subroutine.finalize(time);
                        break;
    
                    case ModelStatus.active:
                    case ModelStatus.loading:
                    case ModelStatus.pending:
                        subroutine.abort(time);
                        break;
    
                    default:
                        throw Error(`RoutineModel.abort called while subroutine (${subroutine.id}) has '${subroutine.status}' status.`);
                }
            });

        this.status = ModelStatus.final;
    }

    public update(timeDelta: IDeltaValue) {
        this.assertStatus(ModelStatus.active);

        const resolvedSubroutines = this.subroutines.map(subroutineId => this.game.getSubroutine(subroutineId));

        const handleSubroutine = (subroutine: ISubroutineModel) => {
            timeDelta.reset();
            subroutine.update(timeDelta);
            if (timeDelta.hasUnallocated) {
                subroutine.finalize(timeDelta.total);
            }
        };

        // handle the complete subroutines first, so they can be re-allocated if needed
        resolvedSubroutines
            .filter(subroutine => subroutine.status === ModelStatus.complete)
            .forEach(handleSubroutine);
        resolvedSubroutines
            .filter(subroutine => subroutine.status === ModelStatus.active)
            .forEach(handleSubroutine);

        this.elapsed += timeDelta.originalDelta;
    }

    private assertStatus(...expected: ModelStatus[]): void {
        assert(expected.includes(this.status), `Subroutine status '${this.status}' not in expected value(s): ${expected}`);
    }
}

export default RoutineModel;
