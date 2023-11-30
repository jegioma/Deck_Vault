import {
    Stack, HStack, Text, Spacer, IconButton, Tooltip,
    useToast
} from '@chakra-ui/react';
import LaunchIcon from '@mui/icons-material/Launch';
import ClearIcon from '@mui/icons-material/Clear';
import { useUser } from '@supabase/auth-helpers-react';
import { deleteCard, refreshCurrentCollection } from '@/pages/api/cardData/collectionAPI';

export default function CollectionDisplay({ collection, id, supabase }) {
    const user = useUser();
    const toast = useToast();    

    return (
        <Stack borderRadius={15} padding={5} border='ridge black 5px' maxHeight='40rem' overflowY='auto'>
            {collection.card_ids && collection.card_ids.map((cardId, index) => (
                <HStack key={index} width='100%' bg='#d9d9d9' height='3rem' padding={3}>
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
                        />
                    </Tooltip>
                    <Tooltip label='Delete Card' aria-label='A tooltip'>
                        <IconButton
                            onClick={() => {
                                deleteCard(cardId, id, user, supabase);
                                toast({
                                    title: 'Card deleted from collection',
                                    status: 'success',
                                    position: 'top-right',
                                    duration: 2000,
                                })
                                refreshCurrentCollection(id, supabase);
                            }}
                            icon={<ClearIcon />}
                            bg='#C00000'
                            _hover={{ backgroundColor: '#880808', color: '#fffeee' }}
                            size='xs'
                        />
                    </Tooltip>
                </HStack>
            ))}
        </Stack>
    )
}
