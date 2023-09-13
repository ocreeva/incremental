import { ReactComponent as MissingGlyph } from '@/assets/glyphs/error.svg';
import store, { type RootState } from '@/App/store';
import { type CommandId, CommandTarget } from '@/constants';
import { assert } from '@/core';
import { selectCurrentScriptId } from '@/features/scripts';
import type { CommandState, ICommandDesign, ICommandDesignConstructor, InstructionState } from '@/types';

import createCommandRecord from './createCommandRecord';

//@staticImplements<ICommandDesignConstructor>()
abstract class CommandDesign implements ICommandDesign {
    private readonly state: CommandState;

    public abstract readonly name: string;

    public readonly targetType: CommandTarget = CommandTarget.None;

    public readonly canBeInstruction: boolean = false;
    public readonly isInLexicon: boolean = false;
    public readonly shouldShowLevel: boolean = false;
    public get shouldShowProgress(): boolean { return this.shouldShowLevel; }

    public get GlyphComponent() { return MissingGlyph; }

    public get subcommands(): CommandId[] | undefined { return undefined; }

    constructor(state: CommandState) {
        assert(state.id === this.derived.id, `State command '${state.id}' does not match design command '${this.derived.id}'.`);

        this.state = state;
    }

    public static get id(): CommandId { throw Error("CommandDesign derived class has not overridden the static 'id' property."); }

    public get id(): CommandId { return this.state.id; }

    public get isEnabled(): boolean { return this.state.isEnabled ?? false; }
    public get isVisible(): boolean { return this.state.isVisible ?? false; }

    public get level(): number { return this.state.level ?? 0; }

    public get progress(): number { return this.state.progress ?? 0; }

    private get derived(): ICommandDesign { return this.constructor as unknown as ICommandDesign; }

    public createInstruction(): InstructionState {
        const state = store.getState();
        return this.createInstructionState(state);
    }

    protected createInstructionState(state: RootState): InstructionState {
        return {
            id: crypto.randomUUID(),
            commandId: this.id,
            parentScriptId: selectCurrentScriptId(state),
        };
    }
}

export const [getDesigns, registerDesign] = createCommandRecord<ICommandDesignConstructor>();
export default CommandDesign;
