import api from "../../../services/api";
import { apiRoutes } from "../../../services/apiRoutes";
import { getMessageFromError } from "../../../utils/error";
import { Quiz } from "./types";

export async function getMyQuizzes() {
    try {
        const res = await api.get(apiRoutes.quiz.myQuizzes);
        return {
            data: res.data as Quiz[],
            error: null,
        }
    } catch (e) {
        return {
            data: null,
            error: getMessageFromError(e),
        }
    }
}

