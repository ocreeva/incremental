import { selectCurrentScript } from '@/features/program';
import { useAppSelector } from '@/hooks';

import * as S from './InstructionList.styles';
import InstructionListItem from './InstructionListItem';

type InstructionListProps = {
    existingInstructionKeys: string[];
};

const InstructionList: React.FC<InstructionListProps> = ({ existingInstructionKeys }) => {
    const { instructions } = useAppSelector(selectCurrentScript);

    return (
        <S.Container>
            { instructions.map(instruction => <InstructionListItem {...instruction} $key={instruction.key} shouldAnimate={existingInstructionKeys.includes(instruction.key)} />) }
        </S.Container>
    );
};

export default InstructionList;
