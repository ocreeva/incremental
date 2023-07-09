import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as AddScriptSvg } from '@/assets/script-add.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton';

const AddScriptButton: React.FC
= () => {
    return (
        <GlowButton shape={GlowButtonShape.Rect} type='button'>
            <AddScriptSvg />
            <VisuallyHidden>Add Script</VisuallyHidden>
        </GlowButton>
    );
};

AddScriptButton.displayName = 'AddScriptButton';
export default AddScriptButton;
