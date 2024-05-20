import { Container } from "@chakra-ui/react";
import SignupCard from "../components/auth/SignupCard";
import Page from "../template/components/Page";

function RegisterPage() {
    return (
        <Page title="Register">
            <Container minW={"100vw"}>
                <SignupCard />
            </Container>
        </Page>
    );
}

export default RegisterPage;