import { type CommandData, CommandId, CommandDesign } from "@/types";

import login from './commands/login';
import scan from './commands/scan';

const commandDataById: Record<CommandId, CommandData> = {
    [CommandId.Login]: login,
    [CommandId.Scan]: scan,
};

const allCommandIds: CommandId[] = Object.values(CommandId);

abstract class Commands {
    public static getAllCommandIds: () => CommandId[]
    = () => allCommandIds;

    public static getCommandData: (commandId: CommandId) => CommandData
    = (commandId) => commandDataById[commandId];

    public static getCommandDesign: (commandId: CommandId) => CommandDesign
    = (commandId) => commandDataById[commandId].design;
};

export default Commands;
