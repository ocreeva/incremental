import styled from 'styled-components';

import RemoveButton from '../RemoveButton';
import TargetScript from './TargetScript';

const ContentTargetScript: React.FC
= () => {
    return (
        <Container>
            <TargetScript />
            <RemoveButton />
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-areas:
        'script remove'
    ;
    grid-template-rows: minmax(42px, 1fr);
    grid-template-columns: 1fr 42px;
`;

ContentTargetScript.displayName = 'ContentTargetScript';
export default ContentTargetScript;
