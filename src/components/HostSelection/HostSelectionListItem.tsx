import { Host } from '@/constants';
import { SelectionListItem } from '@/components/SelectionList';

declare type HostSelectionListItemProps = {
    host: Host;
};

const hostName: Record<Host, string> = {
    [Host.Core]: 'Core',
    [Host.Files]: 'Files',
    [Host.HR]: 'HR',
    [Host.Hub]: 'Hub',
    [Host.Security]: 'Security',
};

const HostSelectionListItem: React.FC<HostSelectionListItemProps>
= ({ host }) => {
    const name = hostName[host];

    return <SelectionListItem entityId={host} name={name} />;
};

HostSelectionListItem.displayName = 'HostSelectionListItem';
export default HostSelectionListItem;
