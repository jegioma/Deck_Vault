import {
    Box, Text, Heading, Input, Card, Container, VStack, HStack, Spacer, SimpleGrid, Stack, IconButton, Button
} from '@chakra-ui/react'
import { LockIcon, DeleteIcon } from '@chakra-ui/icons';
import MiniSearch from '@/components/miniSearch';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchCollectionByName, refreshCollection, deleteCollection } from '@/pages/api/cardData/collectionAPI';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

export default function CollectionPage() {
  const router = useRouter();
  const { id } = router.query;
  const user = useUser();
  const supabase = useSupabaseClient();
  const [ collection, setCollection ] = useState();

  const handleCopyCountChange = (value) => {
    setCopyCount(value);
}

  useEffect(() => {
    if (id) {
      fetchCollectionByName(id, user, supabase)
        .then((collectionData) => {
          setCollection(collectionData);
        }).catch((error) => {
          console.log(error);
        });
    }
  }, [id, user, supabase])



  return (
    <Box padding='1rem' width='100vw' height='100vh'>
      <SimpleGrid columns={2} spacing={5} height='100vh'>
        {collection && (
          <>
            <Container borderRadius={15} >
              <Stack bg='#d9d9d9' borderRadius={15} padding={5}>
                <Heading fontSize='xl' width='100%'>Name: {collection.name}</Heading>
                <HStack width='100%' >
                  <Text>Card Total: {collection.totalCards || 0}</Text>
                  <Spacer />
                  <HStack spacing={30}>
                    <IconButton icon={<LockIcon />} 
                      size='lg'
                      bg='#86c232'
                      _hover={{ backgroundColor: '#61892f', color: '#fffeee' }}
                      onClick={() => refreshCollection(user, supabase)}
                    />
                    <IconButton icon={<DeleteIcon />} 
                      size='lg'
                      bg='#880808'
                      color='#fffeee'
                      _hover={{ backgroundColor: '#FF2400', color: '#000' }}
                      onClick={() => deleteCollection(collection)}
                    />
                  </HStack>
                </HStack>
              </Stack>
            </Container>
            <Container >
              <MiniSearch collection={id} />
            </Container>
          </>
        )}
        </SimpleGrid>
      </Box>
  )
}
