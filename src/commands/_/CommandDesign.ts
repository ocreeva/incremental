import store, { type RootState } from '@/App/store';
import { CommandAsInstruction, type CommandId } from '@/constants';
import { assert } from '@/core';
import { selectCurrentScriptId } from '@/features/scripts';
import type { CommandState, ICommandDesign, ICommandDesignConstructor, InstructionState } from '@/types';

import createCommandRecord from './createCommandRecord';

//@staticImplements<ICommandDesignConstructor>()
abstract class CommandDesign implements ICommandDesign {
    private readonly state: CommandState;

    public abstract readonly name: string;

    public readonly asInstruction: CommandAsInstruction = CommandAsInstruction.Default;

    public readonly canBeInstruction: boolean = false;
    public readonly shouldShowProgress: boolean = false;

    public get glyphPath() { return this.id as string; }
    public get subcommands(): CommandId[] | undefined { return undefined; }

    constructor(state: CommandState) {
        assert(state.id === this.derived.id, `State command '${state.id}' does not match design command '${this.derived.id}'.`);

        this.state = state;
    }

    public static get id(): CommandId { throw Error("CommandDesign derived class has not overridden the static 'id' property."); }

    public get id(): CommandId { return this.state.id; }

    public get isInLexicon(): boolean { return this.state.isInLexicon ?? false; }

    public get level(): number { return this.state.level ?? 0; }

    public get progress(): number { return this.state.progress ?? 0; }

    private get derived(): ICommandDesign { return this.constructor as unknown as ICommandDesign; }

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

export const [getDesigns, registerDesign] = createCommandRecord<ICommandDesignConstructor>();
export default CommandDesign;
