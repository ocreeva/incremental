import styled from 'styled-components';

import CancelButton from './CancelButton';
import OkButton from './OkButton';

declare type DialogButtonsProps = {
    removeCancelButton?: boolean;
};

const DialogButtons: React.FC<React.PropsWithChildren<DialogButtonsProps>>
= ({ children, removeCancelButton = false }) => {
    return (
        <Container>
            {children}
            <StandardButtonContainer>
                { !removeCancelButton && <CancelButton /> }
                <OkButton />
            </StandardButtonContainer>
        </Container>
    );
};

const Container = styled.footer`
    display: flex;
    gap: 16px;
    margin: 8px -8px -8px;
    padding: 12px;
    width: calc(100% + 16px);

    border-block-start: 2px solid var(--color-empty);
`;

const StandardButtonContainer = styled.div`
    flex: 1;

    display: flex;
    gap: 16px;
    justify-content: flex-end;
`;

DialogButtons.displayName = 'DialogButtons';
export default DialogButtons;
