import GlyphPanel from '@/components/GlyphPanel';
import { CommandAsInstruction } from '@/constants';
import { selectInstruction } from '@/features/instructions';
import designs from '@/game/designs';
import { useAppSelector } from '@/hooks';
import type { EntityId } from '@/types';

import ContentDefault from './ContentDefault';
import ContentTargetScript from './ContentTargetScript';
import { InstructionProvider } from './InstructionContext';

declare type InstructionProps = {
    id: EntityId;
    shouldAnimate: boolean;
};

const CommandContent: Record<CommandAsInstruction, React.FC> = {
    [CommandAsInstruction.Default]: ContentDefault,
    [CommandAsInstruction.TargetScript]: ContentTargetScript,
};

const Instruction: React.FC<InstructionProps> = ({ id, shouldAnimate }) => {
    const { commandId } = useAppSelector(state => selectInstruction(state, id));
    const { asInstruction } = designs[commandId];

    const InstructionContent = CommandContent[asInstruction];

    return (
        <GlyphPanel commandId={commandId} shouldAnimate={shouldAnimate}>
            <InstructionProvider instructionId={id}>
                <InstructionContent />
            </InstructionProvider>
        </GlyphPanel>
    );
};

export default Instruction;
