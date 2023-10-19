import { EntityId } from '@reduxjs/toolkit';

import { SelectionListItem } from '@/components/SelectionList';
import { selectScript } from '@/features/scriptData';
import { useParamSelector } from '@/hooks';

declare type ScriptSelectionListItemProps = {
    scriptId: EntityId;
};

const ScriptSelectionListItem: React.FC<ScriptSelectionListItemProps>
= ({ scriptId }) => {
    const { name } = useParamSelector(selectScript, scriptId);

    return <SelectionListItem entityId={scriptId} name={name} />;
};

ScriptSelectionListItem.displayName = 'ScriptSelectionListItem';
export default ScriptSelectionListItem;
