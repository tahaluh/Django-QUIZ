import { Container } from '@chakra-ui/react';
import Page from '../template/components/Page';
import Home from '../components/home';


function HomePage() {
    return (
        <Page title="Home">
            <Container maxW={'90vw'}>
                <Home />
            </Container>
        </Page >
    );
}

export default HomePage;
