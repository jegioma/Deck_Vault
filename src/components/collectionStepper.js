import {
    HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper,
    Menu, MenuButton, MenuItem, MenuList, Button, useToast
} from '@chakra-ui/react';
import MenuIcon from '@mui/icons-material/Menu';
import { addCardToCollection, fetchCollections } from '@/pages/api/cardData/collectionAPI';
import { useEffect, useState } from 'react'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';

export default function CollectionStepper({ card, toast }) {
    const [ copyCount, setCopyCount ] = useState(1);
    const [ collections, setCollections ] = useState([]);
    const supabase = useSupabaseClient();
    const user = useUser();

    useEffect(() => {
        fetchCollections(user, supabase)
            .then((collectionData) => {
                setCollections(collectionData);
            }).catch((error) => {
                console.log(error);
            })
    }, [user, supabase])

    const handleCopyCountChange = (value) => {
        setCopyCount(value);
    }

    return (
        <HStack margin={0} padding={0} spacing={10} marginTop='2rem'>
            <NumberInput size='md' maxW={24} defaultValue={1} min={1} bg='#d9d9d9' value={copyCount} onChange={handleCopyCountChange}>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper bg='#86c232'/>
                    <NumberDecrementStepper bg='#86c232'/>
                </NumberInputStepper>
            </NumberInput>
            <Menu>
                <MenuButton 
                    bg='#86c232' 
                    _hover={{backgroundColor: '#61892f', color: '#fffeee', transition: 'all 0.3s ease 0s'}} 
                    as={Button} 
                    rightIcon={<MenuIcon />} 
                >Add To</MenuButton>
                <MenuList bg='#222629'>
                    {
                        collections.map(collectionItem => (
                            <MenuItem 
                                key={collectionItem.id} 
                                bg='#222629' color='#fffeee' 
                                _hover={{backgroundColor: '#61892f'}}
                                onClick={() => {
                                    const collection = (collectionItem.id)
                                    addCardToCollection(card, collection, copyCount, supabase);
                                    toast({
                                        title: 'Card added to collection',
                                        status: 'success',
                                        position: 'top-right',
                                        duration: 2000,
                                    });
                                }}
                            >{collectionItem.name}</MenuItem>
                        ))
                    }
                </MenuList>
            </Menu>
        </HStack>
    )
}