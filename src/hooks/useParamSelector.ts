import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { type RootState } from "@/App/store";

export default function useParamSelector<TArgs extends Array<unknown>, TResult>(
    parametricSelector: (state: RootState, ...args: TArgs) => TResult,
    ...args: TArgs
): TResult {
    const memoizedSelector = useMemo(
        () => (state: RootState) => parametricSelector(state, ...args),
        [parametricSelector, args]);
    return useSelector(memoizedSelector);
}
