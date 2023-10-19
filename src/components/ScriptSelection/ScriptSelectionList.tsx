import { SelectionList } from '@/components/SelectionList';
import { selectScriptIds } from '@/features/scriptData';
import { useAppSelector } from '@/hooks';

import ScriptSelectionListItem from "./ScriptSelectionListItem";

const ScriptSelectionList: React.FC
= () => {
    const scriptIds = useAppSelector(selectScriptIds);

    return (
        <SelectionList>
            { scriptIds.map(scriptId => <ScriptSelectionListItem key={scriptId} scriptId={scriptId} />) }
        </SelectionList>
    );
};

ScriptSelectionList.displayName = 'ScriptSelectionList';
export default ScriptSelectionList;
