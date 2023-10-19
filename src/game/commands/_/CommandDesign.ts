import { ReactComponent as MissingGlyph } from '@/assets/glyphs/error.svg';
import store, { type RootState } from '@/App/store';
import { type CommandId, CommandTarget } from '@/constants';
import { assert } from '@/core';
import { selectCurrentScriptId } from '@/features/scriptData';
import type { CommandView, ICommandDesign, ICommandDesignConstructor, InstructionData } from '@/types';

import createCommandRecord from './createCommandRecord';

//@staticImplements<ICommandDesignConstructor>()
abstract class CommandDesign implements ICommandDesign {
    private readonly view: CommandView;

    public abstract readonly name: string;

    public readonly targetType: CommandTarget = CommandTarget.None;

    public readonly canBeInstruction: boolean = false;
    public readonly isInLexicon: boolean = false;
    public readonly shouldShowLevel: boolean = false;
    public get shouldShowProgress(): boolean { return this.shouldShowLevel; }

    public get GlyphComponent() { return MissingGlyph; }

    public get subcommands(): CommandId[] | undefined { return undefined; }

    constructor(view: CommandView) {
        assert(view.id === this.derived.id, `View command '${view.id}' does not match design command '${this.derived.id}'.`);

        this.view = view;
    }

    public static get id(): CommandId { throw Error("CommandDesign derived class has not overridden the static 'id' property."); }

    public get id(): CommandId { return this.view.id; }

    public get isEnabled(): boolean { return this.view.isEnabled ?? false; }
    public get isVisible(): boolean { return this.view.isVisible ?? false; }

    public get level(): number { return this.view.level ?? 0; }

    public get progress(): number { return this.view.progress ?? 0; }

    private get derived(): ICommandDesign { return this.constructor as unknown as ICommandDesign; }

    public createInstruction(): InstructionData {
        const state = store.getState();
        return this.createInstructionData(state);
    }

    protected createInstructionData(state: RootState): InstructionData {
        return {
            id: crypto.randomUUID(),
            commandId: this.id,
            parentScriptId: selectCurrentScriptId(state),
        };
    }
}

export const [getDesigns, registerDesign] = createCommandRecord<ICommandDesignConstructor>();
export default CommandDesign;
