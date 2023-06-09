import { RootState } from '@/App/store';

export const selectGameIsPaused = ({ game: { isPaused } }: RootState): boolean => isPaused;
