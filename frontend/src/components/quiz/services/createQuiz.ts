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

export async function CreateQuiz(data: QuizData) {
    try {
        const res = await api.post(apiRoutes.quiz.create, data);
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