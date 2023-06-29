import type { OperationState, SubroutineState } from "@/types";
import type { MessageService } from "@/types/worker";
import type { AsyncModelMessage, ModelMessage } from "./client";

declare interface ModelContext {
    get messageService(): MessageService<ModelMessage, AsyncModelMessage>;

    get createdOperations(): OperationState[];
    get createdSubroutines(): SubroutineState[];
}

export default ModelContext;
