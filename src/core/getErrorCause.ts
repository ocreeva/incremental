import { ErrorCode } from '@/constants';

export default function getErrorCause(error: ErrorCode): ErrorCode {
    return error & ErrorCode.CauseMask;
}
