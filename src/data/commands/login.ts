import { CommandId } from '@/types';

import type { CommandData, CommandDesign } from '@/types';

const design: CommandDesign = {
    name: "Login",
};

const data: CommandData = {
    id: CommandId.Login,
    design,
};

export default data;
