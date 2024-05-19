import { Box, Input, Grid, GridItem } from '@chakra-ui/react';
import QuizCard from '../quiz/QuizCard';

const quizzes = [
    {
        uuid: '1',
        title: 'Quiz 1',
        description: 'This is the first quiz',
        author: 'Author A',
        image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Quiz+1',
    },
    {
        uuid: '2',
        title: 'Quiz 2',
        description: 'This is the second quiz',
        author: 'Author B',
        image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Quiz+2',
    },
    {
        uuid: '3',
        title: 'Quiz 3',
        description: 'This is the third quiz',
        author: 'Author C',
        image: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Quiz+3',
    },
    {
        uuid: '4',
        title: 'Quiz 4',
        description: 'This is the fourth quiz',
        image: 'https://via.placeholder.com/150/FFFF00/FFFFFF?text=Quiz+4',
    }
];
function Home() {
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
                ))}{quizzes.map((quiz) => (
                    <GridItem key={quiz.uuid}>
                        <QuizCard quiz={quiz} />
                    </GridItem>
                ))}
            </Grid>
        </Box>
    );
}

export default Home;

