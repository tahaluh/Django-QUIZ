import api from "../../../services/api";
import { apiRoutes } from "../../../services/apiRoutes";
import { getMessageFromError } from "../../../utils/error";


export async function publishQuiz(uuid: string) {
    try {
        const res = await api.post(apiRoutes.quiz.publish(uuid));
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