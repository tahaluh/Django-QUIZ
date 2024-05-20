export const apiRoutes = {
    auth: {
        login: 'auth/token/',
        register: 'user/register',
        refreshToken: "auth/token/refresh/"
    },

    quiz: {
        create: 'quiz/',
        delete: (uuid: string) => `quiz/${uuid}/`,
        myQuizzes: 'quiz/mine/',
    },
} as const;