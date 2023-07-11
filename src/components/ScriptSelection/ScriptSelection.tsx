import { useState } from 'react';
import { useAppSelector } from '@/hooks';
import { ScriptSelectionProvider } from './ScriptSelectionContext';
import { selectCurrentScriptId } from '@/features/scripts';

const ScriptSelection: React.FC<React.PropsWithChildren>
= ({ children }) => {
    const currentScriptId = useAppSelector(selectCurrentScriptId);
    const [scriptId, setScriptId] = useState(currentScriptId);

    return (
        <ScriptSelectionProvider scriptId={scriptId} setScriptId={setScriptId}>
            { children }
        </ScriptSelectionProvider>
    )
};

ScriptSelection.displayName = 'ScriptSelection';
export default ScriptSelection;
