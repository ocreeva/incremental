import { SelectionList } from '@/components/SelectionList';
import { Host } from '@/constants';

import HostSelectionListItem from './HostSelectionListItem';

const hosts = Object.values(Host);

const HostSelectionList: React.FC
= () => {
    return (
        <SelectionList>
            { hosts.map(host => <HostSelectionListItem key={host} host={host} />) }
        </SelectionList>
    );
};

HostSelectionList.displayName = 'HostSelectionList';
export default HostSelectionList;
