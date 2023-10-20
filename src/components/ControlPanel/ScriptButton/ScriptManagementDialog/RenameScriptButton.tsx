import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as RenameScriptIcon } from '@/assets/script-rename.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton';
import { useScriptManagementContext } from './ScriptManagementContext';

const RenameScriptButton: React.FC
= () => {
    const { setIsEditing } = useScriptManagementContext('RenameScriptButton');

    const handleClick: React.MouseEventHandler<HTMLButtonElement>
    = () => setIsEditing(true);

    return (
        <GlowButton shape={GlowButtonShape.Rect} type='button' onClick={handleClick}>
            <RenameScriptIcon />
            <VisuallyHidden>Rename Script</VisuallyHidden>
        </GlowButton>
    );
};

RenameScriptButton.displayName = 'RenameScriptButton';
export default RenameScriptButton;
