import { selectScript } from '@/features/scripts';
import { useAppSelector } from '@/hooks';

import * as S from './ScriptSelectionListItem.styles';

declare type ScriptSelectionListItemProps = {
    scriptId: string;
};

const ScriptSelectionListItem: React.FC<ScriptSelectionListItemProps>
= ({ scriptId }) => {
    const { name } = useAppSelector(state => selectScript(state, scriptId));

    return (
        <S.Container>
            <S.Selection name='script' />
            <S.Content>
                { name }
            </S.Content>
        </S.Container>
    );
};

ScriptSelectionListItem.displayName = 'ScriptSelectionListItem';
export default ScriptSelectionListItem;
