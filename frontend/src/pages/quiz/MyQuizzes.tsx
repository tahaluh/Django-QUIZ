import { Container } from '@chakra-ui/react';
import Page from '../../template/components/Page';
import MyQuizzes from '../../components/quiz/MyQuizzes';


function MyQuizzesPage() {
    return (
        <Page title="Home">
            <Container maxW={'90vw'}>
                <MyQuizzes />
            </Container>
        </Page >
    );
}

export default MyQuizzesPage;
