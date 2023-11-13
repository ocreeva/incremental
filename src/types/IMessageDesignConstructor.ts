import IMessageDesign from './IMessageDesign';
import OperationView from './OperationView';

declare interface IMessageDesignConstructor {
    /**
     * Constructs a message design incorporating the operation's view state.
     * 
     * @param operation - The command's view state.
     * 
     * @returns The message design.
     */
    new(operation: OperationView): IMessageDesign;
}

export default IMessageDesignConstructor;
