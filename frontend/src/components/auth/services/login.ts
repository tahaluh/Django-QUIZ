import api from "../../../services/api";
import { apiRoutes } from "../../../services/apiRoutes";
import { getMessageFromError } from "../../../utils/error";

export type LoginData = {
    email: string;
    password: string;
};

export async function Login(data: LoginData) {
    try {
        const res = await api.post(apiRoutes.auth.login, data);
        return {
            data: res.data,
            error: null,
        }
    } catch (e) {
        return {
            data: null,
            error: getMessageFromError(e),
        }
    }
}