import styled from 'styled-components';

import type { EntityId } from '@/types';

import { useSelectionContext } from './SelectionContext';

declare type SelectionListItemProps = {
    entityId: EntityId;
    name: string;
};

const SelectionListItem: React.FC<SelectionListItemProps>
= ({ entityId, name }) => {
    const { entityId: selectedEntityId, name: selectionName, setEntityId } = useSelectionContext('SelectionListItem');

    const isSelected = entityId === selectedEntityId;

    const handleChange: React.ChangeEventHandler<HTMLInputElement>
    = () => setEntityId(entityId);

    return (
        <Container>
            <Selection name={selectionName} checked={isSelected} onChange={handleChange} />
            <Content>{ name }</Content>
        </Container>
    );
};

export const Container = styled.label`
    background: var(--color-background);
    position: relative;
`;

export const Selection = styled.input.attrs(() => ({ type: 'radio' }))`
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
`;

export const Content = styled.div`
    line-height: 1.5;
    padding: 8px 16px;

    ${Selection}:checked + & {
        box-shadow: inset 0px 0px 10px var(--color-highlight);
    }

    ${Selection}:focus + & {
        outline: 1px solid var(--color-highlight);
    }
`;

SelectionListItem.displayName = 'SelectionListItem';
export default SelectionListItem;
