import { selectScript } from '@/features/scripts';
import { useParamSelector } from '@/hooks';

import * as S from './ScriptSelectionListItem.styles';
import { useScriptSelectionContext } from './ScriptSelectionContext';

declare type ScriptSelectionListItemProps = {
    scriptId: string;
};

const ScriptSelectionListItem: React.FC<ScriptSelectionListItemProps>
= ({ scriptId }) => {
    const { name } = useParamSelector(selectScript, scriptId);
    const { scriptId: selectedScriptId, setScriptId } = useScriptSelectionContext('ScriptSelectionListItem');

    const isSelected = scriptId === selectedScriptId;

    const handleChange: React.ChangeEventHandler<HTMLInputElement>
    = () => setScriptId(scriptId);

    return (
        <S.Container>
            <S.Selection name='script' checked={isSelected} onChange={handleChange} />
            <S.Content>
                { name }
            </S.Content>
        </S.Container>
    );
};

ScriptSelectionListItem.displayName = 'ScriptSelectionListItem';
export default ScriptSelectionListItem;
