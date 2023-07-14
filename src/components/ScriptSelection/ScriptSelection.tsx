import { useState } from 'react';
import { useAppSelector } from '@/hooks';
import { ScriptSelectionProvider } from './ScriptSelectionContext';
import { selectCurrentScriptId } from '@/features/scripts';
import { type EntityId } from '@/types';

import { type SubmitEventHandler } from './ScriptSelectionContext';

export declare type SubmitCallback = (scriptId: EntityId, event: React.MouseEvent | React.KeyboardEvent) => void;

declare type ScriptSelectionProps = {
    submit: SubmitCallback;
};

const ScriptSelection: React.FC<React.PropsWithChildren<ScriptSelectionProps>>
= ({ submit, ...props }) => {
    const currentScriptId = useAppSelector(selectCurrentScriptId);
    const [scriptId, setScriptId] = useState(currentScriptId);
    const onSubmit: SubmitEventHandler = (event) => submit(scriptId, event);

    return <ScriptSelectionProvider onSubmit={onSubmit} scriptId={scriptId} setScriptId={setScriptId} {...props} />;
};

ScriptSelection.displayName = 'ScriptSelection';
export default ScriptSelection;
