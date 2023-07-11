import { selectScriptIds } from '@/features/scripts';
import { useAppSelector } from '@/hooks';

import * as S from './ScriptSelectionList.styles';
import ScriptSelectionListItem from "./ScriptSelectionListItem";

const ScriptSelectionList: React.FC
= () => {
    const scriptIds = useAppSelector(selectScriptIds);

    return (
        <S.Container>
            { scriptIds.map(scriptId => <ScriptSelectionListItem key={scriptId} scriptId={scriptId} />) }
        </S.Container>
    );
};

ScriptSelectionList.displayName = 'ScriptSelectionList';
export default ScriptSelectionList;
