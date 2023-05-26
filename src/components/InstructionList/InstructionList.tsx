import styled from 'styled-components';

import { selectProgramInstructions } from '@/features/program';
import { useAppSelector } from '@/hooks';

import InstructionListItem from './InstructionListItem';

const InstructionList: React.FC = () => {
    const instructions = useAppSelector(selectProgramInstructions);

    return (
        <Container>
            { instructions.map(instruction => <InstructionListItem key={instruction.id} instruction={instruction} />) }
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export default InstructionList;
