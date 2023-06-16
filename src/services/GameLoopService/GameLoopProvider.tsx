import { useGameAnimationFrame } from '@/hooks';

import GameLoopService from './GameLoopService';

const GameLoopProvider: React.FC = () => {
    useGameAnimationFrame(GameLoopService.tick);

    return (<></>);
};

export default GameLoopProvider;
