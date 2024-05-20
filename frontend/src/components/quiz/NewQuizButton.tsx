import {
    Button, ButtonProps
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import Routes from '../../routes/Routes';


interface NewQuizButtonProps extends ButtonProps {

}

export default function NewQuizButton({ ...props }: NewQuizButtonProps) {
    const navigate = useNavigate();

    return (
        <Button
            display={{ base: 'none', md: 'inline-flex' }}
            variant={'solid'}
            colorScheme={'green'}
            size={'sm'}
            mr={4}
            leftIcon={<AddIcon />}
            onClick={() => navigate(Routes.quiz.create)}
            {...props}
        >
            New Quiz
        </Button>
    );
}
