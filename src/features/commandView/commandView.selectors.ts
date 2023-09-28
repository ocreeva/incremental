import { createCachedSelector } from 're-reselect';

import { RootState } from '@/App/store';
import { CommandId } from '@/constants';
import { assert } from '@/core';
import commandDesigns from '@/game/commands/designs';
import { CommandView, ICommandDesign } from '@/types';

import adapter from './commandView.adapter';

const { selectById } = adapter.getSelectors<RootState>(({ commandView }) => commandView);

const selectId: (state: RootState, id: CommandId) => CommandId = (_state, id) => id;

const selectCommandView: (state: RootState, id: CommandId) => CommandView
= createCachedSelector(
    [selectById, selectId],
    (value, id) => {
        assert(value !== undefined, `CommandView not found for Command '${id}'.`);
        return value;
    }
)(selectId);

export const selectCommandDesign: (state: RootState, id: CommandId) => ICommandDesign
= createCachedSelector(
    [selectCommandView, selectId],
    (view, id) => new commandDesigns[id](view)
)(selectId);
