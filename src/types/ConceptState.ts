import ConceptModel from './ConceptModel';

/**
 * Provides the gameplay state for an instance of a game concept.
 */
abstract class ConceptState<TModel extends ConceptModel> {
    private _model: TModel;

    constructor(model: TModel) {
        this._model = model;
    }

    /**
     * Get the state's unique ID.
     * 
     * @returns {string} The unique ID.
     */
    public get id(): string { return this._model.key; }

    /**
     * Get the instance's model.
     * 
     * @return {TModel} The model.
     */
    public get model(): TModel { return this._model; }
}

export default ConceptState;
