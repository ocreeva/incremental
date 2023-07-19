import { createContext } from '@reach/utils';

import { type EntityId } from '@/types';

declare type InstructionContextProps = {
    instructionId: EntityId;
};

export const [ InstructionProvider, useInstructionContext ] = createContext<InstructionContextProps>('InstructionContext');
