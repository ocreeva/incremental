import styled from 'styled-components';
import { EntityId } from '@reduxjs/toolkit';

import GlyphPanel, { GlyphPanelContent } from '@/components/GlyphPanel';
import { CommandTarget } from '@/constants';
import { selectCommandDesign } from '@/features/commandDesign';
import { selectInstruction } from '@/features/instructionData';
import { useParamSelector } from '@/hooks';

import ContentTargetHost from './ContentTargetHost';
import ContentTargetScript from './ContentTargetScript';
import { InstructionProvider } from './InstructionContext';
import RemoveButton from './RemoveButton';

declare type InstructionProps = {
    id: EntityId;
    shouldAnimate: boolean;
};

const CommandContent: Record<CommandTarget, React.FC | null> = {
    [CommandTarget.None]: null,
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
                    <ContentContainer>
                        { InstructionContent && <InstructionContent /> }
                        <RemoveButton />
                    </ContentContainer>
                </InstructionProvider>
            </GlyphPanelContent>
        </GlyphPanel>
    );
};

const ContentContainer = styled.div`
    display: grid;
    grid-template-areas:
        'content remove'
    ;
    grid-template-rows: minmax(42px, 1fr);
    grid-template-columns: 1fr 42px;
`;

export default Instruction;
