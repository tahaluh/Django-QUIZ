import { Box, Text, Image, Button, Menu, MenuButton, MenuList, MenuItem, IconButton, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Routes from '../../routes/Routes';
import { FaEllipsisV } from 'react-icons/fa';
import { Quiz } from './services/types';
import { CloseIcon, EditIcon } from '@chakra-ui/icons';
import { deleteQuiz } from './services/deleteQuiz';
import { useSnackbar } from 'notistack'

interface QuizCardProps {
    own?: boolean;
    quiz: Quiz;
    refetch?: () => void;
}

function QuizCard({ quiz, own = false, refetch }: QuizCardProps) {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
    const { isOpen: isToggleModalOpen, onOpen: onToggleModalOpen, onClose: onToggleModalClose } = useDisclosure();

    const handleTogglePublished = () => {
        onToggleModalOpen();
    };

    const handleDelete = () => {
        onDeleteModalOpen();
    };

    const handleConfirmDelete = async () => {
        const res = await deleteQuiz(quiz.uuid);
        if (res) {
            enqueueSnackbar('Quiz deleted successfully', { variant: 'success' });
            refetch && refetch();
        } else {
            enqueueSnackbar('Failed to delete quiz', { variant: 'error' });
        }

        onDeleteModalClose();
    };

    const handleConfirmToggle = () => {
        console.log('Toggle confirmed');
        // Implement logic to toggle publish state
        onToggleModalClose();
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" position="relative">
            <Image src={quiz.image || `https://via.placeholder.com/150/FF0000/FFFFFF?text=${quiz.title}`} alt={quiz.title} w="100%" />
            {own && (
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label="Options"
                        icon={<FaEllipsisV />}
                        position="absolute"
                        top="0"
                        right="0"
                        mt={2}
                        mr={2}
                    />
                    <MenuList>
                        <MenuItem icon={<EditIcon />} onClick={handleTogglePublished}>
                            {quiz.published ? 'Unpublish' : 'Publish'}
                        </MenuItem>
                        <MenuItem icon={<EditIcon />} onClick={() => { navigate(Routes.quiz.edit(quiz.uuid)); }}>Edit</MenuItem>
                        <MenuItem icon={<CloseIcon />} onClick={handleDelete}>Delete</MenuItem>
                    </MenuList>
                </Menu>
            )}
            <Box p={4} width={"200px"}>
                <Text fontSize="12" color="gray.500">{quiz.author}</Text>
                <Text fontWeight="bold" mb={1}>{quiz.title}</Text>
                <Text fontSize="sm" mb={2}>{quiz.description}</Text>
                <Button mt={4} colorScheme="green" minWidth={"100%"} onClick={() => { navigate(Routes.quiz.play(quiz.uuid)); }}>Play</Button>
            </Box>
            <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Confirm Delete</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete this quiz?
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="ghost" mr={3} onClick={onDeleteModalClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="red" onClick={handleConfirmDelete}>
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal isOpen={isToggleModalOpen} onClose={onToggleModalClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{quiz.published ? 'Unpublish' : 'Publish'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {`Are you sure you want to ${quiz.published ? 'unpublish' : 'publish'} this quiz?`}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" mr={3} onClick={onToggleModalClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="green" onClick={handleConfirmToggle}>
                            Confirm
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default QuizCard;
