import {
    Box, SimpleGrid, VStack, Tooltip, Stack, Text, Heading, Card, Center,
    IconButton, useDisclosure, Button
} from '@chakra-ui/react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
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
        })
    }, [supabase, user])
    
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
      <>
      {user ? (
        <Box borderRadius={15} minHeight='30rem' width='90%' marginTop='3rem' marginLeft='auto' marginRight='auto' backgroundColor='#d9d9d9'>
          <VStack>
            <Heading color='#000'>Your Collections</Heading>
              <SimpleGrid columns={[2, 3, 4]} spacing={10} padding='2rem'>
                <Card padding={3} >
                  <Stack align='center'>
                    <Heading fontSize='lg' margin={3}>New Collection</Heading>
                    <Tooltip label='Create Collection' aria-label='A tooltip'>
                      <IconButton
                        bg='#86c232'
                        size='md'
                        onClick={onOpen} 
                        cursor='pointer'
                        _hover={{backgroundColor: '#61892f', color: '#fffeee'}}
                        icon={<AddIcon />}
                      />
                    </Tooltip>
                  </Stack>
                </Card>
              {
                collections.map(collection => (
                  <Link key={collection.id} href={`/${slugify(collection.name)}?id=${collection.id}`}>
                    <Card padding={3}>
                      <Stack align='center'>
                        <Heading textAlign='left' fontSize='md' color='#000'>{collection.name}</Heading>
                        <Text justifySelf='left' >Card Total: {collection.totalCards ? collection.totalCards : '0'}</Text>
                        <Tooltip label='Edit Collection' aria-label='A tooltip'>
                          <IconButton
                            icon={<EditIcon />}
                            bg='#86c232'
                            cursor='pointer'
                            _hover={{backgroundColor: '#61892f', color: '#fffeee'}}
                            size='md'
                          />
                        </Tooltip>
                      </Stack>
                    </Card>
                  </Link>
                ))
              }
            </SimpleGrid>
            <NewCardModal user={user} isOpen={isOpen} onClose={onClose} supabase={supabase} setCollections={setCollections} />
          </VStack>
        </Box>
        ) : (
          <Center padding='3rem' margin='auto' marginTop='5rem' borderRadius={15} width='50%' backgroundColor='#d9d9d9'>
              <VStack>
                <Heading>Login Required</Heading>
                <Text fontSize='lg' textAlign='center'>To access your collections and enjory our other features, please log in or create an account</Text>
                <Link href='/login'>
                  <Button size='lg' bg ='#86c232' _hover={{backgroundColor: '#61892f', color: '#fffeee', transition: 'all 0.3s ease 0s'}}>Login</Button>
                </Link>
              </VStack>
          </Center>
        )
        }
      </>
    )
}