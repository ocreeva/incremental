import styled from 'styled-components';

import ControlPanel from '@/components/ControlPanel';
import IDE from '@/components/IDE';
import GlobalStyles from '@/styles/GlobalStyles';
import Routine from '@/components/Routine';

const App: React.FC = () => {
    return (
        <Container>
            <GlobalStyles />
            <Routine />
            <IDE />
            <ControlPanel />
        </Container>
    );
};

const Container = styled.div`
    height: 100%;
    width: 100%;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export default App;
