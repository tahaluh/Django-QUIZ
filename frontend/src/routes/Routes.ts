const Routes = {
    home: '/',

    auth: {
        login: '/login',
        register: '/register',
        logout: '/logout',
    },

    quiz: {
        create: '/quiz/create',
        myQuizzes: '/quiz/my',
        edit: (quizUuid: string) => `/quiz/${quizUuid}/edit`,
        play: (quizUuid: string) => `/quiz/${quizUuid}/play`,
        result: (quizUuid: string) => `/quiz/${quizUuid}/result`,
    }
} as const;

export default Routes;