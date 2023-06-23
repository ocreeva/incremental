import { createEntityAdapter } from '@reduxjs/toolkit';

import { OperationState } from '@/types';

export default createEntityAdapter<OperationState>({
    selectId: ({ id }) => id,
});
