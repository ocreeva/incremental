import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as AddScriptIcon } from '@/assets/script-add.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton';
import { useScriptSelectionContext } from '@/components/ScriptSelection';
import { assertIsDefined } from '@/core';
import { type CreateScriptProps, createScript } from '@/features/scripts';
import { useAppDispatch } from '@/hooks';


const CreateScriptButton: React.FC
= () => {
    const dispatch = useAppDispatch();
    const { setScriptId } = useScriptSelectionContext('AddScriptButton');
    const handleClick: React.MouseEventHandler<HTMLButtonElement>
    = () => {
        const result: CreateScriptProps = { };
        dispatch(createScript(result));

        assertIsDefined(result.newScriptId, "'createScript' reducer did not return a 'newScriptId' in the result.");
        setScriptId(result.newScriptId);
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
