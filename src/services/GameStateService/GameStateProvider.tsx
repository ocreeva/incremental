import { useGameAnimationFrame } from '@/hooks';

import GameStateService from './GameStateService';

const GameStateProvider: React.FC = () => {
    useGameAnimationFrame(GameStateService.tick);

    return (<></>);
};

export default GameStateProvider;
