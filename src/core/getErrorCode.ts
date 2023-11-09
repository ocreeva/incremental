import { ErrorCode } from '@/constants';

export default function getErrorCode(error: ErrorCode) : ErrorCode {
    return error & ErrorCode.CodeMask;
}
