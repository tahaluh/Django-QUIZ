import { ElementType, Suspense } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import Home from "../pages/Home";
import Routes from "./Routes";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import NotFound from "../pages/NotFound";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Loadable = (Component: ElementType) => (props: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname } = useLocation();

    return (
        <Suspense fallback={<div>Loading...</div>}
        >
            <Component {...props} />
        </Suspense>
    );
};


export default function Router() {
    return useRoutes([
        {
            path: Routes.home,
            element: <Home />,
        },
        {
            path: Routes.auth.login,
            element: <LoginPage />,
        },
        {
            path: Routes.auth.register,
            element: <RegisterPage />,
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ])
}
