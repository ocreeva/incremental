import styled from 'styled-components';

import ControlPanel from '@/components/ControlPanel';
import ProgramIDE from '@/components/ProgramIDE';
import GlobalStyles from '@/styles/GlobalStyles';
import Routine from '@/components/Routine';

const App: React.FC = () => {
    return (
        <Container>
            <GlobalStyles />
            <Routine />
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

export default App;
