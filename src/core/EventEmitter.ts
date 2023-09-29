import { EventKey, EventMap, EventReceiver, IEventEmitter } from '@/types/event';

class EventEmitter<T extends EventMap> implements IEventEmitter<T> {
    private receivers: { [K in keyof EventMap]?: Array<(p: EventMap[K]) => void>; } = {};

    public emit<K extends EventKey<T>>(name: K, params: T[K]): void {
        (this.receivers[name] ?? []).forEach(receiver => receiver(params));
    }

    public on<K extends EventKey<T>>(name: K, receiver: EventReceiver<T[K]>): void {
        this.receivers[name] = (this.receivers[name] ?? []).concat(receiver);
    }

    public off<K extends EventKey<T>>(name: K, receiver: EventReceiver<T[K]>): void {
        this.receivers[name] = (this.receivers[name] ?? []).filter(_ => _ != receiver);
    }
}

export default EventEmitter;
