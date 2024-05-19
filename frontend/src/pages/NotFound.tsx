// src/NotFound.js
import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="gray.50"
    >
      <Heading as="h1" size="2xl" mb={4}>
        404 - Page Not Found
      </Heading>
      <Text fontSize="lg" color="gray.600" mb={4}>
        Oops! The page you are looking for does not exist.
      </Text>
      <Button as={RouterLink} to="/" colorScheme="teal" size="lg">
        Go Back to Home
      </Button>
    </Box>
  );
}

export default NotFoundPage;
