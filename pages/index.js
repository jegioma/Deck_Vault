// import { 
//   Box, Container, Image, Text, Heading
// } from '@chakra-ui/react';
// import styles from '../styles/index.module.css';
// import React, { useState, useEffect } from 'react';


// export default function Index() {

//   const cards = ["Dark Magician", "Elemental HERO Neos", "Stardust Dragon", "Number 39: Utopia", "Odd-Eyes Pendulum Dragon", "Firewall Dragon",
//                   "Blue-Eyes White Dragon", "Armed Dragon LV10", "Red Dragon Archfiend", "Galaxy-Eyes Photon Dragon", "D/D/D Doom King Armageddon", "Borreload Dragon"];
//   const [ cardName, setCardName ] = useState([]);

//   useEffect(() => {
//     // const randomCard = cards[Math.floor(Math.random() * cards.length)];
//     // fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php` + `?name=${randomCard}`)
//     fetch(`https://db.ygoprodeck.com/api/v7/randomcard.php`)
//     .then(response => response.json())
//     .then(data => setCardName(data.data))
//     .catch(error => console.error(error)); 
// }, []);

//   return (
//     <>
//         <Box className={styles.container}>
//           {
//             cardName.map(card => (
//               <Image src={card.card_images[0].image_url} className={styles.img_ctn} alt={card.name} />

//               )
//             )
//           }
//             <Container className={styles.text_ctn}>
//               <Heading align='right' fontSize='5xl'>Made for players who need a quick and simple way to search for cards</Heading>
//                 <Text fontSize='2xl' align='right' className={styles.text}>
//                 DeckVault is a must-have app for players who want to quickly search for cards from the Yu-Gi-Oh database.
//                   Whether you're building a new deck or just looking to learn more about the game, DeckVault is the perfect tool to help you stay organized
//                 </Text>
//             </Container>
//         </Box>
//     </>
//   );
// }
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
  }, []);

  return (
    <>
        <Box className={styles.container}>
          {
            <Image src={`https://images.ygoprodeck.com/images/cards/${cardName.id}.jpg`} className={styles.img_ctn} alt={cardName.name} />
          }
            <Container className={styles.text_ctn}>
              <Heading align='right' fontSize='5xl' color='#03C988'>Made for players who need a quick and simple way to search for cards</Heading>
                <Text fontSize='2xl' align='right' className={styles.text}>
                  Whether you're a verteran or a beginner, stay up to date and organized
                </Text>
                <HStack className={styles.hStack} spacing='80px' marginLeft='35%' marginTop='10%'>
                  <Button className={styles.login_btn} bg='#03C988' size='lg' _hover={{ bg: '#03C970', border: 'solid #e8f1f2 3px', transition: 'all 0.3s ease 0s'}}>
                    <Link href='/login'>Get Started</Link><ArrowRightIcon marginLeft='10px' />
                  </Button>
                  <Button className={styles.about_btn} bg='transparent' color='#03C988' size='lg' _hover={{ bg: '#03C970', border: 'solid #e8f1f2 3px', transition: 'all 0.3s ease 0s', color: '#1b202b'}}>
                    <Link href='/about'>Learn More</Link><InfoIcon marginLeft='10px' />
                  </Button>
                </HStack>
            </Container>
        </Box>
    </>
  );
}