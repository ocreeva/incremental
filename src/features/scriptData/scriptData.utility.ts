import { EntityId } from '@reduxjs/toolkit';

import { ScriptData } from '@/types';

export const createScriptData: (name?: string, id?: EntityId) => ScriptData
= (name = 'script', id = crypto.randomUUID()) => ({
    id,
    name,
    instructions: [ ],
});
