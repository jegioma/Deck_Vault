import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Box, Container, Button, FormLabel, Input } from '@chakra-ui/react';
import Avatar from './avatar';
import styles from '../styles/account.module.css';

export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [avatar_url, setAvatarUrl] = useState(null)

  useEffect(() => {
    async function getProfile() {
      try {
        let { data, error, status } = await supabase
          .from('profiles')
          .select(`avatar_url`)
          .eq('id', user.id)
          .single()
  
        if (error && status !== 406) {
          throw error
        }
  
        if (data) {
          setAvatarUrl(data.avatar_url)
        }
      } catch (error) {
        alert('Error loading user data!')
        console.log(error)
      }
    }
    getProfile()
  }, [session, supabase, user.id])

  // async function getProfile() {
  //   try {
  //     let { data, error, status } = await supabase
  //       .from('profiles')
  //       .select(`avatar_url`)
  //       .eq('id', user.id)
  //       .single()

  //     if (error && status !== 406) {
  //       throw error
  //     }

  //     if (data) {
  //       setAvatarUrl(data.avatar_url)
  //     }
  //   } catch (error) {
  //     alert('Error loading user data!')
  //     console.log(error)
  //   }
  // }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      }

      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } 
  }

  return (
    <Box className={styles.container}>
      <Avatar
        uid={user.id}
        url={avatar_url}
        size={175}
        onUpload={(url) => {
          setAvatarUrl(url)
          updateProfile({ avatar_url: url})
        }}
      />
      <Container className={styles.form}>
        <FormLabel>Email</FormLabel>
        <Input type='text' id='email' value={session.user.email} disabled={false} />

        <Button className={styles.btn} bg='#800000' onClick={() => updateProfile({avatar_url})} >
          Update
        </Button>
        <Button className={styles.btn} bg='#800000' onClick={() => supabase.auth.signOut()}>
          Sign Out
        </Button>
      </Container>
    </Box>
  )
}