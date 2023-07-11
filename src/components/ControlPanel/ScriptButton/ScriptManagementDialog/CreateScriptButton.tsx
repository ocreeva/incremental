import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as CreateScriptIcon } from '@/assets/script-create.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton';
import { useScriptSelectionContext } from '@/components/ScriptSelection';
import { assertIsDefined } from '@/core';
import { createScript } from '@/features/scripts';
import { useAppDispatch } from '@/hooks';

import type { CreateScriptProps } from '@/features/scripts';

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
            <CreateScriptIcon />
            <VisuallyHidden>Create a New Script</VisuallyHidden>
        </GlowButton>
    );
};

CreateScriptButton.displayName = 'CreateScriptButton';
export default CreateScriptButton;
