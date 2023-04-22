import { Auth } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Box } from '@chakra-ui/react';
import Account from '../components/account';

const Login = () => {
    const session = useSession();
    const supabase = useSupabaseClient();

    return (
        <>
            <Box bg='lightgrey' height='100vh' margin={0} padding={0} border='10px solid lightgrey'>
                {
                    !session ? (
                        <Auth 
                            providers={['apple', 'google', 'discord']}
                            supabaseClient={supabase}
                            appearance={{
                                className: {
                                    button: 'custom-sign-in',
                                },
                                style: {
                                    button: {background: '#800000', color: '#ecf1f2', fontSize: '1.5em', padding: '3px', width: '73%', margin: 'auto', borderRadius: '10px'},
                                    label: {background: 'lightgrey', color: '#800000', width: '90%', margin: 'auto', padding: '3px', fontSize: '1.3em'},
                                    input: {background: '#ecf1f2', color: '#000', width: '90%', marginLeft: '5%', padding: '3px'},
                                    container: {background: 'lightgrey', width: '80%', margin: 'auto', marginTop: '1em'},
                                    anchor: {color: '#800000'},
                                    divider: {background: '#800000', width: '80%', margin: 'auto', marginTop: '3%', height: '2px'},
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