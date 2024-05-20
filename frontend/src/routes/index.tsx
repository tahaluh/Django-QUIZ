import { useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Routes from "./Routes";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import NotFound from "../pages/NotFound";
import Logout from "../pages/Logout";
import ProtectedRoute from "../components/ProtectedRoute";
import Layout from "../components/layout/Layout";
import CreateQuizPage from "../pages/quiz/CreateQuiz";
import MyQuizzesPage from "../pages/quiz/MyQuizzes";

interface RenderRouteParams {
    layout?: boolean;
    protectedRoute?: boolean;
}

export default function Router() {
    const renderRoute = (element: JSX.Element, data: RenderRouteParams = { layout: true, protectedRoute: true }) => {
        const { layout = true, protectedRoute = true } = data;
        const elementWithLayout = layout ? <Layout>{element}</Layout> : element;
        return protectedRoute ? <ProtectedRoute>{elementWithLayout}</ProtectedRoute> : elementWithLayout;
    };

    return useRoutes([
        {
            path: Routes.home,
            element: renderRoute(<Home />),
        },
        // auth routes
        {
            path: Routes.auth.login,
            element: <LoginPage />,
        },
        {
            path: Routes.auth.register,
            element: <RegisterPage />,
        },
        {
            path: Routes.auth.logout,
            element: <Logout />,
        },

        // Quiz routes
        {
            path: Routes.quiz.create,
            element: renderRoute(<CreateQuizPage />),
        },
        {
            path: Routes.quiz.myQuizzes,
            element: renderRoute(<MyQuizzesPage />),
        },

        // 404 route
        {
            path: '*',
            element: <NotFound />,
        },
    ])
}
