import {
    HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper,
    Menu, MenuButton, MenuItem, MenuList, MenuItemOption, MenuGroup, MenuDivider, MenuOptionGroup, Button, useToast
} from '@chakra-ui/react'
import { ChevronRightIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { useState } from 'react'

export default function CollectionStepper({ card}) {

    const [ cardAmount, setCardAmount ] = useState(0);
    const [ addToCollection, setAddToCollection ] = useState('');

    const addCardTo = (card) => {
            
    }


    return (
        <HStack margin={0} padding={0} spacing={10} marginTop='2rem'>
            <NumberInput size='md' maxW={24} defaultValue={0} min={0} bg='#d9d9d9'>
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper bg='#86c232'/>
                    <NumberDecrementStepper bg='#86c232'/>
                </NumberInputStepper>
            </NumberInput>
            <ArrowRightIcon color='#fffeee' />
            <Menu>
                <MenuButton bg='#61892f'  _hover={{backgroundColor: '#61892f', color: '#fffeee', transition: 'all 0.3s ease 0s'}} as={Button} rightIcon={<ChevronRightIcon />} >Add Card</MenuButton>
                <MenuList bg='#222629'>
                    <MenuItem bg='#222629' color='#fffeee' _hover={{backgroundColor: '#61892f'}}>Collection 1</MenuItem>
                    <MenuItem bg='#222629' color='#fffeee' _hover={{backgroundColor: '#61892f'}}>Collection 2</MenuItem>
                    <MenuItem bg='#222629' color='#fffeee' _hover={{backgroundColor: '#61892f'}}>Collection 3</MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    )
}