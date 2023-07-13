import { CommandId } from '@/types';

import type { CommandData, CommandDesign } from '@/types';

const design: CommandDesign = {
    name: "Fork",
};

const data: CommandData = {
    id: CommandId.Fork,
    design,
};

export default data;
