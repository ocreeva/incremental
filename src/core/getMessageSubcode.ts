import { MessageId } from '@/constants';

export default function getMessageSubcode(message: MessageId): MessageId {
    return message & MessageId.Mask_Subcode;
}
