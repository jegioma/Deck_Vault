import {
    Box, SimpleGrid, Grid, GridItem, VStack, WrapItem,
    HStack, Stack, Text, Heading, Image, Card, 
    IconButton, useDisclosure
} from '@chakra-ui/react'
import { AddIcon, EditIcon } from '@chakra-ui/icons'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchCollections } from '@/pages/api/cardData/collectionAPI';
import NewCardModal from '@/components/newCardModal';


export default function Vault() {

    const supabase = useSupabaseClient();
    const user = useUser();
    const [ collections, setCollections ] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();


    useEffect(() => {
      fetchCollections(user, supabase)
        .then((collectionData) => {
          setCollections(collectionData);
        }).catch((error) => {
          console.log(error);
          console.log(supabase.auth.session)
        })
    }, [ supabase, user])
    
    function slugify(text) {
      return text
        .toString() // Convert to string
        .toLowerCase() // Convert the string to lowercase letters
        .trim() // Remove whitespace from both sides of a string
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-'); // Replace multiple - with single -
    }
    

    return (
      <Box borderRadius={15} minHeight='30rem' width='90%' marginTop='3rem' marginLeft='auto' marginRight='auto' backgroundColor='#d9d9d9'>
        <VStack>
          <Heading color='#000'>Your Collections</Heading>
            <SimpleGrid columns={[2, 3, 4]} spacing={10} padding='2rem'>
              <Card padding={3} >
                <Stack align='center'>
                  <Heading fontSize='lg' margin={3}>New Collection</Heading>
                  <IconButton
                    bg='#86c232'
                    size='md'
                    onClick={onOpen} 
                    cursor='pointer'
                    _hover={{backgroundColor: '#61892f', color: '#fffeee'}}
                    icon={<AddIcon />}
                  />
                </Stack>
              </Card>
            {
              collections.map(collection => (
                <Link key={collection.id} href={`/${slugify(collection.name)}?id=${collection.id}`}>
                  <Card padding={3}>
                    <Stack align='center'>
                      <Heading textAlign='left' fontSize='md' color='#000'>{collection.name}</Heading>
                      <Text justifySelf='left' >Card Total: {collection.totalCards ? collection.totalCards : '0'}</Text>
                      <IconButton
                        icon={<EditIcon />}
                        bg='#86c232'
                        cursor='pointer'
                        _hover={{backgroundColor: '#61892f', color: '#fffeee'}}
                        size='md'
                      />
                    </Stack>
                  </Card>
                </Link>
              ))
            }
          </SimpleGrid>
        </VStack>
        <NewCardModal user={user} isOpen={isOpen} onClose={onClose} supabase={supabase} setCollections={setCollections} />
      </Box>
    )
}