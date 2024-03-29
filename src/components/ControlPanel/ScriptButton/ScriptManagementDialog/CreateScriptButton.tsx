import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as AddScriptIcon } from '@/assets/script-add.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton';
import { useSelectionContext } from '@/components/SelectionList';
import { assertIsDefined } from '@/core';
import { CreateScriptProps, createScript } from '@/features/scriptData';
import { useAppDispatch } from '@/hooks';
import { useScriptManagementContext } from './ScriptManagementContext';

const CreateScriptButton: React.FC
= () => {
    const dispatch = useAppDispatch();
    const { setEntityId } = useSelectionContext('AddScriptButton');
    const { setIsEditing } = useScriptManagementContext('AddScriptButton');
    const handleClick: React.MouseEventHandler<HTMLButtonElement>
    = () => {
        const result: CreateScriptProps = { };
        dispatch(createScript(result));

        assertIsDefined(result.newScriptId, "'createScript' reducer did not return a 'newScriptId' in the result.");
        setEntityId(result.newScriptId);
        setIsEditing(true);
    };

    return (
        <GlowButton shape={GlowButtonShape.Rect} type='button' onClick={handleClick}>
            <AddScriptIcon />
            <VisuallyHidden>Create a New Script</VisuallyHidden>
        </GlowButton>
    );
};

CreateScriptButton.displayName = 'CreateScriptButton';
export default CreateScriptButton;
