import { CommandId } from '@/types';

import type { CommandData, CommandDesign } from '@/types';

const design: CommandDesign = {
    name: "Scan",
};

const data: CommandData = {
    id: CommandId.Scan,
    design,
};

export default data;
