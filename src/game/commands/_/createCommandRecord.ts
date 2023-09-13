import { CommandId } from '@/constants';
import { crash } from '@/core';

const assertRecordContainsAllCommands: <T>(record: Record<string, T>) => asserts record is Record<CommandId, T>
= (record) => {
    const ids = Object.values(CommandId);
    ids.forEach(id => id in record || crash(`No registration for command '${id}'.`));
    Object.keys(record).forEach(key => ids.includes(key as CommandId) || crash(`Registration for unknown command '${key}'.`));
};

declare type HasCommandId = { readonly id: CommandId; };
declare type GetRecordOf<T> = () => Record<CommandId, T>;
declare type Register<T> = (concept: T) => void;

const createCommandRecord: <T extends HasCommandId>() => [GetRecordOf<T>, Register<T>]
= <T extends HasCommandId>() => {
    const record: Record<string, T> = { };

    const getRecordOf: GetRecordOf<T>
    = () => {
        assertRecordContainsAllCommands(record);
        return record as Record<CommandId, T>;
    };

    const register: Register<T>
    = (entry: T) => {
        const { id } = entry;
        if (id in record) console.warn(`Duplicate registration for command '${id}'.`);
        record[id] = entry;
    };

    return [getRecordOf, register];
};

export default createCommandRecord;
