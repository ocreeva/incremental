import { selectCurrentScriptId, selectScript } from '@/features/scripts';
import { useAppSelector, useParamSelector } from '@/hooks';
import { type EntityId } from '@/types';

import * as S from './Script.styles';
import Instruction from './Instruction';

declare type ScriptProps = {
    existingInstructionIds: EntityId[];
};

const Script: React.FC<ScriptProps>
= ({ existingInstructionIds }) => {
    const scriptId = useAppSelector(selectCurrentScriptId);
    const { instructions } = useParamSelector(selectScript, scriptId);

    return (
        <S.Container>
            { instructions.map(_ => <Instruction key={_} id={_} shouldAnimate={existingInstructionIds.includes(_)} />) }
        </S.Container>
    );
};

export default Script;
