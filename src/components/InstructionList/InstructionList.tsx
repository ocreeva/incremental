import styled from 'styled-components';

import { selectCurrentScript } from '@/features/program';
import { useAppSelector } from '@/hooks';

import InstructionListItem from './InstructionListItem';

const InstructionList: React.FC = () => {
    const { instructions } = useAppSelector(selectCurrentScript);

    return (
        <Container>
            { instructions.map(instruction => <InstructionListItem key={instruction.id} instruction={instruction} />) }
        </Container>
    );
};

const Container = styled.div`
    min-height: 100%;

    display: flex;
    flex-direction: column;
    gap: 12px;
    justify-content: center;
`;

export default InstructionList;
