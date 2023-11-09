import { ErrorCode } from '@/constants';
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

const designs: Record<number, IErrorDesign> = {};

class ErrorDesign implements IErrorDesign {
    public readonly code: ErrorCode;
    public readonly GlyphComponent: React.FC;
    public readonly severity: string;
    public readonly text: string;

    public constructor(code: ErrorCode, severity: Severity, errorText: string) {
        this.code = code;
        this.GlyphComponent = severityIcon[severity];
        this.severity = severityText[severity];
        this.text = errorText;

        designs[code] = this;
    }
}

new ErrorDesign(ErrorCode.OperationInterrupted | ErrorCode.RoutineStopped, Severity.Information, "Routine execution was stopped before this operation completed.");
new ErrorDesign(ErrorCode.OperationInterrupted | ErrorCode.RoutineTimeElapsed, Severity.Information, "Routine execution timed out before this operation completed.");
new ErrorDesign(ErrorCode.OperationUnstarted | ErrorCode.RoutineStopped, Severity.Information, "Routine execution was stopped before this operation started.");
new ErrorDesign(ErrorCode.OperationUnstarted | ErrorCode.RoutineTimeElapsed, Severity.Error, "Routine execution timed out before this operation was reached.");

export function getUnhandledErrorDesign(error: number): IErrorDesign {
    const errorCode = getErrorCode(error);
    const errorCause = getErrorCause(error);
    const message = `Unhandled error (${error}, cause: ${ErrorCode[errorCause] ?? errorCause}, code: ${ErrorCode[errorCode] ?? errorCode}).`;
    console.error(message);
    return new ErrorDesign(error, Severity.Error, message);
}

export default designs;
