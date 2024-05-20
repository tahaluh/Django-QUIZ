import { useEffect, useState } from 'react';
import {
    Flex,
    Heading,
    Card,
    Button,
    Stack,
    FormControl,
    Radio,
    Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import Routes from '../../routes/Routes';
import { getQuiz } from './services/getQuiz';
import { Option, Question } from './services/types';
import { useSnackbar } from 'notistack';
import { validateQuestionAnswer } from './services/validateQuestionAnswer';

export default function AnswerQuiz() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { quizUuid } = useParams();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [correctOption, setCorrectOption] = useState<string>('');
    const [quizData, setQuizData] = useState<Question[]>([]);
    const [feedback, setFeedback] = useState<string>('');
    const [quizTitle, setQuizTitle] = useState<string>('');
    const [validated, setValidated] = useState<boolean>(false);
    const [showResults, setShowResults] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        const fetchQuiz = async () => {
            if (quizUuid) {
                const res = await getQuiz(quizUuid);
                if (res.error) {
                    enqueueSnackbar(res.error, { variant: 'error' });
                    console.error(res.error);
                    navigate(Routes.quiz.myQuizzes);
                    return;
                }
                if (!res.data) return;
                const { title, questions } = res.data;
                setQuizData(questions || []);
                setQuizTitle(title || '');
            }
        };
        fetchQuiz();
    }, [quizUuid]);

    const validateAnswer = async () => {
        if (selectedOption !== null) {
            const currentQuestion = quizData[currentQuestionIndex];

            const res = await validateQuestionAnswer(currentQuestion.uuid, currentQuestion.options[selectedOption].uuid);

            if (res.error) {
                enqueueSnackbar(res.error, { variant: 'error' });
                console.error(res.error);
                return;
            }

            setCorrectOption(res.data?.correct_option_uuid || '');
            const isCorrect = res.data?.right_answer;
            setFeedback(isCorrect ? 'Correct!' : 'Incorrect!');
            setValidated(true);

            // Update the score if the answer is correct
            if (isCorrect) {
                setScore((prevScore) => prevScore + 1);
            }
        } else {
            setFeedback('Please select an option.');
        }
    };

    const handleNextQuestion = () => {
        setSelectedOption(null);
        setValidated(false);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setFeedback('');
    };

    const handleSeeResults = () => {
        setShowResults(true);
    };

    const handleFinishQuiz = () => {
        navigate(Routes.home);
    };

    const currentQuestion = quizData[currentQuestionIndex] || {};

    // Calculate the percentage score
    const percentageScore = (score / quizData.length) * 100;

    return (
        <Flex align="center" justify="center" minHeight="100vh">
            <Card maxW="md" p={8} boxShadow="lg" borderRadius="lg">
                <Heading mb={4}>{quizTitle}</Heading>
                {showResults ? (
                    <Stack spacing={4}>
                        <Heading fontSize={20} mb={4}>Quiz Results</Heading>
                        <Text mb={4}>You scored {score} out of {quizData.length} ({percentageScore.toFixed(2)}%)</Text>
                        <Button mt={4} colorScheme="blue" onClick={handleFinishQuiz}>
                            Go Back
                        </Button>
                    </Stack>
                ) : (
                    <>
                        <Heading mb={4} fontSize={16}>Question {currentQuestionIndex + 1}</Heading>
                        <Text mb={4}>{currentQuestion.question}</Text>
                        <Stack spacing={4}>
                            {currentQuestion.options?.map((option: Option, index: number) => (
                                <FormControl key={index}>
                                    <Radio
                                        id={`option-${index}`}
                                        value={option.option}
                                        isChecked={selectedOption === index}
                                        onChange={() => setSelectedOption(index)}
                                        isDisabled={validated}
                                    >
                                        <Text as="span" ml={2} fontSize={16} fontWeight={
                                            validated && option.uuid == correctOption ? 'bold' : 'normal'
                                        } color={
                                            validated ? (option.uuid == correctOption ? 'green' : 'red') : 'black'
                                        }>
                                            {option.option}
                                        </Text>
                                    </Radio>
                                </FormControl>
                            ))}
                        </Stack>
                        {!validated && (
                            <Button mt={4} colorScheme="blue" onClick={validateAnswer}>
                                Answer
                            </Button>
                        )}
                        {validated && (
                            <Button mt={4} colorScheme={feedback === 'Correct!' ? 'green' : 'red'} onClick={currentQuestionIndex === quizData.length - 1 ? handleSeeResults : handleNextQuestion}>
                                {currentQuestionIndex === quizData.length - 1 ? 'See Results' : 'Next Question'}
                            </Button>
                        )}
                        {feedback && <Text mt={4} color={feedback === 'Correct!' ? 'green' : 'red'}>{feedback}</Text>}
                    </>
                )}
            </Card>
        </Flex>
    );
}
