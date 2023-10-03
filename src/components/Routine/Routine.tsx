import { useEffect, useRef, useState } from 'react';

import { convertToGameTime } from '@/core';
import { selectCurrentRoutine } from '@/features/routines';
import { useAppSelector } from '@/hooks';
import type { EntityId } from '@/types';

import OperationDialog from './OperationDialog';
import { OperationDialogContext, type OperationDialogContextProps } from './OperationDialogContext';
import * as S from './Routine.styles';
import Subroutine from './Subroutine';

const Routine: React.FC = () => {
    const currentRoutine = useAppSelector(selectCurrentRoutine);
    const { duration, elapsed, subroutines } = currentRoutine;

    const [operationDialogIsOpen, setOperationDialogIsOpen] = useState<boolean>(false);
    const [operationDialogTargetId, setOperationDialogTargetId] = useState<EntityId>();

    const operationDialogContextProps: OperationDialogContextProps = {
        isOpen: operationDialogIsOpen,
        onDismiss: () => {
            setOperationDialogIsOpen(false);
            setOperationDialogTargetId(undefined);
        },
        operationId: operationDialogTargetId,
        setOperationId: (operationId) => {
            setOperationDialogTargetId(operationId);
            if (operationId !== undefined) setOperationDialogIsOpen(true);
        },
    };

    const scrollContainer = useRef<HTMLDivElement>(null);
    const durationInGT = convertToGameTime(duration);
    const elapsedInGT = convertToGameTime(elapsed);
    const scrollTarget = Math.max(0, Math.min(durationInGT - 42, Math.round(elapsedInGT - 21)));
    useEffect(() => {
        if (scrollContainer.current === null) return;
        scrollContainer.current.scrollTo(scrollTarget, 0);
    }, [scrollTarget]);

    const style = {
        '--routine_duration': durationInGT,
    } as React.CSSProperties;

    return (
        <OperationDialogContext {...operationDialogContextProps}>
            <S.Container ref={scrollContainer} style={style}>
                <S.ScrollRegion>
                    { subroutines.map(subroutineId => <Subroutine key={subroutineId} id={subroutineId} />) }
                </S.ScrollRegion>
            </S.Container>
            { operationDialogTargetId && <OperationDialog /> }
        </OperationDialogContext>
    );
};

export default Routine;
