import {
  Box, Container, HStack, VStack, Flex, Heading, Text, Button, IconButton, Icon
} from '@chakra-ui/react'
import Link from 'next/link';
import ImageSlider from '@/components/imageCarousel'
import { useEffect, useState } from 'react';
import fetchData from './api/cardData/homeAPI';

export default function Home() {

  const [ imageUrls, setImageUrls ] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const data = await fetchData();
        setImageUrls(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchImageUrls();
  }, []);
  
  return (
    <Flex width='100vw' height='100vh' padding='3rem 5rem'>
        <ImageSlider imageUrls={imageUrls} />
      <Container paddingTop='3rem'>
        <VStack align='right'>
          <Heading fontSize='5xl' textAlign='right' color='#61892f'>Stay organized</Heading>
          <Heading fontSize='5xl' textAlign='right' color='#61892f'>Search cards quickly</Heading>
          <Text fontSize='3xl' textAlign='right' color='#fffeee' marginTop='3rem'>Made for players, verterans or beginners. Stay up to date and keep track of your collection and decks.</Text>
        </VStack>
        <HStack marginTop='3rem' spacing='100px' justify='right'>
          <Link href='/search'>          
            <Button size='lg' bg ='#86c232' _hover={{backgroundColor: '#61892f', color: '#fffeee', transition: 'all 0.3s ease 0s'}}>Get Started</Button>
          </Link>
          <Link href='/login'>
            <Button size='lg' border='solid 3px #86c232' bg='transparent' color='#86c232' _hover={{backgroundColor: '#61892f', color: '#fffeee', transition: 'all 0.3s ease 0s'}}>Learn More</Button>          
          </Link>
        </HStack>
      </Container>
    </Flex>    
  )
}
