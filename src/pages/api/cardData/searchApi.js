import CollectionStepper from '@/components/collectionStepper';
import {
    ModalBody, Image, Text, HStack, VStack, 
    Box, Stack, Container, Divider, Accordion, 
    AccordionButton, AccordionItem, AccordionIcon, AccordionPanel
} from '@chakra-ui/react'; 

 export default function ModalBodyType({ card }) {

    switch (card.frameType) {
        case "xyz":
            return (
                <ModalBody bg='#222629'>
                    <Stack display='inline' margin={0} padding={0}>
                        <Image
                            src={card.card_images[0].image_url}
                            alt={card.name}
                            float='left'
                            height='25rem'
                            padding={5}
                        />
                        <VStack padding={0} margin={0}>
                                <Text fontSize='lg' fontWeight='bold' color='#fffeee' alignSelf='flex-end'>ATK: {card.atk} | DEF: {card.def}</Text>
                                <HStack padding={0} margin={0} alignSelf='flex-end'>
                                    <Image bg='#222629' src='/attributes/rank.png' width={25} height={25}/>
                                    <Text fontSize='lg' fontWeight='bold' color='#fffeee'>{card.level} | {card.race} | {card.type}</Text>
                                </HStack>
                            <Container>
                                <Text fontSize='lg' color='#fffeee'>Card Description</Text>
                                <Divider />
                                <Text fontSize='md' color='#fffeee'>{card.desc}</Text>
                            </Container>
                            <CollectionStepper card={card}/>
                        </VStack>
                    </Stack>
                </ModalBody>
            )
        case "link":
            return (
                <ModalBody bg='#222629'>
                    <Stack display='inline' margin={0} padding={0}>
                        <Image
                            src={card.card_images[0].image_url}
                            alt={card.name}
                            float='left'
                            height='25rem'
                            padding={5}
                        />
                        <VStack padding={0} margin={0}>
                                <Text fontSize='lg' fontWeight='bold' color='#fffeee' alignSelf='flex-end'>ATK: {card.atk}</Text>
                                <Text fontSize='lg' fontWeight='bold' color='#fffeee' alignSelf='flex-end'>LINK -  {card.linkval} | {card.race} | {card.type}</Text>
                            <Container>
                                <Text fontSize='lg' color='#fffeee'>Card Description</Text>
                                <Divider />
                                <Text fontSize='md' color='#fffeee'>{card.desc}</Text>
                            </Container>
                            <CollectionStepper card={card} />
                        </VStack>
                    </Stack>
                </ModalBody>
            )
        case "normal":
        case "effect":
        case "ritual":
        case "fusion":
        case "synchro":
            return (
                <ModalBody bg='#222629'>
                    <Stack display='inline' margin={0} padding={0}>
                        <Image
                            src={card.card_images[0].image_url}
                            alt={card.name}
                            float='left'
                            height='25rem'
                            padding={5}
                        />
                        <VStack padding={0} margin={0}>
                                <Text fontSize='lg' fontWeight='bold' color='#fffeee' alignSelf='flex-end'>ATK: {card.atk} | DEF: {card.def}</Text>
                                <HStack padding={0} margin={0} alignSelf='flex-end'>
                                    <Image bg='#222629' src='/attributes/level.png' width={25} height={25}/>
                                    <Text fontSize='lg' fontWeight='bold' color='#fffeee'>{card.level} | {card.race} | {card.type}</Text>
                                </HStack>
                            <Container>
                                <Text fontSize='lg' color='#fffeee'>Card Description</Text>
                                <Divider />
                                <Text fontSize='md' color='#fffeee'>{card.desc}</Text>
                            </Container>
                            <CollectionStepper card={card} />
                        </VStack>
                    </Stack>
                </ModalBody>
            )
        case "normal_pendulum":
        case "effect_pendulum":
        case "ritual_pendulum":
        case "fusion_pendulum":
        case "synchro_pendulum":
            return (
                <ModalBody bg='#222629'>
                    <Stack display='inline' margin={0} padding={0}>
                        <Image
                            src={card.card_images[0].image_url}
                            alt='card.name'
                            float='left'
                            height='25rem'
                            padding={5}
                        />
                        <VStack padding={0} margin={0}>
                        <Text fontSize='lg' fontWeight='bold' color='#fffeee' alignSelf='flex-end'>ATK: {card.atk} | DEF: {card.def}</Text>
                            <HStack padding={0} margin={0} alignSelf='flex-end'>
                                <Image bg='#222629' src='/attributes/level.png' width={25} height={25}/>
                                <Text fontSize='lg' fontWeight='bold' color='#fffeee'>{card.level} | SCALE - {card.scale} | {card.race} | {card.type}</Text>
                            </HStack>
                            <Container alignSelf='flex-end'>
                                <Accordion defaultIndex={[0]} allowMultiple>
                                    <AccordionItem>
                                        <Text color='#fffeee' fontSize='xl'>
                                            <AccordionButton >
                                                <Box as='span' textAlign='left' flex='1'>Pendulum Description</Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </Text>
                                        <AccordionPanel color='#fffeee' pb={4}>{card.pend_desc}</AccordionPanel>

                                        <AccordionItem>
                                        <Text color='#fffeee' fontSize='xl'>
                                            <AccordionButton >
                                                <Box as='span' textAlign='left' flex='1'>Monster Description</Box>
                                                <AccordionIcon />
                                            </AccordionButton>
                                        </Text>
                                        <AccordionPanel color='#fffeee' pb={4}>{card.monster_desc}</AccordionPanel>
                                    </AccordionItem>
                                    </AccordionItem>
                                </Accordion>
                            </Container>
                            <CollectionStepper card={card} />
                        </VStack>
                    </Stack>
                </ModalBody>
            )
            case "xyz_pendulum":
                return (
                    <ModalBody bg='#222629'>
                        <Stack display='inline' margin={0} padding={0}>
                            <Image
                                src={card.card_images[0].image_url}
                                alt='card.name'
                                float='left'
                                height='25rem'
                                padding={5}
                            />
                            <VStack padding={0} margin={0}>
                            <Text fontSize='lg' fontWeight='bold' color='#fffeee' alignSelf='flex-end'>ATK: {card.atk} | DEF: {card.def}</Text>
                                <HStack padding={0} margin={0} alignSelf='flex-end'>
                                    <Image bg='#222629' src='/attributes/rank.png' width={25} height={25}/>
                                    <Text fontSize='lg' fontWeight='bold' color='#fffeee'>{card.level} | SCALE - {card.scale} | {card.race} | {card.type}</Text>
                                </HStack>
                                <Container alignSelf='flex-end'>
                                    <Accordion defaultIndex={[0]} allowMultiple>
                                        <AccordionItem>
                                            <Text color='#fffeee' fontSize='xl'>
                                                <AccordionButton >
                                                    <Box as='span' textAlign='left' flex='1'>Pendulum Description</Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </Text>
                                            <AccordionPanel color='#fffeee' pb={4}>{card.pend_desc}</AccordionPanel>
    
                                            <AccordionItem>
                                            <Text color='#fffeee' fontSize='xl'>
                                                <AccordionButton >
                                                    <Box as='span' textAlign='left' flex='1'>Monster Description</Box>
                                                    <AccordionIcon />
                                                </AccordionButton>
                                            </Text>
                                            <AccordionPanel color='#fffeee' pb={4}>{card.monster_desc}</AccordionPanel>
                                        </AccordionItem>
                                        </AccordionItem>
                                    </Accordion>
                                </Container>
                                <CollectionStepper card={card} />
                            </VStack>
                        </Stack>
                    </ModalBody>
                )
        case "spell":
        case "trap":
            return (
                <ModalBody bg='#222629'>
                    <Stack display='inline' margin={0} padding={0}>
                        <Image
                            src={card.card_images[0].image_url}
                            alt='card.name'
                            float='left'
                            height='25rem'
                            padding={5}
                        />
                        <VStack padding={0} margin={0}>
                            <Text fontSize='2xl' fontWeight='bold' color='#fffeee' alignSelf='flex-end'>{card.race} {card.type}</Text>

                            <Container>
                                <Text fontSize='xl' color='#fffeee'>Card Description</Text>
                                <Divider />
                                <Text fontSize='lg' color='#fffeee'>{card.desc}</Text>
                            </Container>
                            <CollectionStepper card={card} />
                        </VStack>
                    </Stack>
                </ModalBody>
            )
    }
}

