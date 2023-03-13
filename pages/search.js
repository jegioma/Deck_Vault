import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import styles from '../styles/search.module.css';
import React, { useState } from 'react';
import CardSearch from '../components/cardSearch';
import { SearchIcon } from '@chakra-ui/icons';

export default function Search() {
    const [ cardName, setCardName] = useState('');
    const [ searchCard, setSearchCard] = useState('');

    const handleKeyDown = (event) => {
        if (event.key == 'Enter') {
            setSearchCard(cardName);
            cardInput();
        }  
    };

    function cardInput() {
        // fuzzy search that brings back data with all cards with the keyword in it
        // fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?&fname=${cardName}`)
        // name search brings cards with the exact name of the card that's inputed
        fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${cardName}`)
            .then((response) => response.json())
            .then((json) => console.log(json));
    }
    
    return (
        <>
            <Box className={styles.container}>
                <InputGroup size='lg' className={styles.input}>
                    <InputLeftElement pointerEvents='none' children={ <SearchIcon />} />
                    <Input type='text' bg='#e8f1f2' placeholder='Search for a card' id='cardName' value={cardName} onChange={(event) => setCardName(event.target.value)} onKeyDown={handleKeyDown}  />
                </InputGroup>
                
                <ul className={styles.list}></ul> 
                
            </Box>
        </>
    )
}