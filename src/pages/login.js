import { Auth } from "@supabase/auth-ui-react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import loginTheme from "../components/themes/loginTheme";
import Account from "@/components/account";
import { Box } from '@chakra-ui/react'

export default function Login() {

    const supabaseClient = useSupabaseClient();
    const session = useSession();

    return (
        <Box width='100vw' height='100vh' padding='5rem 10rem'>
            {
                !session ? (
                    <Auth
                        redirectTo="http://localhost:3000/login"
                        supabaseClient={supabaseClient}
                        providers={['google', 'github']}
                        socialLayout="horizontal"
                        appearance={{
                            theme: loginTheme,
                            style: {
                                button: {
                                    border: 'solid 5px #86c232',
                                    color: 'white',
                                    fontWeight: 'bold'   
                                },
                                divider: {
                                    height: '5px',
                                    marginTop: '3rem'
                                } 
                            }
                        }}
                    />
                ) : (
                    <Account session={session} />
                )
            }
        </Box>
    )
}