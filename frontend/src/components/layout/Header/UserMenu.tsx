import { Menu, MenuButton, MenuList, MenuItem, Avatar, Center, Button, MenuDivider } from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';
import { useAuth } from '../../auth/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Routes from '../../../routes/Routes';
import { AddIcon } from '@chakra-ui/icons';

const UserMenu = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <Menu>
            <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
                color="red"
            >
                <Avatar
                    size={'sm'}
                />
            </MenuButton>
            <MenuList color={'black'}>
                <Center>
                    <MenuItem>Profile</MenuItem>
                </Center>
                <MenuDivider />
                <MenuItem
                    onClick={() => navigate(Routes.quiz.myQuizzes)}
                >
                    My Quizzes
                </MenuItem>
                <MenuItem
                    display={
                        {
                            base: 'inline-flex',
                            md: 'none'
                        }}
                    icon={<AddIcon />}
                    onClick={() => navigate(Routes.quiz.create)}
                >
                    New Quiz
                </MenuItem>
                <MenuDivider />
                <MenuItem icon={<BiLogOut />} onClick={logout}>Logout</MenuItem>
            </MenuList>
        </Menu >
    );
};

export default UserMenu;
