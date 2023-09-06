import { RootState } from '@/App/store';
import CommandDesign, { registerDesign } from '@/commands/_/CommandDesign';
import { CommandId, CommandTarget, Host } from '@/constants';
import type { InstructionState } from '@/types';

class LoginDesign extends CommandDesign {
    public static override readonly id: CommandId = CommandId.Login;

    public readonly name = 'Login';

    public override readonly canBeInstruction = true;
    public override readonly targetType: CommandTarget = CommandTarget.Host;

    protected override createInstructionState(state: RootState): InstructionState {
        const instruction = super.createInstructionState(state);
        instruction.targetEntityId = Host.Files;
        return instruction;
    }
}

registerDesign(LoginDesign);
