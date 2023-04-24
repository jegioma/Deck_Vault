import { Auth } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Box } from '@chakra-ui/react';
import Account from '../components/account';

const Login = () => {
    const session = useSession();
    const supabase = useSupabaseClient();

    return (
        <>
            <Box bg='lightgrey' height='100vh' margin={-5} padding={0} border='10px solid lighgrey' >
                {
                    !session ? (
                        <Auth 
                            supabaseClient={supabase}
                            providers={['apple', 'google', 'discord']}
                            appearance={{
                                className: {
                                    button: 'custome-sign-in',
                                }, 
                                style: {
                                    button: {background: '#800000', color: '#ecf1f2', fontSize: '1.5em', padding: '3px', margin: 'auto', width: '70%', borderRadius: '10px'},
                                    label: {background: 'lightgrey', color: '#800000', width: '90%', marginLeft: '5%', padding: '3px'},
                                    input: {background: '#ecf1f2', color: '#000', width: '90%', marginLeft: '5%', padding: '3px'},
                                    container: {background: 'lightgrey', width: '80%', margin: 'auto', marginTop: '1em'},
                                    anchor: {color: '#800000'},
                                    divider: {background: '#800000', width: '80%', margin: 'auto', marginTop: '3%', height: '2x'},
                                }
                            }}
                        />
                    ) : (
                        <Account session={session} />
                    )
                }
            </Box>
        </>
    );
}

export default Login;