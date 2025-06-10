export const roleAccessMap = {
    owner:   ["/", "/settings", "/users", "/billing"],
    admin:   ["/", "/users"],
    member:  ["/"]
} as const;

export function doesRoleHaveAccess(role: string, path: string) {
    const allowed = roleAccessMap[role] ?? [];
    return allowed.some((pattern) => {
        // turn “/users/[id]” into regex
        const r = new RegExp(
            "^" + pattern.replace(/\[.*?\]/g, "[^/]+").replace(/\//g, "\\/") + "$"
        );
        return r.test(path);
    });
}