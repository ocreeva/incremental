import createCachedSelector from 're-reselect';

import { RootState } from '@/App/store';
import { Role } from '@/constants';
import roleDesigns from '@/game/roles/designs';
import { IRoleDesign } from '@/types';

const selectRole: (state: RootState, role: Role) => Role = (_state, role) => role;

export const selectRoleDesign: (state: RootState, role: Role) => IRoleDesign
= createCachedSelector(
    [selectRole],
    role => roleDesigns[role]
)(selectRole);
