import {
    Box, Container, HStack, VStack, Stack, Button, Input, Text, Heading, SimpleGrid, GridItem, UnorderedList, ListItem
} from '@chakra-ui/react';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';
import { supabase } from '@supabase/auth-ui-shared';
import Avatar from './avatar';
import { refreshCollection } from '@/pages/api/auth/profile'
import { fetchCollections } from '@/pages/api/cardData/collectionAPI';

export default function Account({session}) {

    
    const supabase = useSupabaseClient();
    const user = useUser();
    const [ collectionName, setCollectionName ] = useState('');
    const [ collections, setCollections ] = useState([]);

    useEffect(() => {
        getProfile(user);
        fetchCollections(user, supabase)
        .then((collectionData) => {
            setCollections(collectionData);
        }) .catch ((error) => {
            console.log(error);
        });
            


    }, [session, supabase, user.id]);

     async function getProfile(user) {
        try {
            let { data, error, status } = await supabase
                .from('profiles')
                .select(`avatar`)
                .eq('id', user.id)
                .single();
    
                if (error & status !== 406) throw error;
    
                if (data) setAvatarUrl(data.avatar);
        } catch (error) {
            alert('Error loading user data!');
            console.log(error);
        }
    }
    

    return (
        <Container bg='#d9d9d9' height='30rem'> 
        <Heading>Account Details</Heading>
            <SimpleGrid columns={2} gap={5} marginTop='3rem' border='solid red 3px'>
                <VStack boxSize='3xs' border='solid green 3px'>
                    <Text>Email: {user.email}</Text>
                    <Text>{user.id}</Text>
                </VStack>
                <VStack border='solid blue 3px'>
                    <Heading fontSize='lg' textDecor='underline'>Collections List</Heading>
                    <UnorderedList>
                    {collections.length === 0 ? (
                        <Text>List is empty</Text>
                        ) : (
                        collections.map(collection => (
                            <ListItem  key={collection.id}>
                                <Text textAlign='left'>{collection.name}</Text>
                            </ListItem>
                        ))
                    )}
                    </UnorderedList>
                </VStack>
            </SimpleGrid>
            <Button marginTop='3rem' size='md' bg='#86c232' color='#000' _hover={{backgroundColor: '#61892f', color: '#fffeee', transition: 'all 0.3s ease 0s'}} onClick={() => supabase.auth.signOut()}>Logout</Button>
        </Container>
    )
}