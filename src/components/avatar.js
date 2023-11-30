import { 
    Image, Container, Button, Input, Stack, Flex, Tooltip
} from '@chakra-ui/react';
import { useEffect, useState } from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import { Spinner } from '@chakra-ui/react'
import { downloadImage } from '@/pages/api/cardData/accountAPI';
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Avatar({ uid, url, size, onUpload }) {
  const supabase = useSupabaseClient();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) {
      downloadImage(url, supabase)
        .then(url => setAvatarUrl(url));
    }
   }, [url, supabase]);

  const uploadImage = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const filePath = `${uid}-${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage.from('avatar').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // Update the user's profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar: filePath })
        .eq('id', uid);

      if (updateError) {
        console.log('Error updating profile: ', updateError);
      }

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading avatar!')
    } finally {
      setUploading(false)
    }
  }

  return (
    <Stack>
      {avatarUrl ? (
        <Image
          bg='#222629'
          borderRadius={15}
          margin={0}
          width={size}
          height={size}
          src={avatarUrl}
          alt="Avatar"
          style={{ height: size, width: size }}
        />
      ) : (
        <Container height={size} width={size} />
      )}
      <Flex width={size}>
        <Tooltip label='Upload Avatar Image' aria-label='A tooltip'>
          <Button
            bg='#86C232' 
            color='#222629' 
            size='xs' 
            _hover={{ color: '#fffeee', backgroundColor: '#61892f', transition: 'all 0.3s ease 0s'}} 
            margin='auto'
            isLoading={uploading}
            aria-label="Upload"
            as='label'
            htmlFor='single'
            rightIcon={uploading ? <Spinner /> : <UploadIcon />}
          >{uploading ? 'Loading' : 'Upload'}</Button>
        </Tooltip>
        <Input
          id="single"
          type="file"
          accept="image/*"
          onChange={(event) => uploadImage(event)}
          isDisabled={uploading}
          display="none"
        />
      </Flex>
    </Stack>
  )
}