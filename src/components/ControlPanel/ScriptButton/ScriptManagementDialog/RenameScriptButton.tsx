import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as RenameScriptIcon } from '@/assets/script-rename.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton';

const RenameScriptButton: React.FC
= () => {
    return (
        <GlowButton shape={GlowButtonShape.Rect} type='button'>
            <RenameScriptIcon />
            <VisuallyHidden>Rename Script</VisuallyHidden>
        </GlowButton>
    );
};

RenameScriptButton.displayName = 'RenameScriptButton';
export default RenameScriptButton;
