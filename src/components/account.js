import {
    Container, VStack, Button, Text, Heading, HStack, UnorderedList, ListItem, Spacer
} from '@chakra-ui/react';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';
import { fetchCollections } from '@/pages/api/cardData/collectionAPI';
import { getProfileInfo } from '@/pages/api/cardData/accountAPI';
import Avatar from './avatar';

export default function Account({ session }) {
    const user = useUser();
    const supabase = useSupabaseClient();
    const [ uid, setUid ] = useState(null);
    const [ avatarUrl, setAvatarUrl ] = useState(null);
    const [ collections, setCollections ] = useState([]);
      
    useEffect(() => {
        async function fetchProfileInfo() {
            const profileInfo = await getProfileInfo(user, supabase);
            if (profileInfo) {
                setAvatarUrl(profileInfo.avatar);
                setUid(profileInfo.id);
                // Update any other state variables here
            }
        }
        
        fetchProfileInfo();
        fetchCollections(user, supabase)
            .then((collectionData) => {
                setCollections(collectionData);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [session, user.id, user, supabase]);
     
    const deleteAccount = async () => {
        const { error: deleteError } = await supabase
            .from('collections')
            .delete()
            .eq('profile_id', uid);

        if (deleteError) console.log('Error Deleting Collections: ', deleteError);

        const { error: profileDeleteError } = await supabase
            .from('profiles')
            .delete()
            .eq('id', uid);

        if (profileDeleteError) console.log('Error Deleting Profile: ', profileDeleteError);

        // const { error: authDeleteError } = await supabase
        //     .from('auth')
        //     .select(`*`)
        //     .delete()
        //     .eq('uid', uid);

        // if (authDeleteError) console.log('Error Deleting Auth: ', authDeleteError);

        supabase.auth.signOut();
    }

    return (
        <Container bg='#d9d9d9' padding='1rem' borderRadius={15}> 
        <Heading>Account Details</Heading>
        <Text>Email: {user.email}</Text>
            <HStack marginTop='3rem'>
                <Avatar
                    uid={user.id}
                    url={avatarUrl}
                    size={100}
                    onUpload={(url) => setAvatarUrl(url)}
                />
                {/* <Spacer /> */}
                <VStack width='100%' padding={3}>
                    <Heading fontSize='lg' textDecor='underline'>Collections List</Heading>
                    <UnorderedList display='grid'  width='100%' gridTemplateColumns='repeat(3, 1fr)' styleType='none' margin='auto' overflowY='auto' maxHeight='10rem'>
                    {collections.length === 0 ? (
                        <Text>List is empty</Text>
                        ) : (
                        collections.map(collection => (
                            <ListItem  key={collection.id}>
                                <Text
                                    fontSize='sm' 
                                    border='solid 1px green'
                                    padding={1} 
                                    borderRadius={10} 
                                    margin={1} 
                                    textAlign='center'
                                    bg='#61892F'
                                    color='white'
                                >{collection.name}</Text>
                            </ListItem>
                        ))
                    )}
                    </UnorderedList>
                </VStack>
            </HStack>
            <HStack marginTop='5rem'>
                <Spacer />
                {/* <Button
                    size='md'
                    colorScheme='red'
                    onClick={deleteAccount}
                >Delete</Button> */}
                <Button 
                    bg='#86C232' 
                    color='#222629' 
                    size='lg' 
                    _hover={{ color: '#fffeee', backgroundColor: '#61892f', transition: 'all 0.3s ease 0s'}}
                    onClick={() => supabase.auth.signOut()}
                >Logout</Button>
            </HStack>
        </Container>
    )
}