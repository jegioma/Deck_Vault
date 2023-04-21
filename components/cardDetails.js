import {
    Modal, ModalOverlay, ModalContent, Heading, ModalBody, Image, Button, Text,
    VStack, Box, Stack
} from '@chakra-ui/react'; 
import styles from '../styles/cardDetails.module.css';

export default function CardDetails({ card, isOpen, onClose }) {

const getModalBody = () => {
    switch (card.frameType) {
        case "normal":
        case "effect":
        case "ritual":
        case "fusion":
        case "synchro":
        case "xyz":
        case "link":
        case "normal_pendulum":
        case "effect_pendulum":
        case "ritual_pendulum":
        case "fusion_pendulum":
        case "synchro_pendulum":
        case "xyz_pendulum":
            return (
                <ModalBody className={styles.modal_body} padding='1em' >
                    <Stack display='inline-block' margin={0} padding={0}>
                        <Image
                            src={card.card_images[0].image_url}
                            alt={card.name}
                            float='left'
                            height='25em'
                            paddingTop='1em'
                            paddingLeft='1em'
                        >
                        </Image>
                        <VStack padding='0' margin={0}>
                            <Box className={styles.desc_ctn} float='right'>
                                <Heading fontSize='2xl' className={styles.headers}>Card Text</Heading>
                                <hr className={styles.line}/>
                                <Text fontSize='xl' className={styles.text}>
                                    {card.desc}
                                </Text> 
                            </Box>
                            {/* <Text fontSize='xl' className={styles.stats}>ATK: {card.atk} | DEF: {card.def}</Text>  */}
                        </VStack> 
                    </Stack>
                    <Button size='lg' bg='#800000' className={styles.modal_btn} onClick={onClose}>Close</Button>
                </ModalBody>
            );
        case "spell":
        case "trap":
            return (
                <ModalBody className={styles.modal_body} padding='1em' >
                    <Stack display='inline-block' margin={0} padding={0}>
                        <Image
                            src={card.card_images[0].image_url}
                            alt={card.name}
                            float='left'
                            height='25em'
                            paddingTop='1em'
                            paddingLeft='1em'
                        >
                        </Image>
                        <VStack padding='0' margin={0}>
                            <Box className={styles.desc_ctn} float='right'>
                                <Heading fontSize='2xl' className={styles.headers}>Card Text</Heading>
                                <hr className={styles.line}/>
                                <Text fontSize='xl' className={styles.text}>
                                    {card.desc}
                                </Text> 
                            </Box>
                            {/* <Text fontSize='xl' className={styles.stats}>ATK: {card.atk} | DEF: {card.def}</Text>  */}
                        </VStack> 
                    </Stack>
                    <Button size='lg' bg='#800000' className={styles.modal_btn} onClick={onClose}>Close</Button>
                </ModalBody>
            );
        default:
            return null;
    }
};

return (
    <>
        <Modal isOpen={isOpen} onClose={onClose} size='4xl' isCentered className={styles.modal}>
        <ModalOverlay backdropFilter='blur(10px) hue-rotate(90deg)' bg='blackAlpha.300'/>
            <ModalContent className={styles.modal_content} width='80%'>
                <Heading size='xl' bg='#800000' className={styles.heading}>{card.name}</Heading>
                {
                    getModalBody()
                }
            </ModalContent>
        </Modal>
    </>
);
}