import { type CommandData, type CommandDesign, CommandId } from "@/types";

const design: CommandDesign = {
    name: "Login",
};

const data: CommandData = {
    id: CommandId.Login,
    design,
};

export default data;
