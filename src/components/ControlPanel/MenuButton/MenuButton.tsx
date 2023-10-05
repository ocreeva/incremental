import styled from 'styled-components';
import { VisuallyHidden } from '@reach/visually-hidden';

import { ReactComponent as MenuIcon } from '@/assets/menu.svg';
import GlowButton, { GlowButtonShape } from '@/components/GlowButton';

const MenuButton: React.FC
= () => {
    return (
        <Container>
            <GlowButton shape={GlowButtonShape.Circle} type='button'>
                <MenuIcon />
                <VisuallyHidden>Menu</VisuallyHidden>
            </GlowButton>
        </Container>
    );
};

const Container = styled.div`
    grid-area: menu;
    margin: auto;
`;

MenuButton.displayName = 'MenuButton';
export default MenuButton;
