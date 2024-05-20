export const apiRoutes = {
    auth: {
        login: 'auth/token/',
        register: 'user/register',
        refreshToken: "auth/token/refresh/"
    },

    quiz: {
        create: 'quiz/',
        update: (uuid: string) => `quiz/${uuid}/`,
        delete: (uuid: string) => `quiz/${uuid}/`,
        publish: (uuid: string) => `quiz/${uuid}/publish/`,
        myQuizzes: 'quiz/mine/',
        get: (uuid: string) => `quiz/${uuid}/`,
    },
} as const;