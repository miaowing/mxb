import { Role } from "../constants/role.enum";

export class AccessHelper {
    access(...roles: Role[]) {
        return ({ authentication: { item: user } }) => {
            if (!user) {
                return roles.includes(Role.ANONYMOUS);
            }
            const hasPermission = Boolean(roles.includes(user.role));
            if (!hasPermission && roles.includes(Role.OWNER)) {
                return { id: user.id };
            }

            return hasPermission;
        }
    }
}
