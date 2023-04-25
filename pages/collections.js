import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';

export default function Collections({ onClose, onAddToCollection }) {
  const [selectedCollection, setSelectedCollection] = useState('');

  const handleAddToCollection = () => {
    onAddToCollection(selectedCollection);
    onClose();
  };

  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Choose a collection</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Collection</FormLabel>
            <Select
              placeholder="Select a collection"
              value={selectedCollection}
              onChange={(event) => setSelectedCollection(event.target.value)}
            >
              <option value="collection1">Collection 1</option>
              <option value="collection2">Collection 2</option>
              <option value="collection3">Collection 3</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddToCollection}>
            Add to Collection
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
