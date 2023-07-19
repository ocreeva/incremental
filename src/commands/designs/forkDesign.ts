import { type RootState } from '@/App/store';
import { CommandAsInstruction, CommandId } from '@/commands';
import { type InstructionState } from '@/types';

import _CommandDesignBase from './_CommandDesignBase';
import _registerDesign from './_registerDesign';

class ForkDesign extends _CommandDesignBase {
    public readonly id = CommandId.Fork;

    public readonly name = 'Fork';

    public override readonly asInstruction: CommandAsInstruction = CommandAsInstruction.TargetScript;

    protected override _createInstruction(state: RootState): InstructionState {
        const instruction = super._createInstruction(state);
        instruction.targetEntityId = state.scripts.currentId;
        return instruction;
    }
}

_registerDesign(new ForkDesign());
