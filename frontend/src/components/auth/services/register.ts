import api from "../../../services/api";
import { apiRoutes } from "../../../services/apiRoutes";
import { getMessageFromError } from "../../../utils/error";

export type RegisterData = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};

export async function Register(data: RegisterData) {
    try {
        const res = await api.post(apiRoutes.auth.register, data);
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