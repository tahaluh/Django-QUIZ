import {
    Box,
    Flex,
    HStack,
    Button,
    Text,
} from '@chakra-ui/react';
import UserMenu from './UserMenu';
import { useNavigate } from 'react-router-dom';
import Routes from '../../../routes/Routes';
import NewQuizButton from '../../quiz/NewQuizButton';

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
                        <NewQuizButton display={
                            {
                                base: 'none',
                                md: 'inline-flex'
                            }
                        } />
                        <UserMenu>
                        </UserMenu>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
