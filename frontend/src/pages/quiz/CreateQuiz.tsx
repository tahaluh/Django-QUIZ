import { Container } from "@chakra-ui/react";
import Page from "../../template/components/Page";
import CreateQuizForm from "../../components/quiz/CreateQuizForm.tsx";
import { useParams } from "react-router-dom";

function CreateQuizPage() {
    const { quizUuid } = useParams()

    return (
        <Page title={quizUuid ? "Edit Quiz" : "Create Quiz"}>
            <Container minW={"100vw"}>
                <CreateQuizForm />
            </Container>
        </Page>
    );
}

export default CreateQuizPage;