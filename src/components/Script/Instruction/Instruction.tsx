import GlyphPanel, { GlyphPanelContent } from '@/components/GlyphPanel';
import { CommandTarget } from '@/constants';
import { selectDesign } from '@/features/commands';
import { selectInstruction } from '@/features/instructions';
import { useParamSelector } from '@/hooks';
import type { EntityId } from '@/types';

import ContentDefault from './ContentDefault';
import ContentTargetHost from './ContentTargetHost';
import ContentTargetScript from './ContentTargetScript';
import { InstructionProvider } from './InstructionContext';

declare type InstructionProps = {
    id: EntityId;
    shouldAnimate: boolean;
};

const CommandContent: Record<CommandTarget, React.FC> = {
    [CommandTarget.None]: ContentDefault,
    [CommandTarget.Host]: ContentTargetHost,
    [CommandTarget.Script]: ContentTargetScript,
};

const Instruction: React.FC<InstructionProps> = ({ id, shouldAnimate }) => {
    const { commandId } = useParamSelector(selectInstruction, id);
    const { targetType: asInstruction } = useParamSelector(selectDesign, commandId);

    const InstructionContent = CommandContent[asInstruction];

    return (
        <GlyphPanel shouldAnimate={shouldAnimate}>
            <GlyphPanelContent commandId={commandId}>
                <InstructionProvider instructionId={id}>
                    <InstructionContent />
                </InstructionProvider>
            </GlyphPanelContent>
        </GlyphPanel>
    );
};

export default Instruction;
