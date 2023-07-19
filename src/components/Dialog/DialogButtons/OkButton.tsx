import styled from 'styled-components';
import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as OkIcon } from '@/assets/dialog/ok.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton';

import { useDialogContext } from '../DialogContext';

const OkButton: React.FC
= () => {
    const { onSubmit } = useDialogContext('OkButton');

    return (
        <Container shape={GlowButtonShape.Rect} onClick={onSubmit}>
            <OkIcon />
            <VisuallyHidden>OK</VisuallyHidden>
        </Container>
    );
};

const Container = styled(GlowButton)`
    --color-highlight: var(--color-dialog-ok);
`;

OkButton.displayName = 'OkButton';
export default OkButton;
