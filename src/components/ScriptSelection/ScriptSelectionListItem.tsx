import { SelectionListItem } from '@/components/SelectionList';
import { selectScript } from '@/features/scripts';
import { useParamSelector } from '@/hooks';
import type { EntityId } from '@/types';

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
