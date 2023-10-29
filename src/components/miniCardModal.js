import {
    Modal, ModalOverlay, ModalContent, Heading, Image, HStack, VStack, Button,
    NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper
} from '@chakra-ui/react'; 
import { addCardToCollection, updateCopyAmount } from '@/pages/api/cardData/collectionAPI';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';

export default function MiniCardModal({ card, isOpen, onClose, collection }) {
    const supabase = useSupabaseClient();
    const [copyCount, setCopyCount] = useState(1); // Initialize to 1

    const handleCopyCountChange = (value) => {
        setCopyCount(value);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='md' isCentered>
            <ModalOverlay backdropFilter='blur(10px) hue-rotate(90deg)' />
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
                                addCardToCollection( supabase, card, collection)
                                updateCopyAmount( supabase, collection, copyCount)
                                onClose()
                            }}
                        >Add Card</Button>
                    </HStack>
                </VStack>
            </ModalContent>
        </Modal>
    )
}