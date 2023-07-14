import type EntityState from '@/types/EntityState';

/**
 * Provides the gameplay model for an instance of a game concept.
 */
abstract class ConceptModel<TState extends EntityState> {
    public readonly state: TState;

    /**
     * @param {TState} state - The instance's UI state.
     */
    constructor(state: TState) {
        this.state = state;
    }
}

export default ConceptModel;
