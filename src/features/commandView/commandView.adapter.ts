import { createEntityAdapter } from '@reduxjs/toolkit';

import { CommandView } from '@/types';

const adapter = createEntityAdapter<CommandView>({ selectId: ({ id }) => id });

export default adapter;
