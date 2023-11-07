import { ErrorCode } from '@/constants';

export default function getErrorCode(error: number) : ErrorCode {
    return (error & ErrorCode.Mask) as ErrorCode;
}
