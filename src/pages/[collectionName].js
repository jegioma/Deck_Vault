import {
    Box, Text, Heading, Input, Card, Container, VStack, HStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchCollectionByName } from '@/pages/api/cardData/collectionAPI';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

export default function CollectionPage() {
  const router = useRouter();
  const { id } = router.query;
  const user = useUser();
  const supabase = useSupabaseClient();
  const [ collection, setCollection ] = useState();

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
    <Box>
        {collection && (
          <>
            <Text>Collection Name: {collection.name}</Text>
            <Text>Collection ID: {collection.id}</Text>
          </>
        )}
    </Box>
  )
}
