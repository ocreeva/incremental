import { createContext } from '@reach/utils';

import { CommandId } from '@/constants';

declare type CommandContextProps = {
    commandId: CommandId;
};

export const [ CommandProvider, useCommandContext ] = createContext<CommandContextProps>('CommandContext');
