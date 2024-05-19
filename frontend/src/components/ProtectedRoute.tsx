import { Navigate } from "react-router-dom";
import Routes from "../routes/Routes";
import { useAuth } from "./auth/AuthProvider";

function ProtectedRoute({ children }: {
    children: React.ReactNode;
}) {
    const { isAuthorized, isLoading } = useAuth();


    if (isLoading) {
        return <div>Loading...</div>
    }

    return isAuthorized ? children : <Navigate to={Routes.auth.login} />;
}

export default ProtectedRoute;