import { Command, CommandId } from "@/types";

import login from './commands/login';
import scan from './commands/scan';

const commandsById: Record<CommandId, Command> = {
    [CommandId.Login]: login,
    [CommandId.Scan]: scan,
};

const allCommandIds: CommandId[] = Object.values(CommandId);
export const getAllCommandIds: () => CommandId[] = () => allCommandIds;

export const getCommand: (commandId: CommandId) => Command = (commandId) => commandsById[commandId];
