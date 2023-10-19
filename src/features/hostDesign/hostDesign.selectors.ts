import createCachedSelector from 're-reselect';

import { RootState } from '@/App/store';
import { Host } from '@/constants';
import hostDesigns from '@/game/hosts/designs';
import { IHostDesign } from '@/types';

const selectHost: (state: RootState, host: Host) => Host = (_state, host) => host;

export const selectHostDesign: (state: RootState, host: Host) => IHostDesign
= createCachedSelector(
    [selectHost],
    host => hostDesigns[host]
)(selectHost);
