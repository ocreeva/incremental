import EventKey from './EventKey';
import EventMap from './EventMap';
import EventReceiver from './EventReceiver';

declare interface IEventable<T extends EventMap> {
    on<K extends EventKey<T>>(name: K, receiver: EventReceiver<T[K]>): void;
    off<K extends EventKey<T>>(name: K, receiver: EventReceiver<T[K]>): void;
}

export default IEventable;
