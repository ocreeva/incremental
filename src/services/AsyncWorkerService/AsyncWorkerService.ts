export interface AsyncRequestProvider {
    requestAsync: (action: string, payload: any) => Promise<any>;
}

class AsyncWorkerService implements AsyncRequestProvider {
    private _postMessage: (message: any) => void;
    private _resolvers: { [requestId: string]: (payload: any) => void } = {};

    constructor(postMessage: (message: any) => void) {
        this._postMessage = postMessage;
    }

    requestAsync: (action: string, payload: any) => Promise<any>
    = (action, payload) => {
        const requestId = crypto.randomUUID();
        const promise = new Promise(resolve => this._resolvers[requestId] = resolve);

        this._postMessage({ action, payload, requestId });

        return promise;
    }

    resolveRequest: (requestId: string, payload: any) => void
    = (requestId, payload) => {
        if (!(requestId in this._resolvers)) {
            console.warn('AsyncRequestProcessor.resolveRequest called with missing request ID:', requestId);
            return;
        }

        try {
            this._resolvers[requestId](payload);
        }
        finally {
            delete this._resolvers[requestId];
        }
    }
}

export default AsyncWorkerService;
