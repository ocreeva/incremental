import styled from 'styled-components';
import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as Icon } from '@/assets/dialog/cancel.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton';

import { useDialogContext } from '../DialogContext';

const CancelButton: React.FC
= () => {
    const { onCancel } = useDialogContext('CancelButton');

    return (
        <Container shape={GlowButtonShape.Rect} onClick={onCancel}>
            <Icon />
            <VisuallyHidden>OK</VisuallyHidden>
        </Container>
    );
};

const Container = styled(GlowButton)`
    --color-highlight: var(--color-dialog-cancel);
`;

CancelButton.displayName = 'CancelButton';
export default CancelButton;
