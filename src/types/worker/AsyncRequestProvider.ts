/**
 * Represents a provider for asynchronous requests across the main/worker thread boundary.
 */
declare interface AsyncRequestProvider {
    /**
     * Make an asynchronous request across the main/worker thread boundary.
     * 
     * @typeParam TResponse - The type of the response.
     * @typeParam TPayload - The type of the request's payload.
     * 
     * @param type - The request's message type.
     * @param payload - The requests's payload.
     * @returns The asynchronous response, as a Promise.
     */
    requestAsync: <TResponse = void, TPayload = void>(type: string, payload: TPayload) => Promise<TResponse>;
};

export default AsyncRequestProvider;
