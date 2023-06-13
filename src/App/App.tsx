import styled from 'styled-components';

import ControlPanel from '@/components/ControlPanel';
import Glyph, { GlyphSize } from '@/components/Glyph';
import ProgramIDE from '@/components/ProgramIDE';
import { useGameLoopWorker } from '@/hooks';
import GlobalStyles from '@/styles/GlobalStyles';
import { CommandId } from "@/types";

const App: React.FC = () => {
    useGameLoopWorker();

    return (
        <Container>
            <GlobalStyles />
            <OperationContainer>
                <Glyph commandId={CommandId.Login} size={GlyphSize.small} />
            </OperationContainer>
            <ProgramIDE />
            <ControlPanel />
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

export default App
