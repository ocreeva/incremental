import CommandId from "@/data/CommandId";

export interface ProgramInstruction {
    id: string;
    command: CommandId;
}

export interface ProgramState {
    instructions: ProgramInstruction[];
}
