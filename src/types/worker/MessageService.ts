import type MessageRequestProvider from './MessageRequestProvider';
import type MessageRespondProvider from './MessageRespondProvider';
import type MessageSendProvider from './MessageSendProvider';

declare interface MessageService<TMessage extends string, TAsyncMessage extends string> extends
    MessageRequestProvider<TAsyncMessage>,
    MessageRespondProvider<TAsyncMessage>,
    MessageSendProvider<TMessage>
{ }

export default MessageService;
