import { useState } from 'react';

import { type Host } from '@/constants';

import { SelectionContext } from '@/components/SelectionList';
import { EntityId } from '@/types';

const useHostSelection: (initialHost: Host) => [ React.FC<React.PropsWithChildren>, Host, React.Dispatch<React.SetStateAction<Host>> ]
= (initialHost) => {
    const [host, setHost] = useState(initialHost);

    const setEntityId: React.Dispatch<React.SetStateAction<EntityId>>
    = (entityId) => setHost(entityId as Host);

    return [
        (props) => (<SelectionContext entityId={host} name='host' setEntityId={setEntityId} {...props} />),
        host,
        setHost
    ];
};

export default useHostSelection;
