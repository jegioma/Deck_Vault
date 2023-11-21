import {
    Modal, ModalOverlay, ModalContent, Heading, ModalBody,
    HStack, Input, FormLabel, ModalCloseButton, IconButton
} from '@chakra-ui/react'; 
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { createCollection, refreshCollection } from '@/pages/api/cardData/collectionAPI';
import { useState } from 'react';

export default function NewCardModal({ isOpen, onClose, user, supabase, setCollections }) {
    const [ collectionName, setCollectionName ] = useState('');
    
    return (
        <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered >
            <ModalOverlay backdropFilter='blur(10px) hue-rotate(90deg)'  />
            <ModalContent padding='1rem' bg='#474b4f'>
                <Heading color='#fffeee' fontSize='xl' textAlign='center'>Create New Collection</Heading>
                <ModalCloseButton color='#fffeee' size='lg' />
                <ModalBody bg='#474b4f'>
                    <HStack padding='2rem'>
                        <FormLabel color='#fffeee'>Name:</FormLabel>
                        <Input bg='#fffeee' type='text' placeholder='Collection Name'  onChange={(event) => setCollectionName(event.target.value)} />
                        <IconButton
                            icon={<ArrowForwardIcon />}
                            bg='#86c232'
                            _hover={{backgroundColor: '#61892f', color: '#fffeee'}}
                            onClick={() => createCollection(collectionName, user, () => {
                                onClose();
                                refreshCollection(user, supabase)
                                    .then((updatedCollections) => {
                                        setCollections(updatedCollections); // update the collections state
                                    }).catch((error) => {
                                        console.log(error);
                                    })
                            })}
                        />
                    </HStack>
                </ModalBody>
            </ModalContent>

        </Modal>
    )
}