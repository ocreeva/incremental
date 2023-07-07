import styled from 'styled-components';

const DialogTitle: React.FC<React.PropsWithChildren>
= ({ children }) => {
    return (
        <Container>
            <Title>
                { children }
            </Title>
        </Container>
    );
};

const Container = styled.header`
    border-block-end: 2px solid var(--color-empty);
    margin: -0.5rem -0.5rem 0.5rem;
    min-height: 42px;
    padding: 0.5rem;
    padding-inline-end: 42px;
    width: calc(100% + 1rem);

    display: grid;
    align-content: center;
`;

const Title = styled.h2`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

DialogTitle.displayName = 'DialogTitle';
export default DialogTitle;
