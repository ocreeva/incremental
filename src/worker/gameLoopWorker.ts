import WorkerAction from './WorkerAction';

self.onmessage = ({ data: { action } }) => {
    switch (action as WorkerAction) {
        case WorkerAction.Tick:
            break;

        default:
            console.warn('Unhandled action in worker:', action);
    }
}
