import { useState } from 'react';
import styled from 'styled-components';
import { DismissDialogEventHandler } from '@reach/dialog';
import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as MenuIcon } from '@/assets/menu.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton';

import MenuDialog from './MenuDialog';

const MenuButton: React.FC
= () => {
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

    const handleClick: React.MouseEventHandler<HTMLButtonElement>
    = () => setDialogIsOpen(true);

    const handleDismiss: DismissDialogEventHandler
    = () => setDialogIsOpen(false);

    return (
        <Container>
            <GlowButton shape={GlowButtonShape.Circle} type='button' onClick={handleClick}>
                <MenuIcon />
                <VisuallyHidden>Menu</VisuallyHidden>
            </GlowButton>
            <MenuDialog isOpen={dialogIsOpen} onDismiss={handleDismiss} />
        </Container>
    );
};

const Container = styled.div`
    grid-area: menu;
    margin: auto;
`;

MenuButton.displayName = 'MenuButton';
export default MenuButton;
