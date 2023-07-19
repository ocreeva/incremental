import { useState } from 'react';

import { EntityId } from '@/types';

import { ScriptSelection } from './ScriptSelectionContext';

const useScriptSelection: (initialScriptId: EntityId) => [ React.FC<React.PropsWithChildren>, EntityId, React.Dispatch<React.SetStateAction<EntityId>> ]
= (initialScriptId) => {
    const [scriptId, setScriptId] = useState(initialScriptId);
    return [
        (props) => (<ScriptSelection scriptId={scriptId} setScriptId={setScriptId} {...props} />),
        scriptId,
        setScriptId
    ];
};

export default useScriptSelection;
