import {
    Box, Text, Heading, Container, HStack, Spacer, SimpleGrid, Stack, IconButton, useDisclosure, Tooltip, useToast
} from '@chakra-ui/react';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import MiniSearch from '@/components/miniSearch';
import LaunchIcon from '@mui/icons-material/Launch';
import ClearIcon from '@mui/icons-material/Clear';
import AlertDialogDeleteCollection from '@/components/alertDialogs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchCollectionByName, deleteCard, refreshCurrentCollection } from '@/pages/api/cardData/collectionAPI';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import CardDetails from '@/components/cardDetailsModal';

export default function CollectionPage() {
  const router = useRouter();
  const { id } = router.query;
  const user = useUser();
  const supabase = useSupabaseClient();
  const [ collection, setCollection ] = useState();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [ selectedCard, setSelectedCard ] = useState(null);

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

  function handleCardClick(id) {
    const url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`;
    fetch(`${url}`)
      .then(response => response.json())
      .then(data => {
        setSelectedCard(data.data[0])
      })
  }

  return (
    <Box padding='1rem' width='100vw' height='100vh'>
      <SimpleGrid columns={2} spacing={5} height='100vh'>
        {collection && (
          <>
            <Container borderRadius={15} >
              <Stack bg='#d9d9d9' borderRadius={15} padding={3} marginBottom={3}>
                <Heading fontSize='xl' width='100%'>Name: {collection.name}</Heading>
                <HStack width='100%' >
                  <Text>Card Total: {collection.totalCards || 0}</Text>
                  <Spacer />  
                  <Tooltip label='Update Collection' aria-label='A tooltip'>
                    <IconButton icon={<UpdateIcon />} 
                      size='md'
                      bg='#61892f'
                      color='#fffeee'
                      _hover={{ backgroundColor: '#86c232', color: '#000' }}
                      onClick={() => refreshCurrentCollection(id, setCollection, supabase)}
                    />
                  </Tooltip>            
                    <Tooltip label='Delete Collection' aria-label='A tooltip'>
                    <IconButton icon={<DeleteForeverIcon />} 
                      size='md'
                      colorScheme='red'
                      onClick={onOpen}
                    />
                  </Tooltip>
                </HStack>
              </Stack>
              <Stack borderRadius={15} padding={5} border='ridge black 5px' maxHeight='40rem' overflowY='auto'>
                {collection.card_ids && collection.card_ids.map((cardId, index) => (
                  <HStack key={index} width='100%' bg='#d9d9d9'  height='3rem' padding={3}>
                    {collection.copy_amnt && collection.copy_amnt[index] && (
                      <Text>Qty: {collection.copy_amnt[index]}</Text>
                    )}
                    {collection.card_names && collection.card_names[index] && (
                      <Text> | {collection.card_names[index]}</Text>
                    )}
                    <Spacer />
                    <Tooltip label='Card Details' aria-label='A tooltip'>
                      <IconButton 
                        icon={<LaunchIcon />}
                        bg='#86c232'
                        _hover={{ backgroundColor: '#61892f', color: '#fffeee' }}
                        size='xs'
                        onClick={() => {
                          const id = collection.card_ids[index];
                          handleCardClick(id);
                        }}
                      />
                    </Tooltip>
                    <Tooltip label='Delete Card' aria-label='A tooltip'>
                      <IconButton
                        onClick={() => {
                          deleteCard(cardId, id, supabase, (refreshedData) => {
                            setCollection(refreshedData);
                            toast({
                              title: 'Card deleted from collection',
                              status: 'success',
                              position: 'top-right',
                              duration: 2000,
                            });
                          });
                        }}
                        icon={<ClearIcon />}
                        colorScheme='red'
                        size='xs'
                      />
                    </Tooltip>
                  </HStack>
                ))}
              </Stack>
            </Container>
            <Container >
              <MiniSearch collection={id} />
            </Container>
          </>
        )}
        </SimpleGrid>
        <AlertDialogDeleteCollection isOpen={isOpen} onClose={onClose} id={id} user={user} supabase={supabase}/>
        {
          selectedCard && (
            <CardDetails 
                card={selectedCard} 
                isOpen={Boolean(selectedCard)} 
                onClose={() => setSelectedCard(null)} 
            />
          )
        }
      </Box>
  )
}
