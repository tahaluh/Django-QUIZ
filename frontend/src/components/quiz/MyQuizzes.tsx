import { Box, Grid, GridItem } from '@chakra-ui/react';
import QuizCard from './QuizCard';
import { getMyQuizzes } from './services/getMyQuizzes';
import { Quiz } from './services/types';
import { useEffect, useState } from 'react';

function MyQuizzes() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    const fetchQuizzes = async () => {
        const { data } = await getMyQuizzes();
        if (data) {
            setQuizzes(data);
        }
    }

    useEffect(() => {
        fetchQuizzes();
    }, []);

    return (
        <Box p={4}>
            <Grid templateColumns={{
                base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)', xl: 'repeat(5, 1fr)'
            }} gap={4}>
                {quizzes.map((quiz) => (
                    <GridItem key={quiz.uuid}>
                        <QuizCard quiz={quiz} own refetch={fetchQuizzes} />
                    </GridItem>
                ))}
                {
                    quizzes.length === 0 && (
                        <Box textAlign="center" w="100%" gridColumn="1 / -1">
                            No quizzes found...
                        </Box>
                    )
                }
            </Grid>
        </Box>
    );
}

export default MyQuizzes;

