import { CommandId } from '@/constants';
import { crash } from '@/core';

const _assertRecordContainsAllCommands: <T>(_: Record<string, T>) => asserts _ is Record<CommandId, T>
= (_) => {
    const ids = Object.values(CommandId);
    ids.forEach(id => id in _ || crash(`No design registered from command '${id}'.`));
    Object.keys(_).forEach(key => ids.includes(key as CommandId) || crash(`Design registered for unknown command '${key}'.`));
};

declare type HasCommandId = { id: CommandId; };
declare type GetRecordOf<T> = () => Record<CommandId, T>;
declare type Register<T> = (concept: T) => void;

const _createCommandRecord: <T extends HasCommandId>() => [GetRecordOf<T>, Register<T>]
= <T extends HasCommandId>() => {
    const record: Record<string, T> = { };

    const getRecordOf: GetRecordOf<T>
    = () => {
        _assertRecordContainsAllCommands(record);
        return record as Record<CommandId, T>;
    };

    const register: Register<T>
    = (entry: T) => {
        const { id } = entry;
        if (id in record) crash(`Duplicate registration for command '${id}'.`);
        record[id] = entry;
    };

    return [getRecordOf, register];
};

export default _createCommandRecord;
