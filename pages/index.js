import { 
  Box, Container, Image, Text, Heading, Button, HStack
} from '@chakra-ui/react';
import styles from '../styles/index.module.css';
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { ArrowRightIcon, InfoIcon } from '@chakra-ui/icons';




export default function Index() {
  const [cardName, setCardName] = useState('');

  useEffect(() => {
    fetch(`https://db.ygoprodeck.com/api/v7/randomcard.php`)
    .then(response => response.json())
    .then(data => setCardName(data))
    .catch(error => console.error(error)); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
        <Box className={styles.container}>
          {
            <Image src={`https://images.ygoprodeck.com/images/cards/${cardName.id}.jpg`} className={styles.img_ctn} alt={cardName.name} />
          }
            <Container className={styles.text_ctn}>
              <Heading align='right' fontSize='5xl' color='darkred'>Made for players who need a quick and simple way to search for cards</Heading>
                <Text fontSize='2xl' align='right' color='black' className={styles.text}>
                  Whether you are a verteran or a beginner, stay up to date and organized
                </Text>
                <HStack className={styles.hStack} spacing='80px' marginLeft='35%' marginTop='10%'>
                  <Button className={styles.login_btn} bg='darkred' size='lg' color='white' _hover={{ bg: 'darkred', border: 'solid #e8f1f2 3px', transition: 'all 0.3s ease 0s'}}>
                    <Link href='/login'>Get Started</Link><ArrowRightIcon marginLeft='10px' />
                  </Button>
                  <Button className={styles.about_btn} bg='transparent' color='darkred' size='lg' _hover={{transition: 'all 0.3s ease 0s',border: 'solid 3px darkred'}} >
                    <Link href='/construction'>Learn More</Link><InfoIcon marginLeft='10px' />
                  </Button>
                </HStack>
            </Container>
        </Box>
    </>
  );
}