import type { ScriptState } from '@/types';

export const _createScript: (name?: string) => ScriptState
= (name = 'script') => ({
    id: crypto.randomUUID(),
    name,
    instructions: [ ],
});
