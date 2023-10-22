import ModalBodyType from '@/pages/api/cardData/searchApi';
import {
    Modal, ModalOverlay, ModalContent, Heading, Image, 
    HStack
} from '@chakra-ui/react'; 

export default function CardDetails({ card, isOpen, onClose }) {

    
    const cardAttribute = (card) => {
        if (card.attribute != null) {
            switch (card.attribute) {
                case "WIND": return '/attributes/WIND.png';
                case "WATER": return '/attributes/WATER.png';
                case "EARTH": return '/attributes/EARTH.png';
                case "FIRE": return '/attributes/FIRE.png';
                case "LIGHT": return '/attributes/LIGHT.png';
                case "DARK": return '/attributes/DARK.png';
                case "DIVINE": return '/attributes/DIVINE.png';
                default: return '';
            }
        }
        if (card.attribute == null) {
            switch (card.frameType) {
                case "spell": return '/attributes/SPELL.png';
                case "trap": return '/attributes/TRAP.png';
                default: return '';
            }
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='5xl' isCentered>
            <ModalOverlay backdropFilter='blur(10px) hue-rotate(90deg)'  />
            <ModalContent>
                <HStack bg='#61892f' padding={5}>
                    <Heading width='100%' size='xl' bg='#61892f' color='#fffeee' align='center'>{card.name}</Heading>
                    <Image bg='#61892f' src={cardAttribute(card)} width={50} height={50}/>
                </HStack>
                {
                    <ModalBodyType card={card} />
                }
            </ModalContent>
        </Modal>
    )
}