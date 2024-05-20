import { useState } from 'react';
import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Card,
    Grid,
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Text,
} from '@chakra-ui/react';
import { useSnackbar } from 'notistack'
import { CloseIcon } from '@chakra-ui/icons';
import { CreateQuiz } from './services/createQuiz';
import { useNavigate } from 'react-router-dom';
import Routes from '../../routes/Routes';

interface Question {
    question: string;
    options: string[];
    correctOption: number;
}

export default function CreateQuizForm() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [step, setStep] = useState<number>(1);
    const [questionIndex, setQuestionIndex] = useState<number>(0);
    const [gameTitle, setGameTitle] = useState<string>('');
    const [gameDescription, setGameDescription] = useState<string>('');
    const [gameImage, setGameImage] = useState<string>('');
    const [questions, setQuestions] = useState<Question[]>([{ question: '', options: ['', '', '', ''], correctOption: 0 }]);

    const handleNextStep = () => {
        setStep((prevStep) => {
            setQuestionIndex(prevStep - 1);
            return prevStep + 1
        });
    };

    const handlePreviousStep = () => {
        setStep((prevStep) => {
            setQuestionIndex(prevStep - 3 >= 0 ? prevStep - 3 : 0);
            return prevStep - 1
        })
    };

    const handleJumpToStep = (targetStep: number) => {
        setStep(targetStep);
        setQuestionIndex(targetStep - 2);
    };

    const handleAddQuestion = () => {
        const updatedQuestions = [...questions];
        updatedQuestions.push({ question: '', options: ['', '', '', ''], correctOption: 0 });
        setQuestions(updatedQuestions);
        handleJumpToStep(questions.length + 2);
    }

    const handleRemoveQuestion = (index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions.splice(index, 1);
        setQuestions(updatedQuestions);
        handleJumpToStep(index + 1);
    }

    const handleQuestionChange = (value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].question = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (optionIndex: number, value: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    const handleCorrectOptionChange = (optionIndex: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].correctOption = optionIndex;
        setQuestions(updatedQuestions);
    };

    const handleQuizCreation = async () => {
        const titleError = !gameTitle.trim() ? 'Please provide a valid game title.' : '';
        const descriptionError = !gameDescription.trim() ? 'Please provide a valid game description.' : '';
        const titleErrorObj = titleError ? { gameTitle: titleError } : { gameTitle: '' };
        const descriptionErrorObj = descriptionError ? { gameDescription: descriptionError } : { gameDescription: '' };

        const questionErrors = questions.map(
            (question) => !question.question.trim() || question.options.filter((option) => option.trim()).length < 2
                ? 'Each question must have a valid question text and at least 2 options.'
                : ''
        );

        const questionErrorsObj = questionErrors.reduce((acc, error, index) => {
            if (error) {
                acc[`question${index}`] = error;
            }
            return acc;
        }, {} as { [key: string]: string });

        setValidationErrors({ ...titleErrorObj, ...descriptionErrorObj, ...questionErrorsObj });

        const invalidQuestionIndex = questionErrors.findIndex((error) => error !== '');
        if (invalidQuestionIndex !== -1 || titleError || descriptionError) {

            if (titleError || descriptionError) handleJumpToStep(1);
            else
                handleJumpToStep(invalidQuestionIndex + 2); // Jump to the invalid question
            return;
        }

        const res = await CreateQuiz({
            title: gameTitle,
            description: gameDescription,
            questions: questions.map((question) => ({
                question: question.question,
                options: question.options.map((option, optionIndex) => ({ option, correct_option: question.correctOption === optionIndex })),
            })),
        });

        if (res.error) {
            enqueueSnackbar(res.error, { variant: 'error' });
            console.error(res.error);
            return;
        } else {
            enqueueSnackbar('Quiz created successfully', { variant: 'success' });
            navigate(Routes.quiz.myQuizzes)
        }
    };

    // Validation errors
    const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});


    // modal 
    const { isOpen: isSaveModalOpen, onOpen: onSaveModalOpen, onClose: onSaveModalClose } = useDisclosure();


    return (
        <>
            <Flex align={'center'} justify={'center'} >
                <Stack spacing={8} mx={'auto'} py={12} px={6}>
                    <Heading fontSize={'4xl'}>Create a Quiz</Heading>
                    <Card w={'60vw'} minW={'60vw'} p={5} rounded={'lg'} boxShadow={'lg'}>
                        <Stack direction="row" justify="center" mb={4} maxW={"100%"} wrap={'wrap'}>
                            {[...Array(questions.length + 1)].map((_, index) => (
                                <Button
                                    key={index}
                                    colorScheme="blue"
                                    variant={step === index + 1 ? 'solid' : 'outline'}
                                    onClick={() => handleJumpToStep(index + 1)}
                                    px={2}
                                >
                                    {index === 0 ? 'Game Info' : `Question ${index}`}
                                    {
                                        index > 0 && questions.length > 1 && (
                                            <IconButton
                                                ml={1}
                                                variant={'ghost'}
                                                h={'30px'}
                                                color={'red'}
                                                icon={<CloseIcon />}
                                                aria-label='Remove'
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    handleRemoveQuestion(index - 1);
                                                }}
                                            />
                                        )
                                    }

                                </Button>
                            ))}
                            <Button colorScheme="blue" variant={'solid'} onClick={handleAddQuestion}>
                                Add Question
                            </Button>
                            <Button
                                colorScheme="green"
                                variant={'solid'}
                                onClick={onSaveModalOpen}
                            >
                                Save Quiz
                            </Button>
                        </Stack>
                        {step === 1 && (
                            <>
                                <FormControl id="gameTitle">
                                    <FormLabel>Game Title</FormLabel>
                                    <Input
                                        type="text"
                                        value={gameTitle}
                                        onChange={(e) => setGameTitle(e.target.value)}
                                    />
                                    <Text color="red" mt={1}>{validationErrors['gameTitle']}</Text>
                                </FormControl>
                                <FormControl id="gameDescription">
                                    <FormLabel>Game Description</FormLabel>
                                    <Input
                                        type="text"
                                        value={gameDescription}
                                        onChange={(e) => setGameDescription(e.target.value)}
                                    />
                                    <Text color="red" mt={1}>{validationErrors['gameDescription']}</Text>
                                </FormControl>
                                <FormControl id="gameImage">
                                    <FormLabel>Game Image URL</FormLabel>
                                    <Input
                                        type="text"
                                        value={gameImage}
                                        onChange={(e) => setGameImage(e.target.value)}
                                    />
                                </FormControl>
                                <Button mt={4} colorScheme="blue" onClick={handleNextStep}>
                                    Next Step
                                </Button>
                            </>
                        )}

                        {step >= 2 && (
                            <>
                                <FormControl id={`question${questionIndex}`}>
                                    <Flex>
                                        <FormLabel>{`Question ${questionIndex + 1}`}</FormLabel>
                                        <Text color="red" ml={1}>{validationErrors[`question${questionIndex}`]}</Text>
                                    </Flex>
                                    <Input
                                        type="text"
                                        placeholder={`Question ${questionIndex + 1} text...`}
                                        required
                                        isRequired
                                        value={questions[questionIndex].question}
                                        onChange={(e) => handleQuestionChange(e.target.value)}
                                    />
                                </FormControl>
                                <Grid templateColumns="repeat(2, 1fr)" gap={2} mt={4} mb={5}>
                                    {questions[questionIndex].options.map((option, optionIndex) => (
                                        <Flex key={optionIndex}>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    value={option}
                                                    required={optionIndex < 2}
                                                    placeholder={`Option ${optionIndex + 1} ${optionIndex > 1 ? '(Optional)' : ''}`}
                                                    onChange={(e) => handleOptionChange(optionIndex, e.target.value)}
                                                />
                                            </FormControl>
                                            <input
                                                type="radio"
                                                name={`correctOption${questionIndex}`}
                                                value={optionIndex}
                                                checked={questions[questionIndex].correctOption === optionIndex}
                                                onChange={() => handleCorrectOptionChange(optionIndex)}
                                            />
                                        </Flex>
                                    ))}
                                </Grid>


                                {
                                    questionIndex === questions.length - 1 ? (
                                        <>
                                            <Stack direction={'row'}>
                                                <Button mt={4} colorScheme="red" onClick={handlePreviousStep} flexGrow={1}>
                                                    Previous Question
                                                </Button>
                                                <Button mt={4} colorScheme="blue" onClick={handleAddQuestion} flexGrow={1}>
                                                    Add Question
                                                </Button>
                                            </Stack>

                                            <Button mt={4} colorScheme="green" onClick={onSaveModalOpen} flexGrow={1}>
                                                Save Quiz
                                            </Button>
                                        </>) :
                                        <Stack direction={'row'}>
                                            {step > 0 && (
                                                <Button mt={4} colorScheme="red" onClick={handlePreviousStep} flexGrow={1}>
                                                    Previous Question
                                                </Button>
                                            )}
                                            <Button mt={4} colorScheme="blue" onClick={handleNextStep} flexGrow={1}>
                                                Next Question
                                            </Button>

                                        </Stack>
                                }


                            </>
                        )}
                    </Card>
                </Stack>



            </Flex>
            <Modal isOpen={isSaveModalOpen} onClose={onSaveModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Save</ModalHeader>
                    <ModalBody>Are you sure you want to save the quiz?</ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onSaveModalClose}>Cancel</Button>
                        <Button colorScheme="green" onClick={() => {
                            onSaveModalClose();
                            handleQuizCreation();
                        }}>
                            Save
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal></>
    );
}
