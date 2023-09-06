import { useState } from 'react';

import { SelectionContext } from '@/components/SelectionList';
import type { EntityId } from '@/types';

const useScriptSelection: (initialScriptId: EntityId) => [ React.FC<React.PropsWithChildren>, EntityId, React.Dispatch<React.SetStateAction<EntityId>> ]
= (initialScriptId) => {
    const [scriptId, setScriptId] = useState(initialScriptId);
    return [
        (props) => (<SelectionContext entityId={scriptId} name='script' setEntityId={setScriptId} {...props} />),
        scriptId,
        setScriptId
    ];
};

export default useScriptSelection;
