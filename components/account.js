import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Box, Container, Button, FormLabel, HStack, Input, Heading, Text, IconButton, Divider, GridItem, SimpleGrid, Grid } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import Avatar from './avatar';
import styles from '../styles/account.module.css';

export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [ avatar_url, setAvatarUrl ] = useState(null);
  const [ collectionName, setCollectionName ] = useState('');
  // const [ name, setName ] = useState('');
  const [ collections, setCollections ] = useState([]);

  useEffect(() => {
    async function getProfile() {
      try {
        let { data, error, status } = await supabase
          .from('profiles')
          .select(`avatar_url`)
          .eq('id', user.id)
          .single();

        if (error && status !== 406) {
          throw error
        }
  
        if (data) {
          setAvatarUrl(data.avatar_url)
        }
      } catch (error) {
        alert('Error loading user data!')
        console.log(error)
      }
    }
    async function fetchCollections() {
      try {
        const { data, error } = await supabase
          .from('collections')
          .select(`*`)
          .eq('user_id', user.id);
  
        if (error) {
          throw error
        }
        console.log('Collections fetched: ', data);
        setCollections(data || []);
      } catch (error) {
        console.error(error);
      }
    }
    getProfile();
    fetchCollections();
  }, [session, supabase, user.id])

  async function refreshCollection() {
    try {
      const { data, error } = await supabase
        .from('collections')
        .select(`*`)
        .eq('user_id', user.id);

      if (error) {
        throw error
      }
      console.log('Collections fetched: ', data);
      setCollections(data || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function createCollection() {
    if (!collectionName) {
      alert('Please enter a name for the collection');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('collections')
        .insert([{user_id: user.id, name: collectionName}]);

        if (error) {
          throw error;
        }

        console.log('Collection created: ', data);
        setCollectionName('');
        refreshCollection();
    } catch (error) {
      alert('Error creating collection!');
      console.log(error);
    }
  }

  async function updateCollectionName(id, name) {
    try {
      
    
    const { data, error } = await supabase
    .from('collections')
    .update({ name })
    .eq('id', id);
  
      if (error) {
        throw error;
      }

      console.log('Collection name updated: ', data);
      refreshCollection();
    } catch (error) {
      alert('Error updating collection!');
      console.error(error);
    }
  }

  async function deleteCollection(name) {
    try {
      
      const { data, error } = await supabase
      .from('collections')
      .delete()
      .eq('name', name)


      if (error) {
        throw error;
      }

        console.log("Collection deleted: ", data);
        refreshCollection();
    } catch (error) {
      alert('Error deleting collection!');
      console.error(error);
    }
  }
  async function updateProfile({ avatar_url }) {
    try {
      const updates = {
        id: user.id,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } 
  }

  return (
    <Box className={styles.container}>
      <Heading color='#800000' marginTop={5} >Account Information</Heading>
      <Divider borderColor='#800000' marginBottom={5} />
      <SimpleGrid columns={2}>
        <GridItem width='60%'>
          <FormLabel fontWeight={500} marginBottom={0} marginLeft={0} color='#800000'>Avatar Image</FormLabel>
          <Avatar
            uid={user.id}
            url={avatar_url}
            size={175}
            onUpload={(url) => {
              setAvatarUrl(url)
              updateProfile({ avatar_url: url})
            }}
          />
          <FormLabel marginTop={3} color='#800000'>Email</FormLabel>
          <FormLabel bg='#ecf1f2' className={styles.email} id='email'>{session.user.email}</FormLabel>
          <Button className={styles.btn} bg='#800000' onClick={() => updateProfile({avatar_url})} >
            Update
          </Button>
          <Button className={styles.btn} bg='#800000' onClick={() => supabase.auth.signOut()}>
            Sign Out
          </Button>
        </GridItem>
        <GridItem className={styles.form}>
            <FormLabel color='#800000'>Create new collection</FormLabel>
            <HStack>
              <Input type='text' bg='#ecf1f2' placeholder='Enter name' width='60%' id='collectionName' value={collectionName} onChange={(e) => setCollectionName(e.target.value)} />

              <Button className={styles.btn} bg='#800000' onClick={() => createCollection()} >
                Create
              </Button>
            </HStack>

            <Heading as="h2" color='#800000' size="md" mt={6}>
              My Collections
            </Heading>
            <Grid width='100%' templateColumns='repeat(2, 1fr)' >
            {collections.map(collection => (
                <GridItem key={collection.id}>
                  <HStack>
                    <Text margin={1} className={styles.collections} width='50%'>{collection.name}</Text>
                    <IconButton
                      bg='#800000'
                      className={styles.icon_btn}
                      _hover={{'& > svg': { color: '#800000' }}}
                      icon={<EditIcon color='#ecf1f2'/>}
                      aria-label="Edit"
                      onClick={() => {
                        const newName = prompt('Enter new name:', collection.name);
                        if (newName !== null) {
                          // setName(newName);
                          updateCollectionName(collection.id, newName);
                        }
                      }}
                    />
                    <IconButton 
                      bg='#800000'
                      className={styles.icon_btn}
                      _hover={{'& > svg': { color: '#800000' }}}
                      icon={<DeleteIcon color='#ecf1f2'/>}
                      aria-label="Delete"
                      onClick={() => {
                        deleteCollection(collection.name)
                      }}
                    />
                  </HStack>
                </GridItem>
            ))}
          </Grid>
        </GridItem>
      </SimpleGrid>
    </Box>
  );
}