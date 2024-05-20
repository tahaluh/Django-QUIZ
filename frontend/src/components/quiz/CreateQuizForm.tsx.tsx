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
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

interface Question {
    question: string;
    options: string[];
    correctOption: number;
}

export default function CreateQuizForm() {
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
        handleJumpToStep(index+1);
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
        console.log('Game Title:', gameTitle);
        console.log('Game Description:', gameDescription);
        console.log('Game Image:', gameImage);
        console.log('Questions:', questions);
    };

    return (
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
                                                handleRemoveQuestion(index-1);
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
                            onClick={handleQuizCreation}
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
                            </FormControl>
                            <FormControl id="gameDescription">
                                <FormLabel>Game Description</FormLabel>
                                <Input
                                    type="text"
                                    value={gameDescription}
                                    onChange={(e) => setGameDescription(e.target.value)}
                                />
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
                            <Grid templateColumns="repeat(2, 1fr)" gap={2} mt={4}>
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

                                        <Button mt={4} colorScheme="green" onClick={handleQuizCreation} flexGrow={1}>
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
    );
}
