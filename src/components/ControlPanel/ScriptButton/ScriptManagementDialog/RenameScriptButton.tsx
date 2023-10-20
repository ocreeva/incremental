import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as RenameScriptIcon } from '@/assets/script-rename.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton';

const RenameScriptButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>>
= (props) => {
    return (
        <GlowButton shape={GlowButtonShape.Rect} type='button' {...props}>
            <RenameScriptIcon />
            <VisuallyHidden>Rename Script</VisuallyHidden>
        </GlowButton>
    );
};

RenameScriptButton.displayName = 'RenameScriptButton';
export default RenameScriptButton;
