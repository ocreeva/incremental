import styled from 'styled-components';

import GlobalStyles from '@/styles/GlobalStyles';
import CommandId from '@/data/CommandId';
import Glyph, { GlyphSize } from '@/components/Glyph';
import ProgramIDE from '@/components/ProgramIDE';

const App: React.FC = () => {
    return (
        <Container>
            <GlobalStyles />
            <OperationContainer>
                <Glyph command={CommandId.Login} size={GlyphSize.small} />
            </OperationContainer>
            <ProgramIDE />
            <MenuContainer>
                <Glyph command={CommandId.Login} size={GlyphSize.small} />
            </MenuContainer>
        </Container>
    );
};

const Container = styled.div`
    --app-section-gap-width: 12px;
    --app-section-filter:
        drop-shadow(0 0 2px var(--color-background))
        drop-shadow(0 0 4px var(--color-background))
    ;

    height: 100%;
    width: 100%;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    gap: var(--app-section-gap-width);
`;

const OperationContainer = styled.header`
    flex: 0 0 42px;
    width: 100%;

    background: var(--color-background);
    filter: var(--app-section-filter);

    display: flex;
    align-items: center;
    justify-content: center;
`;

const MenuContainer = styled.footer`
    flex: 0 0 42px;
    height: 100%;
    width: 100%;

    background: var(--color-background);
    filter: var(--app-section-filter);

    display: flex;
    align-items: center;
    justify-content: center;
`;

export default App
