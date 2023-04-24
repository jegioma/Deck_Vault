import React, { useEffect, useState } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { VStack, Box, Image, FormLabel } from '@chakra-ui/react'
import styles from '../styles/avatar.module.css'

export default function Avatar({ uid, url, size, onUpload }) {
  const supabase = useSupabaseClient()
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    async function downloadImage(path) {
        try {
          const { data, error } = await supabase.storage.from('avatars').download(path)
          if (error) {
            throw error
          }
          const url = URL.createObjectURL(data)
          setAvatarUrl(url)
        } catch (error) {
          console.log('Error downloading image: ', error)
        }
      }
    if (url) downloadImage(url)
  }, [url, supabase.storage])

//   async function downloadImage(path) {
//     try {
//       const { data, error } = await supabase.storage.from('avatars').download(path)
//       if (error) {
//         throw error
//       }
//       const url = URL.createObjectURL(data)
//       setAvatarUrl(url)
//     } catch (error) {
//       console.log('Error downloading image: ', error)
//     }
//   }

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
        <VStack boxSize='3xs'>
            {
                avatarUrl ? (
                    <Image
                        src={avatarUrl}
                        alt='Avatar'
                        className={styles.image}
                        style={{height: size, width: size}}
                    />
                ) : (
                    <Box className={styles.image} style={{height: size, width: size}} />
                )
            }
            <FormLabel htmlFor='single' bg='#800000' width={size} className={styles.btn}>
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