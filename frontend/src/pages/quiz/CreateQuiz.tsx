import { Container } from "@chakra-ui/react";
import Page from "../../template/components/Page";
import CreateQuizForm from "../../components/quiz/CreateQuizForm.tsx";

function CreateQuizPage() {
    return (
        <Page title="Create Quiz">
            <Container minW={"100vw"}>
                <CreateQuizForm />
            </Container>
        </Page>
    );
}

export default CreateQuizPage;