import { Host } from '@/constants';
import type { IHostDesign } from '@/types';

import { ReactComponent as CoreGlyph } from './glyphs/host-core.svg';
import { ReactComponent as FilesGlyph } from './glyphs/host-files.svg';
import { ReactComponent as HRGlyph } from './glyphs/host-hr.svg';
import { ReactComponent as HubGlyph } from './glyphs/host-hub.svg';
import { ReactComponent as SecurityGlyph } from './glyphs/host-security.svg';

const HubDesign: IHostDesign = {
    name: "Hub",
    GlyphComponent: HubGlyph,
};

const FilesDesign: IHostDesign = {
    name: "Files",
    GlyphComponent: FilesGlyph,
};

const HRDesign: IHostDesign = {
    name: "HR",
    GlyphComponent: HRGlyph,
};

const SecurityDesign: IHostDesign = {
    name: "Security",
    GlyphComponent: SecurityGlyph,
};

const CoreDesign: IHostDesign = {
    name: "Core",
    GlyphComponent: CoreGlyph,
};

const designs: Record<Host, IHostDesign> = {
    [Host.Hub]: HubDesign,
    [Host.Files]: FilesDesign,
    [Host.HR]: HRDesign,
    [Host.Security]: SecurityDesign,
    [Host.Core]: CoreDesign,
};

export default designs;
