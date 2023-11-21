import {
    Wrap, WrapItem, InputGroup, Input, InputLeftElement, Image, Card, Container,
    HStack, Text, IconButton, useToast
} from '@chakra-ui/react';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect, memo } from 'react';
import MiniCardModal from './miniCardModal';

export default function MiniSearch({ collection }) {
    const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';
    const MemoizedImage = memo(Image);
    const MemoCard = memo(Card);
    const toast = useToast();
    const [cardName, setCardName] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);
    const [numResults, setNumResults] = useState(12);
    const [cardList, setCardList] = useState([]);
    const [allCards, setAllCards] = useState([]);
    const [cardInfo, setCardInfo] = useState('');
    const [hasNoResults, setHasNoResults] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [page, setPage] = useState(1);
    const [showButtons, setShowButtons] = useState(false);
    const [ showMiniModal, setShowMiniModal ] = useState(false);

    useEffect(() => {
        if (searchPerformed) {
            try {
                fetch(`${url}?${cardInfo}`)
                    .then(response => response.json())
                    .then(data => {
                        setAllCards(data.data);
                        setCardList(data.data.slice(0, 12));
                        setNumResults(12);
                        setHasNoResults(false);
                        // Remove 'page' from the dependency array
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.error(errorMessage, errorCode);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    }, [searchPerformed, cardInfo]);
    
    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            try {
                const searchTerm = cardName.trim().replace(/[\s]+/g, '%');
                const searchParams = new URLSearchParams();
                searchParams.append('fname', searchTerm);
                setCardInfo(searchParams);
                fetch(`${url}?${searchParams}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        setAllCards(data.data);
                        setCardList(data.data.slice(0, 12));
                        setNumResults(12);
                        setHasNoResults(false);
                        setPage(1); // Reset the page to 1
                        setShowButtons(true);
                        setSearchPerformed(true);
                        console.log('search page: ' + page);
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        console.error(errorMessage, errorCode);
                        setHasNoResults(true);
                        toast({
                            description: 'No card matching your query was found... Try search again...',
                            status: 'error',
                            duration: 3000,
                            position: 'top-right',
                            isClosable: true,
                        })
                    });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleCardClick = card => {
        setSelectedCard(card);
        setShowMiniModal(true);
    };

    const handlePageChange = newPage => {
        const startIndex = (newPage - 1) * 12;
        const endIndex = startIndex + 12;
        setCardList(allCards.slice(startIndex, endIndex));
        setPage(newPage);
        console.log('search page: ' + newPage);
    };

    return (
        <Container width='100%' height='100%' margin={0} padding={0}>
            <InputGroup>
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
                    onChange={(event) => setCardName(event.target.value)}
                />
            </InputGroup>
            <Wrap spacing={5} justify='center' margin={5} height={500}>
                {cardList.length > 0 &&
                    cardList.map(card => (
                        <WrapItem key={card.id}>
                            <MemoCard backgroundColor='transparent'>
                                <MemoizedImage
                                    src={card.card_images[0].image_url_small}
                                    alt={card.cardName}
                                    onClick={() => handleCardClick(card)}
                                    height={150}
                                    width={100}
                                />
                            </MemoCard>
                        </WrapItem>
                    ))}
            </Wrap>
            {showButtons && (
                <HStack justify='center' spacing={30}>
                    {page > 1 && (
                        <IconButton
                            icon={<ArrowBackIcon />}
                            bg='#86c232'
                            _hover={{ backgroundColor: '#61892f', color: '#fffeee' }}
                            onClick={() => handlePageChange(page - 1)}
                        />
                    )}
                    <Text
                        bg='#61892f'
                        color='#fffeee'
                        border='3px #61892f outset'
                        padding={1}
                        fontSize='md'
                    >
                        {cardList.length} Results
                    </Text>
                    {page * 12 < allCards.length && (
                        <IconButton
                            icon={<ArrowForwardIcon />}
                            bg='#86c232'
                            _hover={{ backgroundColor: '#61892f', color: '#fffeee' }}
                            onClick={() => handlePageChange(page + 1)}
                        />
                    )}
                </HStack>
            )}
            {
                selectedCard && (
                    <MiniCardModal
                        card={selectedCard}
                        collection={collection}
                        isOpen={Boolean(selectedCard)}
                        onClose={() => setSelectedCard(null)}
                    />
                )
            }
        </Container>
    );
}
