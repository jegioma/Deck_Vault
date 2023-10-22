// import { 
//   VStack, Box, Image, FormLabel 
// } from '@chakra-ui/react'
// import React, { useEffect, useState } from 'react'
// import { useSupabaseClient } from '@supabase/auth-helpers-react'

// export default function Avatar({ uid, url, size, onUpload }) {
//   const supabase = useSupabaseClient()
//   const [avatarUrl, setAvatarUrl] = useState(null)
//   const [uploading, setUploading] = useState(false)

//   useEffect(() => {
//     async function downloadImage(path) {
//         try {
//           const { data, error } = await supabase.storage.from('avatar').download(path)
//           if (error) {
//             throw error
//           }
//           const url = URL.createObjectURL(data)
//           setAvatarUrl(url)
//         } catch (error) {
//           console.log('Error downloading image: ', error)
//         }
//       }
//     if (url) downloadImage(url)
//   }, [url, supabase.storage])

//   const uploadAvatar = async (event) => {
//     try {
//       setUploading(true)

//       if (!event.target.files || event.target.files.length === 0) {
//         throw new Error('You must select an image to upload.')
//       }

//       const file = event.target.files[0]
//       const fileExt = file.name.split('.').pop()
//       const fileName = `${uid}.${fileExt}`
//       const filePath = `${fileName}`

//       let { error: uploadError } = await supabase.storage
//         .from('avatars')
//         .upload(filePath, file, { upsert: true })

//       if (uploadError) {
//         throw uploadError
//       }

//       onUpload(filePath)
//     } catch (error) {
//       alert('Error uploading avatar!')
//       console.log(error)
//     } finally {
//       setUploading(false)
//     }
//   }
import { 
  VStack, Box, Image, FormLabel 
} from '@chakra-ui/react'
import React, { useEffect, useState, useCallback } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

export default function Avatar({ uid, url, size, onUpload }) {
  const supabase = useSupabaseClient()
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  const downloadImage = useCallback(async (path) => {
    try {
      const { data, error } = await supabase.storage.from('avatar').download(path)
      if (error) {
        throw error
      }
      const imageUrl = URL.createObjectURL(data)
      setAvatarUrl(imageUrl)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }, [supabase.storage])

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url, downloadImage])

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${uid}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

      if (uploadError) {
        throw uploadError
      }

      onUpload(filePath)
    } catch (error) {
      alert('Error uploading avatar!')
      console.log(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
        <VStack boxSize='3xs'  marginLeft={-5}>
            {
                avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt='Avatar'
                        style={{height: size, width: size}}
                    />
                ) : (
                    <Box style={{height: size, width: size}} />
                )
            }
            <FormLabel htmlFor='single' bg='#800000' width={size} textAlign='center'>
                {uploading ? 'Uploading...' : 'Upload'}
            </FormLabel>
            <input 
                style={{
                    visibility: 'hidden',
                    position: 'absolute',
                }}
                type='file'
                id='single'
                accept='image/*'
                onChange={uploadAvatar}
                disable={uploading}
            />
        </VStack>   
    </>
  )
}