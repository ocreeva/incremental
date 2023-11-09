import { ErrorCode } from '@/constants';

declare interface IErrorDesign {
    readonly code: ErrorCode;

    readonly GlyphComponent: React.FC;
    readonly severity: string;

    readonly text: string;
}

export default IErrorDesign;
