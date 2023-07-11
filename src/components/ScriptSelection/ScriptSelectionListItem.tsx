import { selectScript } from '@/features/scripts';
import { useAppSelector } from '@/hooks';

import * as S from './ScriptSelectionListItem.styles';
import { useScriptSelectionContext } from './ScriptSelectionContext';

declare type ScriptSelectionListItemProps = {
    scriptId: string;
};

const ScriptSelectionListItem: React.FC<ScriptSelectionListItemProps>
= ({ scriptId }) => {
    const { name } = useAppSelector(state => selectScript(state, scriptId));
    const { scriptId: selectedScriptId, setScriptId } = useScriptSelectionContext('ScriptSelectionListItem');

    const isSelected = scriptId === selectedScriptId;
    const handleClick: React.MouseEventHandler<HTMLInputElement>
    = () => { setScriptId(scriptId); }

    return (
        <S.Container>
            <S.Selection name='script' defaultChecked={isSelected} onClick={handleClick} />
            <S.Content>
                { name }
            </S.Content>
        </S.Container>
    );
};

ScriptSelectionListItem.displayName = 'ScriptSelectionListItem';
export default ScriptSelectionListItem;
