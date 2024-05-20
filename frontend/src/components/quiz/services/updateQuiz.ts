import api from "../../../services/api";
import { apiRoutes } from "../../../services/apiRoutes";
import { getMessageFromError } from "../../../utils/error";

export type QuizData = {
    title: string;
    description: string;
    questions: {
        question: string;
        options: {
            option: string;
            correct_option: boolean;
        }[];
    }[];
};

export async function updateQuiz(uuid: string, data: QuizData) {
    try {
        const res = await api.put(apiRoutes.quiz.update(uuid), data);
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