import { type CommandData, type CommandDesign, CommandId } from "@/types";

const design: CommandDesign = {
    name: "Scan",
};

const data: CommandData = {
    id: CommandId.Scan,
    design,
};

export default data;
