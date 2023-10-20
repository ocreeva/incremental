import { useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';

import { EditSelectionContextProps, SelectionContext } from '@/components/SelectionList';

const useScriptSelection: (initialScriptId: EntityId) => [ React.FC<React.PropsWithChildren<EditSelectionContextProps>>, EntityId, React.Dispatch<React.SetStateAction<EntityId>> ]
= (initialScriptId) => {
    const [scriptId, setScriptId] = useState(initialScriptId);
    return [
        (props) => (<SelectionContext entityId={scriptId} name='script' setEntityId={setScriptId} {...props} />),
        scriptId,
        setScriptId
    ];
};

export default useScriptSelection;
