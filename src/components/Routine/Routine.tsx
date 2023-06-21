import { CSSProperties } from 'react';

import { CommandId, RoutineModel } from "@/types";

import * as S from './Routine.styles';
import Subroutine from './Subroutine';

const routine: RoutineModel = {
    key: '',
    duration: 452,
    subroutines: [
        {
            key: '1',
            operations: [
                { key: '1', commandId: CommandId.Login, progress: 35, duration: 42 },
                { key: '2', commandId: CommandId.Scan, progress: 65, duration: 42 },
            ],
            duration: 42
        },
        {
            key: '2',
            operations: [
                { key: '1', commandId: CommandId.Login, progress: 100, duration: 84 },
                { key: '2', commandId: CommandId.Scan, progress: 50, duration: 210 },
                { key: '3', commandId: CommandId.Scan, progress: 0, duration: 126 },
            ],
            duration: 436
        },
        {
            key: '3',
            operations: [
                { key: '1', commandId: CommandId.Login, progress: 1, duration: 84 },
                { key: '2', commandId: CommandId.Scan, progress: 5, duration: 84 },
                { key: '3', commandId: CommandId.Scan, progress: 10, duration: 84 },
                { key: '4', commandId: CommandId.Scan, progress: 20, duration: 84 },
                { key: '5', commandId: CommandId.Scan, progress: 30, duration: 84 },
            ],
            duration: 452
        },
    ],
};

const Routine: React.FC = () => {
    const { duration, subroutines } = routine;

    const style = {
        '--routine_duration': `${duration}`,
        '--routine_subroutine-count': `${subroutines.length}`,
    } as CSSProperties;

    return (
        <S.Container style={style}>
            <S.ScrollRegion>
                { subroutines.map(subroutine => <Subroutine {...subroutine} />) }
            </S.ScrollRegion>
        </S.Container>
    );
};

export default Routine;
