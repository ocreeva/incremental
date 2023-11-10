import { MessageId } from '@/constants';

declare interface IMessageDesign {
    readonly id: MessageId;

    readonly GlyphComponent: React.FC | null;
    readonly severity: string | null;

    readonly text: string;
}

export default IMessageDesign;
