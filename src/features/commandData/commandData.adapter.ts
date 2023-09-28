import { createEntityAdapter } from '@reduxjs/toolkit';

import { CommandData } from '@/types';

const adapter = createEntityAdapter<CommandData>({ selectId: ({ id }) => id });

export default adapter;
