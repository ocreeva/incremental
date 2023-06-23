import type { PayloadMessage } from "@/types/worker";

declare type AsyncPayloadMessage<TPayload = void> = PayloadMessage<TPayload> & {
    requestId: string;
};

export default AsyncPayloadMessage;
