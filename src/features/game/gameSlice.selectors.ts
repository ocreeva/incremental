import { type RootState } from '@/App/store';

export const selectGameIsPlaying: (state: RootState) => boolean
= ({ game: { isPlaying } }) => isPlaying;
