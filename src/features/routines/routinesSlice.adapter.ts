import { createEntityAdapter } from '@reduxjs/toolkit';

import { RoutineState } from '@/types';

export default createEntityAdapter<RoutineState>({
    selectId: ({ id }) => id,
});
