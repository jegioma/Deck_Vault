import {
    Modal, ModalOverlay, ModalContent, Image, HStack, VStack, Button,
    NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useToast
} from '@chakra-ui/react'; 
import { addCardToCollection } from '@/pages/api/cardData/collectionAPI';
import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function MiniCardModal({ card, isOpen, onClose, collection }) {
    const [ copyCount, setCopyCount ] = useState(1); // Initialize to 1
    const toast = useToast();
    const supabase = useSupabaseClient();
    const handleCopyCountChange = (value) => {
        setCopyCount(value);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='md' isCentered>
            <ModalOverlay backdropFilter='blur(10px) hue-rotate(90deg)'/>
            <ModalContent background='transparent'>
                <VStack>
                    <Image alt={card.cardName} src={card.card_images[0].image_url} height={600} width={500}/>
                    <HStack>
                        <NumberInput size='lg' value={copyCount} maxW={24} min={1} bg='#d9d9d9' onChange={handleCopyCountChange}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper bg='#86c232'/>
                                <NumberDecrementStepper bg='#86c232'/>
                            </NumberInputStepper>
                        </NumberInput>
                        <Button
                            size='lg' 
                            bg='#86c232'                                    
                            _hover={{backgroundColor: '#61892f', color: '#fffeee', transition: 'all 0.3s ease 0s'}}
                            onClick={() => {
                                addCardToCollection(card, collection, copyCount, supabase)
                                onClose()
                                toast({
                                    title: 'Card added to collection',
                                    status: 'success',
                                    position: 'top-right',
                                    duration: 2000,
                                })
                            }}
                        >Add Card</Button>
                    </HStack>
                </VStack>
            </ModalContent>
        </Modal>
    )
}