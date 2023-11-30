import {
  Container, HStack, VStack, Flex, Heading, Text, Button
} from '@chakra-ui/react'
import ImageSlider from '@/components/imageCarousel'
import fetchData from './api/cardData/homeAPI';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const [ imageUrls, setImageUrls ] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const data = await fetchData();
        setImageUrls(data);
        console.log('useEffect triggered from index page')
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchImageUrls();
  }, []);
  
  return (
    <VStack width='100vw' height='100vh' padding='3rem 5rem' spacing={150}>
      <HStack>
        <ImageSlider imageUrls={imageUrls} />
        <Container paddingTop='3rem'>
          <VStack align='right'>
            <Heading fontSize='5xl' textAlign='right' color='#61892f'>Stay organized</Heading>
            <Heading fontSize='5xl' textAlign='right' color='#61892f'>Search cards quickly</Heading>
            <Text fontSize='3xl' textAlign='right' color='#fffeee' marginTop='3rem'>Made for players, verterans or beginners. Stay up to date and keep track of your collection and decks.</Text>
          </VStack>
          <HStack marginTop='3rem' spacing='100px' justify='right'>
            <Link href='/search'>          
              <Button 
                size='lg' 
                bg ='#86c232' 
                _hover={{backgroundColor: '#61892f', color: '#fffeee', transition: 'all 0.3s ease 0s'}}
              >Start Searching</Button>
            </Link>
            <Link href='/login'>
              <Button 
                size='lg' 
                border='solid 3px #86c232' 
                bg='transparent' 
                color='#86c232' 
                _hover={{backgroundColor: '#61892f', color: '#fffeee', transition: 'all 0.3s ease 0s'}}
              >Create Account</Button>          
            </Link>
          </HStack>
        </Container>
      </HStack>

      <HStack width='90vw' gap={10}>
        <VStack>
        <Image
          src='/images/searchPage.png'
          width={600}
          height={600}
          alt='Home Page Image'
        />
        <Image
          src='/images/cardModal.png'
          width={600}
          height={600}
          alt='Home Page Image'
        />
        </VStack>
        <Container>
          <Heading fontSize='4xl' textAlign='start' color='#fffeee'>
            Search for cards through the YGO database and add any cards to your collecitons
          </Heading>
        </Container>
      </HStack>

      <HStack width='90vw' gap={10}>
        <Container>
          <Heading fontSize='4xl' textAlign='start' color='#fffeee'>
            Create collections that suit to your needs and with cards that display the amount of cards in each one
          </Heading>
        </Container>
        <VStack>
        <Image
          src='/images/vaultLayout.png'
          width={600}
          height={600}
          alt='Home Page Image'
        />
        <Image
          src='/images/createVault.png'
          width={600}
          height={600}
          alt='Home Page Image'
        />
        </VStack>
      </HStack> 
          
      <HStack width='90vw' gap={10} marginBottom={100}>
        <VStack>
        <Image
          src='/images/collectionLayout.png'
          width={600}
          height={600}
          alt='Home Page Image'
        />
        <Image
          src='/images/deleteCollection.png'
          width={600}
          height={600}
          alt='Home Page Image'
        />
        </VStack>
        <Container>
          <Heading fontSize='4xl' textAlign='start' color='#fffeee'>
            View your collections with all your cards displayed. Add or delete cards from within your collection view. 
          </Heading>
        </Container>
      </HStack>

    </VStack>    
  )
}
