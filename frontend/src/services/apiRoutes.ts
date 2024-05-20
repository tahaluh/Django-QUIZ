export const apiRoutes = {
    auth: {
        login: 'auth/token/',
        register: 'user/register',
        refreshToken: "auth/token/refresh/"
    },

    quiz: {
        create: 'quiz/',
        delete: (uuid: string) => `quiz/${uuid}/`,
        publish: (uuid: string) => `quiz/${uuid}/publish/`,
        myQuizzes: 'quiz/mine/',
    },
} as const;