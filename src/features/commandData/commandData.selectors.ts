import { createCachedSelector } from 're-reselect';

import { RootState } from '@/App/store';
import { CommandId } from '@/constants';
import { CommandData } from '@/types';

import adapter from './commandData.adapter';

const { selectById } = adapter.getSelectors<RootState>(({ commandData }) => commandData);

const selectId: (state: RootState, id: CommandId) => CommandId
= (_state, id) => id;

const selectDefaultCommandData: (state: RootState, id: CommandId) => CommandData
= createCachedSelector(
    selectId,
    (id) => ({ id })
)(selectId);

export const selectCommandData: (state: RootState, id: CommandId) => CommandData
= createCachedSelector(
    selectById,
    selectDefaultCommandData,
    (value, defaultValue) => { return value ?? defaultValue; }
)(selectId);
