import { MessageId, MessageSeverity } from '@/constants';
import { getMessageSubcode, getMessageCode } from '@/core';
import { IMessageDesign, IMessageDesignConstructor, OperationView } from '@/types';

import { ReactComponent as InformationGlyph } from './glyphs/information.svg';
import { ReactComponent as WarningGlyph } from './glyphs/warning.svg';
import { ReactComponent as ErrorGlyph } from './glyphs/error.svg';

const severityIcon: Record<MessageSeverity, React.FC | null> = {
    [MessageSeverity.Detail]: null,
    [MessageSeverity.Notice]: InformationGlyph,
    [MessageSeverity.Warning]: WarningGlyph,
    [MessageSeverity.Error]: ErrorGlyph,
};

const severityText: Record<MessageSeverity, string | null> = {
    [MessageSeverity.Detail]: null,
    [MessageSeverity.Notice]: "Notice",
    [MessageSeverity.Warning]: "Warning",
    [MessageSeverity.Error]: "Error",
};

declare type OperationMessageTemplate = (operation: OperationView) => string;

const designs: Record<number, IMessageDesignConstructor> = {};

function register(id: MessageId, template: string | OperationMessageTemplate, severityOverride?: MessageSeverity) {
    const messageTemplate: OperationMessageTemplate = typeof template === 'string' ? _ => template : template;
    const severity: MessageSeverity = severityOverride ?? id & MessageId.Mask_Severity;
    designs[id] = class MessageDesign implements IMessageDesign {
        public readonly id: MessageId;
        public readonly GlyphComponent: React.FC | null;
        public readonly severity: string | null;
        public readonly text: string;
    
        public constructor(operation: OperationView) {
            this.id = id;
            this.GlyphComponent = severityIcon[severity];
            this.severity = severityText[severity];
            this.text = messageTemplate(operation);
        }
    };
}

register(MessageId.OperationInterrupted | MessageId.RoutineStopped, "Routine execution was stopped before this operation completed.");
register(MessageId.OperationInterrupted | MessageId.RoutineTimeElapsed, "Routine execution timed out before this operation completed.");
register(MessageId.OperationUnstarted | MessageId.RoutineStopped, "Routine execution was stopped before this operation started.");
register(MessageId.OperationUnstarted | MessageId.RoutineTimeElapsed, "Routine execution timed out before this operation was reached.", MessageSeverity.Error);

export function getUnhandledMessageDesign(messageId: number): IMessageDesignConstructor {
    const messageCode = getMessageCode(messageId);
    const messageSubcode = getMessageSubcode(messageId);

    const text = `Unhandled message ID (${messageId}, code: ${MessageId[messageCode] ?? messageCode}, subcode: ${MessageId[messageSubcode] ?? messageSubcode}).`;
    console.error(text);

    // register the design for this message ID, to avoid clutter from the console log
    register(messageId, text, MessageSeverity.Error);
    return designs[messageId];
}

export default designs;
