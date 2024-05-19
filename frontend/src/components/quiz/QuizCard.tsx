import { Box, Text, Image, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Routes from '../../routes/Routes';

interface QuizCardProps {
    quiz: {
        uuid: string;
        title: string;
        description: string;
        author?: string;
        image: string;
    };
}

function QuizCard({ quiz }: QuizCardProps) {
    const navigate = useNavigate();
    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={quiz.image} alt={quiz.title} w="100%" />
            <Box p={4} width={"200px"}>
                <Text fontSize="12" color="gray.500" >{quiz.author}</Text>
                <Text fontWeight="bold" mb={1}>{quiz.title}</Text>
                <Text fontSize="sm" mb={2}>{quiz.description}</Text>
                <Button mt={4} colorScheme="green" minWidth={"100%"} onClick={() => { navigate(Routes.quiz.play(quiz.uuid)); }}>Play</Button>
            </Box>
        </Box >
    );
}

export default QuizCard;
