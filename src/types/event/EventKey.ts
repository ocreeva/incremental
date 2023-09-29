import type EventMap from './EventMap';

declare type EventKey<T extends EventMap> = string & keyof T;

export default EventKey;
