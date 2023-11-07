import { ErrorCause, ErrorCode } from '@/constants';
import { getErrorCause, getErrorCode } from '@/core';
import { IErrorDesign } from '@/types';

import { ReactComponent as InformationGlyph } from './glyphs/information.svg';
import { ReactComponent as WarningGlyph } from './glyphs/warning.svg';
import { ReactComponent as ErrorGlyph } from './glyphs/error.svg';

enum Severity {
    Information,
    Warning,
    Error,
}

const severityIcon: Record<Severity, React.FC> = {
    [Severity.Information]: InformationGlyph,
    [Severity.Warning]: WarningGlyph,
    [Severity.Error]: ErrorGlyph,
};

const severityText: Record<Severity, string> = {
    [Severity.Information]: "Notice",
    [Severity.Warning]: "Warning",
    [Severity.Error]: "Error",
};

class ErrorDesign implements IErrorDesign {
    public readonly GlyphComponent: React.FC;
    public readonly severity: string;
    public readonly text: string;

    public constructor(severity: Severity, errorText: string) {
        this.GlyphComponent = severityIcon[severity];
        this.severity = severityText[severity];
        this.text = errorText;
    }
}

const designs: Record<number, IErrorDesign> = {
    [ErrorCode.OperationInterrupted | ErrorCause.RoutineStopped]: new ErrorDesign(Severity.Information, "Routine execution was stopped before this operation completed."),
    [ErrorCode.OperationInterrupted | ErrorCause.RoutineTimeElapsed]: new ErrorDesign(Severity.Information, "Routine execution timed out before this operation completed."),
    [ErrorCode.OperationUnstarted | ErrorCause.RoutineStopped]: new ErrorDesign(Severity.Information, "Routine execution was stopped before this operation started."),
    [ErrorCode.OperationUnstarted | ErrorCause.RoutineTimeElapsed]: new ErrorDesign(Severity.Error, "Routine execution timed out before this operation was reached."),
};

export function getUnhandledErrorDesign(error: number): IErrorDesign {
    const errorCode = getErrorCode(error);
    const errorCause = getErrorCause(error);
    const message = `Unhandled error (${error}, ${ErrorCode[errorCode] ?? errorCode}, ${ErrorCause[errorCause] ?? errorCause}).`;
    console.error(message);
    return new ErrorDesign(Severity.Error, message);
}

export default designs;
