import React, { useState } from 'react';
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
} from '@chakra-ui/react';

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
    const [questions, setQuestions] = useState<Question[]>([{ question: '', options: ['', ''], correctOption: 0 }]);

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

    const handleAddQuestion = () => {
        const updatedQuestions = [...questions];
        updatedQuestions.push({ question: '', options: ['', ''], correctOption: 0 });
        setQuestions(updatedQuestions);

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

    const handleAddOption = () => {
        const updatedQuestions = [...questions];
        if (updatedQuestions[questionIndex].options.length < 4) {
            updatedQuestions[questionIndex].options.push('');
            setQuestions(updatedQuestions);
        }
    };

    const handleQuizCreation = async () => {
        console.log('Game Title:', gameTitle);
        console.log('Game Description:', gameDescription);
        console.log('Game Image:', gameImage);
        console.log('Questions:', questions);
    };

    return (
        <Flex align={'center'} justify={'center'}>
            <Stack spacing={8} mx={'auto'} py={12} px={6}>
                <Heading fontSize={'4xl'}>Create a Quiz</Heading>
                <Card minW={'60vw'} p={5} rounded={'lg'} boxShadow={'lg'}>
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
                                <FormLabel>{`Question ${questionIndex + 1}`}</FormLabel>
                                <Input
                                    type="text"
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
                                {questions[questionIndex].options.length < 4 && (
                                    <Button colorScheme="blue" onClick={handleAddOption}>
                                        Add Option
                                    </Button>
                                )}
                            </Grid>


                            {
                                questionIndex === questions.length - 1 ? (
                                    <>
                                        <Button mt={4} colorScheme="green" onClick={handleQuizCreation}>
                                            Save Quiz
                                        </Button>
                                        <Button mt={4} colorScheme="blue" onClick={handleAddQuestion}>
                                            Add More Questions
                                        </Button>

                                    </>) : <Button mt={4} colorScheme="blue" onClick={handleNextStep}>
                                    Next Question
                                </Button>
                            }

                            {step > 0 && (
                                <Button mt={4} colorScheme="red" onClick={handlePreviousStep}>
                                    Previous Question
                                </Button>
                            )}
                        </>
                    )}
                </Card>
            </Stack>
        </Flex>
    );
}
