import { MessageId } from '@/constants';

export default function getMessageCode(message: MessageId) : MessageId {
    return message & MessageId.Mask_Code;
}
