import { selectCurrentScript } from '@/features/program';
import { useAppSelector } from '@/hooks';
import { InstructionId } from '@/types';

import * as S from './InstructionList.styles';
import InstructionListItem from './InstructionListItem';

interface InstructionListProps {
    existingInstructionIds: InstructionId[];
}

const InstructionList: React.FC<InstructionListProps> = ({ existingInstructionIds }) => {
    const { instructions } = useAppSelector(selectCurrentScript);

    return (
        <S.Container>
            { instructions.map(instruction => <InstructionListItem key={instruction.id} instruction={instruction} shouldAnimate={existingInstructionIds.includes(instruction.id)} />) }
        </S.Container>
    );
};

export default InstructionList;
