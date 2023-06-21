import type ConceptDesign from './ConceptDesign';

/**
 * Provides the gameplay data for a game concept.
 * 
 * @type ConceptData
 * @design {TDesign} The game concept's design.
 */
type ConceptData<TDesign extends ConceptDesign> = {
    readonly design: TDesign;
};

export default ConceptData;
