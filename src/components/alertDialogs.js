import {
    AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, AlertDialogCloseButton, useDisclosure, Button
} from '@chakra-ui/react';
import { deleteCollection } from '@/pages/api/cardData/collectionAPI';
import { useRef } from 'react';
import { useRouter } from 'next/router';

export default function AlertDialogDeleteCollection({ id, user, supabase, isOpen, onClose }) {
    const cancelRef = useRef();
    const router = useRouter();

    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader>Delete Collection</AlertDialogHeader>
                    <AlertDialogBody>You are attempting to delete this collection. Do you wish to continue?</AlertDialogBody>
                    <AlertDialogFooter gap={5}>
                        <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
                        <Button 
                            colorScheme='red'
                            onClick={() => {
                                deleteCollection(id, user, supabase);
                                router.push('/vault');
                            }}
                        >Delete</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}
