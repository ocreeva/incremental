import styled from 'styled-components';

import RemoveButton from '../RemoveButton';
import TargetHost from './TargetHost';

const ContentTargetHost: React.FC
= () => {
    return (
        <Container>
            <TargetHost />
            <RemoveButton />
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-areas:
        'host remove'
    ;
    grid-template-rows: minmax(42px, 1fr);
    grid-template-columns: 1fr 42px;
`;

ContentTargetHost.displayName = 'ContentTargetHost';
export default ContentTargetHost;
