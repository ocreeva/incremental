import { MessageId } from '@/constants';
import { getMessageSubcode, getMessageCode } from '@/core';
import { IMessageDesign } from '@/types';

import { ReactComponent as InformationGlyph } from './glyphs/information.svg';
import { ReactComponent as WarningGlyph } from './glyphs/warning.svg';
import { ReactComponent as ErrorGlyph } from './glyphs/error.svg';

enum Severity {
    Description,
    Information,
    Warning,
    Error,
}

const severityIcon: Record<Severity, React.FC | null> = {
    [Severity.Description]: null,
    [Severity.Information]: InformationGlyph,
    [Severity.Warning]: WarningGlyph,
    [Severity.Error]: ErrorGlyph,
};

const severityText: Record<Severity, string | null> = {
    [Severity.Description]: null,
    [Severity.Information]: "Notice",
    [Severity.Warning]: "Warning",
    [Severity.Error]: "Error",
};

const designs: Record<number, IMessageDesign> = {};

class MessageDesign implements IMessageDesign {
    public readonly id: MessageId;
    public readonly GlyphComponent: React.FC | null;
    public readonly severity: string | null;
    public readonly text: string;

    public constructor(id: MessageId, severity: Severity, text: string) {
        this.id = id;
        this.GlyphComponent = severityIcon[severity];
        this.severity = severityText[severity];
        this.text = text;

        designs[id] = this;
    }
}

new MessageDesign(MessageId.OperationInterrupted | MessageId.RoutineStopped, Severity.Information, "Routine execution was stopped before this operation completed.");
new MessageDesign(MessageId.OperationInterrupted | MessageId.RoutineTimeElapsed, Severity.Information, "Routine execution timed out before this operation completed.");
new MessageDesign(MessageId.OperationUnstarted | MessageId.RoutineStopped, Severity.Information, "Routine execution was stopped before this operation started.");
new MessageDesign(MessageId.OperationUnstarted | MessageId.RoutineTimeElapsed, Severity.Error, "Routine execution timed out before this operation was reached.");

export function getUnhandledMessageDesign(messageId: number): IMessageDesign {
    const messageCode = getMessageCode(messageId);
    const messageSubcode = getMessageSubcode(messageId);
    const text = `Unhandled message ID (${messageId}, code: ${MessageId[messageCode] ?? messageCode}, subcode: ${MessageId[messageSubcode] ?? messageSubcode}).`;
    console.error(text);
    return new MessageDesign(messageId, Severity.Error, text);
}

export default designs;
