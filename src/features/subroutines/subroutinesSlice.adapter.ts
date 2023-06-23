import { createEntityAdapter } from '@reduxjs/toolkit';

import { SubroutineState } from '@/types';

export default createEntityAdapter<SubroutineState>({
    selectId: ({ id }) => id,
});
