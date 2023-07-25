import { type RootState } from '@/App/store';
import { CommandAsInstruction, CommandId } from '@/constants';
import type { InstructionState } from '@/types';

import CommandDesign, { registerDesign } from '../_CommandDesign';

class ForkDesign extends CommandDesign {
    public readonly id = CommandId.Fork;

    public readonly name = 'Fork';

    public override readonly asInstruction: CommandAsInstruction = CommandAsInstruction.TargetScript;

    public override isInLexicon(): boolean {
        return true;
    }

    protected override _createInstruction(state: RootState): InstructionState {
        const instruction = super._createInstruction(state);
        instruction.targetEntityId = state.scripts.currentId;
        return instruction;
    }
}

registerDesign(new ForkDesign());
