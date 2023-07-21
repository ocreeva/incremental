import type GameModel from './GameModel';

declare interface CommandModel extends GameModel {
    readonly duration: number;
    readonly elapsed: number;
}

export default CommandModel;
