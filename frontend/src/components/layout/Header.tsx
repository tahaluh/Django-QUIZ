import { Flex, Text } from '@chakra-ui/react';

const Header = () => {
    return (
        <Flex bg="blue.500" justify="center" align="center" h="60px">
            <Text color="white">Meu Cabeçalho</Text>
        </Flex>
    );
};

export default Header;
