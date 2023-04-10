import { 
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Image, ModalFooter, Button, Text
} from '@chakra-ui/react'; 
import styles from '../styles/cardDetails.module.css';

export default function CardDetails({ card, isOpen, onClose }) {

	return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backdropFilter='blur(10px) hue-rotate(90deg)' bg='blackAlpha.300'/>
                <ModalContent>
                    <ModalHeader>{card.name}</ModalHeader>
                        <ModalBody>
                            <Image
                                src={card.card_images[0].image_url}
                                alt={card.name}
                            >
                            </Image>
                            <Text>
                                {card.desc}
                            </Text>
                        </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}