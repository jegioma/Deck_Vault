import { useEffect, useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
    Image, FormLabel, Box,  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton
} from '@chakra-ui/react';

export default function Avatar({ uid, size, onAvatarSelect, url }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const supabase = useSupabaseClient();
    const [ avatarUrl, setAvatarUrl ] = useState(null);
    const [ uploading, setUploading ] = useState(false);

    // useEffect(() => {
    //     async function downloadImage(path) {
    //         try {
    //             const { data, error } = await supabase.storage.from('avatar').download(path);
    //             if (error) {throw error};

    //             const url = URL.createObjectURL(data);
    //             setAvatarUrl(url);
    //         } catch (error) {
    //             alert('Error downloading image!');
    //             console.log(error);
    //         }
    //     }

    //     if (url) downloadImage(url);
    // }, [url, supabase]);
    useEffect(() => {
      async function downloadImage(path) {
          try {
              const { data, error } = await supabase.storage.from('avatar').download(path);
              if (error) { throw error; }

              const imageUrl = URL.createObjectURL(data);
              setAvatarUrl(imageUrl);
          } catch (error) {
              alert('Error downloading image!');
              console.log(error);
          }
      }

      if (url) downloadImage(url);
  }, [url, supabase]);

    async function fetchAvatarPaths() {
        try {
          const { data, error } = await supabase.storage.from('avatar').list();
      
          if (error) {
            throw error;
          }
      
          // Extract the paths from the data
          const paths = data.map(item => item.name);
          return paths;
        } catch (error) {
          console.error("Error fetching avatar paths:", error);
          return [];
        }
      }
      
      // Usage example
      const avatarPaths = fetchAvatarPaths();
      console.log("Avatar Paths:", avatarPaths);

    const openModal = () => {
        setIsModalOpen(true);
      };
      
      const closeModal = () => {
        setIsModalOpen(false);
      };
      

    const selectPresetAvatar = async (path) => {
        try {
          // Fetch the selected preset avatar image
          const { data, error } = await supabase.storage.from('avatar').download(path);
    
          if (error) {
            throw error;
          }
    
          const url = URL.createObjectURL(data);
          onAvatarSelect(url); // Pass the selected avatar URL to the parent component
        } catch (error) {
          alert('Error selecting avatar!');
          console.log(error);
        }
      }

    return (
        <>
            {
                avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt='Avatar'
                        className={styles.image}
                        style={{height: size, width: size}}
                    />
                ) : (
                    <Box bg='#000' border='solid red 3px' width={50} height={50} />
                )
            }
            <FormLabel
                htmlFor='single'
                bg='#800000'
                width={size}
                textAlign='center'
                className={styles.btn}
                onClick={openModal}
                >
                {uploading ? 'Uploading...' : 'Upload'}
                </FormLabel>

                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Select an Avatar</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                        {/* Display preset avatar options */}
                        <Image
                            src="/path_to_preset_avatar_1.png"
                            alt='Avatar 1'
                            className={styles.image}
                            style={{ height: size, width: size }}
                            onClick={() => {
                            selectPresetAvatar('path_to_preset_avatar_1.png');
                            closeModal(); // Close the modal when an avatar is selected
                            }}
                        />
                        {/* Repeat for other preset avatars */}
                        </ModalBody>
                        <ModalFooter>
                        {/* Add any additional modal buttons or actions here */}
                        </ModalFooter>
                    </ModalContent>
                    </Modal>

        </>
    )
}
