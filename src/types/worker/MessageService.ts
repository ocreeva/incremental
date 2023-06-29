import MessageRequestProvider from './MessageRequestProvider';
import MessageRespondProvider from './MessageRespondProvider';
import MessageSendProvider from './MessageSendProvider';

declare interface MessageService<TMessage extends string, TAsyncMessage extends string> extends
    MessageRequestProvider<TAsyncMessage>,
    MessageRespondProvider<TAsyncMessage>,
    MessageSendProvider<TMessage>
{ }

export default MessageService;
