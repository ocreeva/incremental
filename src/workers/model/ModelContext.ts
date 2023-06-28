import type { OperationState, SubroutineState } from "@/types";
import type { AsyncRequestProvider } from "@/types/worker";
import type { AsyncModelMessage } from "./client";

declare interface ModelContext {
    get mainThread(): AsyncRequestProvider<AsyncModelMessage>;

    get createdOperations(): OperationState[];
    get createdSubroutines(): SubroutineState[];
}

export default ModelContext;
