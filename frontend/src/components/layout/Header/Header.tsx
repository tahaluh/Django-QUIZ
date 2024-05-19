import React from 'react';
import {
    Box,
    Flex,
    HStack,
    Button,
    Text,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import UserMenu from './UserMenu';
import { useNavigate } from 'react-router-dom';
import Routes from '../../../routes/Routes';

export default function Header() {
    const navigate = useNavigate();

    return (
        <>
            <Box bg={'blue.500'} color={'white'} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <HStack spacing={8} alignItems={'center'}>
                        <Button
                            variant={'link'}
                            color={'white'}
                            fontWeight={'bold'}
                            fontSize={'lg'}
                            onClick={() => navigate(Routes.home)}
                        >
                            Home
                        </Button>
                    </HStack>
                    <Text fontSize={'2xl'} fontWeight={'bold'}>Django Quiz</Text>
                    <Flex alignItems={'center'}>
                        <Button
                            variant={'solid'}
                            colorScheme={'green'}
                            size={'sm'}
                            mr={4}
                            leftIcon={<AddIcon />}
                            onClick={() => navigate(Routes.quiz.create)}
                        >
                            New Quiz
                        </Button>
                        <UserMenu />
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
