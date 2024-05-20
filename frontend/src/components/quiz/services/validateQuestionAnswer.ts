import api from "../../../services/api";
import { apiRoutes } from "../../../services/apiRoutes";
import { getMessageFromError } from "../../../utils/error";

type ValidateQuestionAnswerResponse = {
    correct_option_uuid: string;
    right_answer: boolean;
};

export async function validateQuestionAnswer(questionUuid: string, optionUuid: string) {
    try {
        const res = await api.post(apiRoutes.question.validateAnswer(questionUuid), {
            option_uuid: optionUuid,
        });
        return {
            data: res.data as ValidateQuestionAnswerResponse,
            error: null,
        }
    } catch (e) {
        return {
            data: null,
            error: getMessageFromError(e),
        }
    }
}

