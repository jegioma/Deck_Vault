import {
    Box, Wrap, WrapItem, InputGroup, Input, InputLeftElement, 
    Image, Button, Center, Card, Alert, AlertIcon, Container,
    HStack, Text
} from '@chakra-ui/react'
import CardDetails from '@/components/cardDetailsModal';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect, memo } from 'react';

export default function Search() {
    const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
    const MemoizedImage = memo(Image);
    const MemoCard = memo(Card);
    const [ cardName, setCardName ] = useState('');
    const [ selectedCard, setSelectedCard ] = useState(null);
    const [ numResults, setNumResults ] = useState(12);
    const [ cardList, setCardList ] = useState([]);
    const [ cardInfo, setCardInfo ] = useState('');
    const [ hasNoResults, setHasNoResults ] = useState(false);

    useEffect(() => {
        try {
            fetch(`${url}?${cardInfo}`)
                .then(response => response.json())
                .then(data => {
                    setCardList(data.data.slice(0, (numResults)));
                    setHasNoResults(false);
                })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage, errorCode);
                setHasNoResults(true); 
            })
        } catch (error) {
            console.log(error);
        }
    }, [numResults, cardInfo]);

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            try {
                const searchTerm = cardName.trim().replace(/[\s]+/g, '%');
                const searchParams = new URLSearchParams();
                searchParams.append('fname', searchTerm);
                setCardInfo(searchParams);
                fetch(`${url}?${searchParams}`)
                    .then(response => response.json())
                    .then (data => {
                        setCardList(data.data.slice(0, 12));
                        setNumResults(12);
                        setHasNoResults(false);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.error(errorMessage, errorCode);
                        setHasNoResults(true);
                    })
            } catch (error) {
                console.log(error);
            }
        }
    }
    const handleCardClick = card => {
        setSelectedCard(card);
    }

    return (
        <Box padding='3rem' margin={0} width='100vw' height='100vh'>
            <Container justifyContent='center' maxWidth='60rem'>
                <InputGroup size='lg'>
                    <InputLeftElement pointerEvents='none'>
                        <SearchIcon />
                    </InputLeftElement>
                    <Input 
                        type='text'
                        bg='#fffeee'
                        placeholder='Search for a card'
                        id='cardName'
                        value={cardName}
                        onKeyDown={handleSearch}
                        onChange={
                            (event) => setCardName(event.target.value)
                        }
                    />
                    {
                        hasNoResults && (
                            <Alert>
                                <AlertIcon />
                                No results found. Try search again.
                            </Alert>
                        )
                    }
                </InputGroup>
            </Container>
            <Center padding='3rem' display='inline'>
                <Wrap spacing={30} justify='center'>
                    {
                        cardList.length > 0 && cardList.map(card => (
                            <WrapItem key={card.id}>
                                <MemoCard backgroundColor='transparent'>
                                    <MemoizedImage 
                                        src={card.card_images[0].image_url_small}
                                        alt={card.cardName}
                                        onClick={() => handleCardClick(card)}
                                    />
                                </MemoCard>
                            </WrapItem>
                        ))
                    }
                </Wrap>
                <HStack justify='center' spacing={50} marginTop={10}>
                    <Button 
                        bg='#86c232'
                        fontSize='md'
                        size='lg'
                        _hover={{backgroundColor: '#61892f', color: '#fffeee', transition: 'all 0.3s ease 0s'}}
                        marginTop={10}
                        onClick={() => setNumResults(numResults + 12)}
                    >Load More</Button>
                    <Text marginTop={10} bg='#61892f' color='#fffeee' border='5px #61892f outset' padding={1} fontSize='md'>{cardList.length} Results</Text>
                    <Button 
                        bg='#86c232'
                        size='lg'
                        fontSize='md'
                        _hover={{backgroundColor: '#61892f', color: '#fffeee', transition: 'all 0.3s ease 0s'}}
                        marginTop={10}
                        onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                    >Back To Top</Button>
                </HStack>
            </Center>
            {
                selectedCard && (
                    <CardDetails 
                        card={selectedCard} 
                        isOpen={Boolean(selectedCard)} 
                        onClose={() => setSelectedCard(null)} 
                    />
                )
            }
        </Box>
    )
}