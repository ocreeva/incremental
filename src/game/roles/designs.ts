import { Role } from '@/constants';
import type { IRoleDesign } from '@/types';

import { ReactComponent as AdminGlyph } from './glyphs/role-admin.svg';
import { ReactComponent as AnonGlyph } from './glyphs/role-anon.svg';
import { ReactComponent as GuestGlyph } from './glyphs/role-guest.svg';
import { ReactComponent as RootGlyph } from './glyphs/role-root.svg';
import { ReactComponent as UserGlyph } from './glyphs/role-user.svg';

const AnonDesign: IRoleDesign = {
    name: "Anonymous",
    GlyphComponent: AnonGlyph,
};

const GuestDesign: IRoleDesign = {
    name: "Guest",
    GlyphComponent: GuestGlyph,
};

const UserDesign: IRoleDesign = {
    name: "User",
    GlyphComponent: UserGlyph,
};

const AdminDesign: IRoleDesign = {
    name: "Admin",
    GlyphComponent: AdminGlyph,
};

const RootDesign: IRoleDesign = {
    name: "Root",
    GlyphComponent: RootGlyph,
};

const designs: Record<Role, IRoleDesign> = {
    [Role.Anon]: AnonDesign,
    [Role.Guest]: GuestDesign,
    [Role.User]: UserDesign,
    [Role.Admin]: AdminDesign,
    [Role.Root]: RootDesign,
};

export default designs;
