import type { EntityState, GameModel, TimeContext, UpdateContext } from '@/types';

/**
 * Provides the gameplay model for an instance of a game concept.
 */
abstract class ConceptModel<TState extends EntityState> implements GameModel {
    public readonly state: TState;

    /**
     * @param {TState} state - The instance's UI state.
     */
    constructor(state: TState) {
        this.state = state;
    }

    public abstract start(context: UpdateContext): void;
    public abstract update(context: UpdateContext): void;
    public abstract finalize(context: UpdateContext): void;
    public abstract progress(context: UpdateContext, time: TimeContext): void;
}

export default ConceptModel;
