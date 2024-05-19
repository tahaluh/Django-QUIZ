import { Container } from "@chakra-ui/react";
import LoginCard from "../components/auth/LoginCard";
import Page from "../template/components/Page";

function LoginPage() {
    return (
        <Page title="Login">
            <Container maxW={'xl'}>
                <LoginCard />
            </Container>
        </Page>
    );
}

export default LoginPage;