import { useState, useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Box, FormLabel, Container, Input, Button } from '@chakra-ui/react';
import styles from '../styles/account.module.css';
import Avatar from './avatar';

export default function Account({ session }) {
    const supabase = useSupabaseClient();
    const user = useUser();
    const [loading, setLoading] = useState(true);
    const [avatar_url, setAvatarUrl] = useState(null);

    useEffect(() => {
        const getProfile = async () => {
          try {
            setLoading(true);
      
            let { data, error, status } = await supabase
              .from('profiles')
              .select(`avatar_url`)
              .eq('id', user.id)
              .single();
      
            if (error && status !== 406) {
              throw error;
            }
      
            if (data) {
              setAvatarUrl(data.avatar_url);
            }
          } catch (error) {
            alert('Error loading user data!');
            console.log(error);
          } finally {
            setLoading(false);
          }
        };
      
        getProfile();
      }, [session, supabase, user.id, setAvatarUrl]);
      
      const memoizedGetProfile = useCallback(getProfile, [session, supabase, user.id, setAvatarUrl]);
      
      useEffect(() => {
        memoizedGetProfile();
      }, [memoizedGetProfile]);
      
      
    // useEffect(() => {
    //     getProfile();     
    // }, [session, getProfile]);

    // async function getProfile() {
    //     try {
    //         setLoading(true);

    //         let { data, error, status } = await supabase
    //             .from('profiles')
    //             .select(`avatar_url`)
    //             .eq('id', user.id)
    //             .single();

    //         if (error && status !== 406) {
    //             throw error;
    //         }

    //         if (data) {
    //             setAvatarUrl(data.avatar_url);
    //         }

    //     } catch (error) {
    //         alert('Error loading user data!');
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    async function updateProfile({ avatar_url }) {
        try {
            setLoading(true);

            const updates = {
                id: user.id,
                avatar_url,
                updated_at: new Date().toISOString(),
            }

            let { error } = await supabase.from('profiles').upsert(updates);

            if (error) throw error;

            alert('Profile updated!');
        } catch (error) {
            alert('Error updating the data!');
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
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
                    <Input type='text' id='email' value={session.user.email} disabled />

                    <Button className={styles.update_btn} onClick={() => updateProfile({avatar_url})} disabled={loading} >
                        {loading ? 'Loading...' : 'Update'}
                    </Button>
                    <Button className={styles.signout_btn} onClick={() => supabase.auth.signOut()} >
                        Sign Out
                    </Button>
                </Container>
            </Box>
        </>
    );
}