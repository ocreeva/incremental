import styled from 'styled-components';

const DialogSubsection: React.FC<React.HTMLAttributes<HTMLElement>>
= (props) => {
    return (
        <Container {...props} />
    );
};

const Container = styled.aside`
    border-block-start: 2px solid var(--color-empty);
    margin: 0.5rem -0.5rem;
    padding: 0.5rem 0.5rem 0;
    width: calc(100% + 1rem);
`;

DialogSubsection.displayName = 'DialogSubsection';
export default DialogSubsection;
