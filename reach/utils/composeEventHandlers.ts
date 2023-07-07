declare type EventHandler<TEvent extends React.SyntheticEvent | Event> = (event: TEvent) => void;

const composeEventHandlers: <TEvent extends React.SyntheticEvent | Event>(
    primaryHandler: EventHandler<TEvent> | undefined,
    secondaryHandler: EventHandler<TEvent>
) => EventHandler<TEvent>
= (primaryHandler, secondaryHandler) => {
    return primaryHandler
        ? (event) => {
            primaryHandler(event);
            if (event.defaultPrevented) return;
            secondaryHandler(event);
        } : (event) => {
            if (event.defaultPrevented) return;
            secondaryHandler(event);
        };
};

export default composeEventHandlers;
