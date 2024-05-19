import { Menu, MenuButton, MenuList, MenuItem, Avatar, Center, Button, MenuDivider } from '@chakra-ui/react';
import { BiLogOut } from 'react-icons/bi';
import { useAuth } from '../../auth/AuthProvider';

const UserMenu = () => {
    const { logout } = useAuth();
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
                <MenuItem icon={<BiLogOut />} onClick={logout}>Logout</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default UserMenu;
