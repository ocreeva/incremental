import { RoutineView, RoutineViewState } from '@/types';

import adapter from './routineView.adapter';

const initialRoutine: RoutineView = {
    id: '00000000-0000-0000-0000-000000000000',
    subroutines: [ ],
    duration: 0,
    elapsed: 0,
};
const initialState: RoutineViewState = adapter.addOne(adapter.getInitialState({
    currentId: initialRoutine.id,
}), initialRoutine);

export default initialState;
