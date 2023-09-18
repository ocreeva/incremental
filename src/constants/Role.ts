enum Role {
    Anon = 'role-anon',
    Guest = 'role-guest',
    User = 'role-user',
    Admin = 'role-admin',
    Root = 'role-root',
}

export const MaxLevelByRole: Record<Role, number> = {
    [Role.Anon]: 1,
    [Role.Guest]: 2,
    [Role.User]: 3,
    [Role.Admin]: 4,
    [Role.Root]: 5,
};

export default Role;
