import { register } from "module";

export const apiRoutes = {
    auth: {
        login: 'auth/login',
        register: 'user/register',
    },
} as const;