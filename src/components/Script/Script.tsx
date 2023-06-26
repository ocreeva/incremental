import { selectScript } from '@/features/scripts';
import { useAppSelector } from '@/hooks';

import * as S from './Script.styles';
import Instruction from './Instruction';

declare type ScriptProps = {
    id: string;
    existingInstructionIds: string[];
};

const Script: React.FC<ScriptProps> = ({ id, existingInstructionIds }) => {
    const { instructions } = useAppSelector(state => selectScript(state, id));

    return (
        <S.Container>
            { instructions.map(_ => <Instruction key={_} id={_} shouldAnimate={existingInstructionIds.includes(_)} />) }
        </S.Container>
    );
};

export default Script;
