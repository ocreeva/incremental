import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as RemoveScriptIcon } from '@/assets/script-remove.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton';
import { useSelectionContext } from '@/components/SelectionList';
import { assertIsDefined } from '@/core';
import { type DeleteScriptProps, deleteScript, selectScriptIds } from '@/features/scripts';
import { useAppDispatch, useAppSelector } from '@/hooks';

const DeleteScriptButton: React.FC
= () => {
    const scriptIds = useAppSelector(selectScriptIds);

    const { entityId, setEntityId } = useSelectionContext('RemoveScriptButton');
    const dispatch = useAppDispatch();
    const handleClick: React.MouseEventHandler<HTMLButtonElement>
    = () => {
        const props: DeleteScriptProps = { scriptId: entityId };
        dispatch(deleteScript(props));

        const { currentScriptId } = props;
        assertIsDefined(currentScriptId, "'deleteScript' reducer did not set the 'currentScriptId' prop.");
        setEntityId(currentScriptId);
    };

    const isDisabled = scriptIds.length <= 1;

    return (
        <GlowButton shape={GlowButtonShape.Rect} type='button' disabled={isDisabled} onClick={handleClick}>
            <RemoveScriptIcon />
            <VisuallyHidden>Remove Script</VisuallyHidden>
        </GlowButton>
    );
};

DeleteScriptButton.displayName = 'DeleteScriptButton';
export default DeleteScriptButton;
