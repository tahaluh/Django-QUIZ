import { Container } from "@chakra-ui/react";
import Page from "../../template/components/Page.tsx";
import AnswerQuiz from "../../components/quiz/AnswerQuiz.tsx";

function AnswerQuizPage() {
    return (
        <Page title={"Answer Quiz"}>
            <Container minW={"100vw"}>
                <AnswerQuiz />
            </Container>
        </Page>
    );
}

export default AnswerQuizPage;