import { useEffect, useRef, useState } from 'react';
import { EntityId } from '@reduxjs/toolkit';

import { convertToGameTime } from '@/core';
import { selectCurrentRoutine } from '@/features/routineView';
import { useAppSelector } from '@/hooks';

import OperationDialog from './OperationDialog';
import { OperationDialogContext, type OperationDialogContextProps } from './OperationDialogContext';
import * as S from './Routine.styles';
import Subroutine from './Subroutine';

const Routine: React.FC = () => {
    const currentRoutine = useAppSelector(selectCurrentRoutine);
    const { duration, elapsed, maxDuration, subroutines } = currentRoutine;

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
    const maxDurationInGT = convertToGameTime(maxDuration);
    const durationInGT = Math.max(convertToGameTime(duration), maxDurationInGT);
    const elapsedInGT = convertToGameTime(elapsed);
    const scrollTarget = Math.max(0, Math.min(durationInGT - 42, Math.round(elapsedInGT - 21)));
    useEffect(() => {
        if (scrollContainer.current === null) return;
        scrollContainer.current.scrollTo(scrollTarget, 0);
    }, [scrollTarget]);

    const style = {
        '--routine_duration': durationInGT,
        '--routine_elapsed': elapsedInGT,
        '--routine_max-duration': maxDurationInGT,
    } as React.CSSProperties;

    return (
        <OperationDialogContext {...operationDialogContextProps}>
            <S.Container ref={scrollContainer} style={style}>
                <S.ScrollRegion>
                    { maxDuration > 0 && <S.MaxDurationContainer>
                        <S.MaxDuration>
                            <S.Elapsed />
                        </S.MaxDuration>
                    </S.MaxDurationContainer> }
                    { subroutines.map(subroutineId => <Subroutine key={subroutineId} id={subroutineId} />) }
                </S.ScrollRegion>
            </S.Container>
            { operationDialogTargetId && <OperationDialog /> }
        </OperationDialogContext>
    );
};

export default Routine;
