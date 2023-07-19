import styled from 'styled-components';

import RemoveButton from './RemoveButton';

const ContentDefault: React.FC
= () => {
    return (
        <Container>
            <RemoveButton />
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    grid-template-areas:
        '_ remove'
    ;
    grid-template-rows: minmax(42px, 1fr);
    grid-template-columns: 1fr 42px;
`;

ContentDefault.displayName = 'ContentDefault';
export default ContentDefault;
