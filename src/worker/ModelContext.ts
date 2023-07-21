import type { MessageService } from "@/types/worker";
import type { AsyncModelMessage, ModelMessage } from "./client";

declare interface ModelContext {
    readonly messageService: MessageService<ModelMessage, AsyncModelMessage>;
}

export default ModelContext;
