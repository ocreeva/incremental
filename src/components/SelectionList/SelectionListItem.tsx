import { useEffect, useRef } from 'react';
import { EntityId } from '@reduxjs/toolkit';
import styled from 'styled-components';

import { useSelectionContext } from './SelectionContext';

declare type SelectionListItemProps = {
    entityId: EntityId;
    name: string;
};

const SelectionListItem: React.FC<SelectionListItemProps>
= ({ entityId, name }) => {
    const {
        entityId: selectedEntityId,
        name: selectionName,
        setEntityId,
        isEditing = true,
        onItemEdit,
        onEditComplete,
    } = useSelectionContext('SelectionListItem');

    const isSelected = entityId === selectedEntityId;

    const editContainer = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (!isEditing) return;
        if (editContainer.current === null) return;

        editContainer.current.focus();
    }, [isEditing]);

    const handleChange: React.ChangeEventHandler<HTMLInputElement>
    = () => setEntityId(entityId);

    const handleItemEdit: React.ChangeEventHandler<HTMLInputElement>
    = ({ target: { value } }) => onItemEdit && onItemEdit(value);

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>
    = (event) => {
        if (event.key !== 'Enter') return;

        event.preventDefault();
        onEditComplete && onEditComplete();
    };

    return (
        <Container>
            <Selection name={selectionName} checked={isSelected} onChange={handleChange} />
            { isSelected && isEditing
                ? <EditContent ref={editContainer} onChange={handleItemEdit} onBlur={onEditComplete} onKeyDownCapture={handleKeyDown} value={name} />
                : <Content>{ name }</Content>
            }
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

const EditContent = styled.input`
    border: 0;
    line-height: 1.5;
    padding: 8px 16px;
    width: 100%;
`;

SelectionListItem.displayName = 'SelectionListItem';
export default SelectionListItem;
