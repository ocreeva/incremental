import store, { type RootState } from '@/App/store';
import { CommandAsInstruction, type CommandId } from '@/commands';
import { selectCurrentScriptId } from '@/features/scripts';
import { type CommandDesign, type InstructionState } from '@/types';

abstract class _CommandDesignBase implements CommandDesign {
    public abstract readonly id: CommandId;
    public abstract readonly name: string;

    public readonly asInstruction: CommandAsInstruction = CommandAsInstruction.Default;

    public createInstruction(): InstructionState {
        const state = store.getState();
        return this._createInstruction(state);
    }

    protected _createInstruction(state: RootState): InstructionState {
        return {
            id: crypto.randomUUID(),
            commandId: this.id,
            parentScriptId: selectCurrentScriptId(state),
        };
    }
}

export default _CommandDesignBase;
