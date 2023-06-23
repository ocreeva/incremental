import type ConceptState from './ConceptState';

/**
 * Provides the gameplay model for an instance of a game concept.
 */
abstract class ConceptModel<TState extends ConceptState> {
    public readonly state: TState;

    /**
     * @param {TState} state - The instance's UI state.
     */
    constructor(state: TState) {
        this.state = state;
    }
}

export default ConceptModel;
