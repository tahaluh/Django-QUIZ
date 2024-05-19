import React, { ReactNode } from 'react';
import { Flex } from '@chakra-ui/react';
import Header from './Header.tsx';
import Footer from './Footer';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Flex direction="column" minHeight="100vh">
            <Header />
            <Flex flex="1">{children}</Flex>
            <Footer />
        </Flex>
    );
};

export default Layout;
