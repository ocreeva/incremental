import { EntityId } from '@reduxjs/toolkit';

import GlyphPanel, { GlyphPanelContent } from '@/components/GlyphPanel';
import { CommandTarget } from '@/constants';
import { selectCommandDesign } from '@/features/commandDesign';
import { selectInstruction } from '@/features/instructionData';
import { useParamSelector } from '@/hooks';

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
    const { targetType: asInstruction } = useParamSelector(selectCommandDesign, commandId);

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
