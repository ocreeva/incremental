import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as RemoveScriptIcon } from '@/assets/script-remove.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton';

const RemoveScriptButton: React.FC
= () => {
    return (
        <GlowButton shape={GlowButtonShape.Rect} type='button'>
            <RemoveScriptIcon />
            <VisuallyHidden>Remove Script</VisuallyHidden>
        </GlowButton>
    );
};

RemoveScriptButton.displayName = 'RemoveScriptButton';
export default RemoveScriptButton;
