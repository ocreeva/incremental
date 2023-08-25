import store, { type RootState } from '@/App/store';
import { CommandAsInstruction, type CommandId } from '@/constants';
import { selectCurrentScriptId } from '@/features/scripts';
import type { ICommandDesign, InstructionState } from '@/types';

import createCommandRecord from './createCommandRecord';

abstract class CommandDesign implements ICommandDesign {
    public abstract readonly id: CommandId;
    public abstract readonly name: string;

    public readonly asInstruction: CommandAsInstruction = CommandAsInstruction.Default;

    public readonly canBeInstruction: boolean = false;
    public readonly shouldShowProgress: boolean = false;

    public get glyphPath() { return this.id as string; }
    public get subcommands(): CommandId[] | undefined { return undefined; }

    public createInstruction(): InstructionState {
        const state = store.getState();
        return this._createInstruction(state);
    }

    public isInLexicon(): boolean {
        return false;
    }

    protected _createInstruction(state: RootState): InstructionState {
        return {
            id: crypto.randomUUID(),
            commandId: this.id,
            parentScriptId: selectCurrentScriptId(state),
        };
    }
}

export const [getDesigns, registerDesign] = createCommandRecord<ICommandDesign>();
export default CommandDesign;
