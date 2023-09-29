import { CommandId } from '@/constants';
import { CommandView } from '@/types';

export const getDefaultCommandView: (id: CommandId) => CommandView
= (id) => ({
    id,
    isEnabled: false,
    isVisible: false,
    level: 0,
    progress: 0,
});
