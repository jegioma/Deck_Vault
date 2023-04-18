import {
     Box, Input, InputGroup, InputLeftElement, Image, Card, Button, Center, HStack, ScaleFade
    } from '@chakra-ui/react';
import styles from '../styles/cardSearch.module.css';
import React, { useEffect, useState, memo } from 'react';
import { SearchIcon, CheckIcon, AddIcon } from '@chakra-ui/icons';
import CardDetails  from '../components/cardDetails';

export default function CardSearch() {
 
    const MemoizedImage = memo(Image);
    const MemoCard = memo(Card);
    const [ cardName, setCardName ] = useState('');
    const [ selectedCard, setSelectedCard ] = useState(null);
    const [ numResults, setNumResults ] = useState(12);
    const [ cardList, setCardList ] = useState([]);
    const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

    useEffect(() => {
        const cleanedSearchTerm = cardName.replace(/[\s\W]+/g, '%');
        fetch(url + `?fname=${cleanedSearchTerm}`)
        .then(response => response.json())
        .then(data => {
            setCardList(data.data.slice(0, (numResults)));
        })
        .catch(error => console.error(error)); 
    }, [numResults]);

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            const cleanedSearchTerm = cardName.replace(/[\s\W]+/g, '%');
            fetch(`${url}?fname=${cleanedSearchTerm}`)
            .then(response => response.json())
            .then(data => {
                setCardList(data.data.slice(0, 12));
                setNumResults(12);
            })
            .catch(error => console.error(error)); 
        }
    }

    const handleCardClick = card => {
        setSelectedCard(card);
    }

    const handleCloseModal = () => {
        setSelectedCard(null);
    }

    function loadMoreCards() {
        setNumResults(numResults + 12);
    }

    return (
        <Box className={styles.container}>
            <InputGroup size='lg' className={styles.input}>
                <InputLeftElement pointerEvents='none' children={ <SearchIcon /> } />
                <Input type='text' bg='#e8f1f2' placeholder='Search for a card' id='cardName' value={cardName} onChange={(event) => setCardName(event.target.value)} onKeyDown={handleSearch} />
            </InputGroup>
            <Center className={styles.card_display}> 
                <div className={styles.card_layout}>
                    {
                        cardList.length > 0 && cardList.map(card => (
                            <MemoCard>
                                <MemoizedImage
                                key={card.id}
                                src={card.card_images[0].image_url}
                                alt={card.cardName}
                                onClick={() => handleCardClick(card) }
                                ></MemoizedImage>
                                <HStack>
                                    <Button>Add to Collection</Button> <CheckIcon /><AddIcon />
                                </HStack>
                            </MemoCard>
                            )
                        )
                    }
                    <Button bg='white' onClick={loadMoreCards} transition={'all 0.5s ease 0.5s'}>Load More</Button>
                </div>   
                {
                    selectedCard && (
                    <CardDetails card={selectedCard} isOpen={Boolean(selectedCard)} onClose={handleCloseModal} />
                    )
                }
            </Center>
        </Box>
    );
}