import {
    Box, Input, InputGroup, InputLeftElement, Image, Button, Center, Card, HStack, Alert, AlertIcon
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
   const [ numResults, setNumResults ] = useState(8);
   const [ cardList, setCardList ] = useState([]);
   const [ cardInfo, setCardInfo ] = useState('');
   const [ hasNoResults, setHasNoResults ] = useState(false);
   const url = 'https://db.ygoprodeck.com/api/v7/cardinfo.php';

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
        } catch(error) {
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
            .then(data => {
                setCardList(data.data.slice(0, 8));
                setNumResults(8);
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

   const handleCloseModal = () => {
       setSelectedCard(null);
   }

   function loadMoreCards() {
       setNumResults(numResults + 8);
   }

   return (
       <Box className={styles.container}>
           <InputGroup size='lg' className={styles.input}>
               <InputLeftElement pointerEvents='none'>
                <SearchIcon />
               </InputLeftElement>
               <Input type='text' bg='#e8f1f2' placeholder='Search for a card' id='cardName' value={cardName} onChange={(event) => setCardName(event.target.value)} onKeyDown={handleSearch} />
           </InputGroup>
           {hasNoResults && (
            <Alert>
                <AlertIcon />
                No results found. Try again.
            </Alert>
           )}
           <Center className={styles.card_display}> 
               <div className={styles.card_layout}>
                   {
                       cardList.length > 0 && cardList.map(card => (
                        <MemoCard 
                        key={card.id}
                        >
                            <MemoizedImage
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
                   <Button bg='white' onClick={loadMoreCards} transition={'all 0.3s ease 0.3s'}>Load More</Button>
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