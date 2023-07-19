import styled from 'styled-components';
import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as CloseSvg } from '@/assets/dialog/close.svg';

import { useDialogContext } from './DialogContext';

const CloseButton: React.FC
= () => {
    const { onCancel } = useDialogContext('CloseButton');

    return (
        <Container onClick={onCancel}>
            <CloseIcon />
            <VisuallyHidden>Close</VisuallyHidden>
        </Container>
    );
};

const Container = styled.button`
    position: absolute;
    right: 0rem;
    top: 0rem;

    border-top-right-radius: 15px;
    height: 42px;
    width: 42px;

    display: grid;
    place-content: center;
`;

const CloseIcon = styled(CloseSvg)`
    border: 2px dotted var(--color-empty);
    border-radius: 50%;
`;

CloseButton.displayName = 'CloseButton';
export default CloseButton;
