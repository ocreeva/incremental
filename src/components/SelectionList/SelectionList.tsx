import styled from 'styled-components';

const SelectionList: React.FC<React.PropsWithChildren>
= ({ children }) => {
    return (
        <Container>
            { children }
        </Container>
    );
};

const Container = styled.fieldset`
    display: flex;
    flex-direction: column;
    gap: 2px;
    margin: -8px;

    background: var(--color-empty);
`;

SelectionList.displayName = 'SelectionList';
export default SelectionList;
