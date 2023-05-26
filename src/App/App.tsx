import styled from 'styled-components';

import GlobalStyles from './GlobalStyles';
import CommandId from '@/data/CommandId';
import Glyph, { GlyphSize } from '@/components/Glyph';
import ProgramBuilder from '@/components/ProgramBuilder/ProgramBuilder';

const App: React.FC = () => {
    return (
        <Container>
            <GlobalStyles />
            <OperationContainer>
                <Glyph command={CommandId.Login} size={GlyphSize.small} />
            </OperationContainer>
            <ProgramBuilder />
            <MenuContainer>
                <Glyph command={CommandId.Login} size={GlyphSize.small} />
            </MenuContainer>
        </Container>
    );
};

const Container = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const OperationContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;

    border-block-end: 1px solid black;
    min-height: 42px;
    width: 100%;
`;

const MenuContainer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;

    border-block-start: 1px solid black;
    min-height: 42px;
    width: 100%;
`;

export default App
