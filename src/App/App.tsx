import styled from 'styled-components';

import GlobalStyles from './GlobalStyles';
import CommandId from '@/data/CommandId';
import Glyph, { GlyphSize } from '@/components/Glyph';
import CommandList from '@/components/CommandList';
import InstructionList from '@/components/InstructionList';

const App: React.FC = () => {
    return (
        <>
            <Container>
                <GlobalStyles />
                <OperationContainer>
                    <Glyph command={CommandId.Login} size={GlyphSize.small} />
                </OperationContainer>
                <InstructionsContainer>
                    <InstructionList />
                </InstructionsContainer>
                <CommandsContainer>
                    <CommandList />
                </CommandsContainer>
                <MenuContainer>
                    <Glyph command={CommandId.Login} size={GlyphSize.small} />
                </MenuContainer>
            </Container>
        </>
    );
};

const Container = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;

    display: grid;
    gap: 4px;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: minmax(42px, min-content) 1fr minmax(42px, min-content);
    grid-template-areas:
        'operation operation'
        'instructions commands'
        'menu menu'
    ;
`;

const OperationContainer = styled.header`
    grid-area: operation;

    display: flex;
    align-items: center;
    justify-content: center;

    border-block-end: 1px solid black;
    min-height: 42px;
    width: 100%;
`;

const InstructionsContainer = styled.div`
    grid-area: instructions;
    justify-self: start;

    border: 1px solid black;
    border-inline-start: 0;
    width: 100%;
`;

const CommandsContainer = styled.div`
    grid-area: commands;
    justify-self: end;

    border: 1px solid black;
    border-inline-end: 0;
    width: 100%;
`;

const MenuContainer = styled.footer`
    grid-area: menu;

    display: flex;
    align-items: center;
    justify-content: center;

    border-block-start: 1px solid black;
    min-height: 42px;
    width: 100%;
`;

export default App
