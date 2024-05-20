export const apiRoutes = {
    auth: {
        login: 'auth/token/',
        register: 'user/register',
        refreshToken: "auth/token/refresh/"
    },
} as const;