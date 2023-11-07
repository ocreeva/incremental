import { ErrorCause } from '@/constants';

export default function getErrorCause(error: number): ErrorCause {
    return (error & ErrorCause.Mask) as ErrorCause;
}
