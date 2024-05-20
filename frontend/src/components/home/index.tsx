import { Box, Input, Grid, GridItem } from '@chakra-ui/react';
import QuizCard from '../quiz/QuizCard';
import { useEffect, useState } from 'react';
import { Quiz } from '../quiz/services/types';
import { listQuizzes } from '../quiz/services/listQuizzes';

function Home() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    const fetchQuizzes = async () => {
        const { data } = await listQuizzes();
        if (data) {
            setQuizzes(data);
        }
    }

    useEffect(() => {
        fetchQuizzes();
    }, []);
    return (
        <Box p={4}>
            <Input placeholder="Search quizzes..." mb={4} />
            <Grid templateColumns={{
                base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)'
            }} gap={4}>
                {quizzes.map((quiz) => (
                    <GridItem key={quiz.uuid}>
                        <QuizCard quiz={quiz} />
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
}

export default Home;

