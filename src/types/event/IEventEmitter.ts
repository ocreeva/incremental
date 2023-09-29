import EventKey from './EventKey';
import EventMap from './EventMap';
import IEventable from './IEventable';

interface IEventEmitter<T extends EventMap> extends IEventable<T> {
    emit<K extends EventKey<T>>(name: K, params: T[K]): void;
}

export default IEventEmitter;
