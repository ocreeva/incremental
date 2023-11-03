import { ErrorCode } from '@/constants';
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

const designs: Record<ErrorCode, IErrorDesign | null> = {
    [ErrorCode.None]: null,
    [ErrorCode.RoutineStopped]: new ErrorDesign(Severity.Information, "Routine execution was stopped before this operation completed."),
    [ErrorCode.RoutineTimeElapsed]: new ErrorDesign(Severity.Information, "Routine execution timed out before this operation completed."),
};

export default designs;
