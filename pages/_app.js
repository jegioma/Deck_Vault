import { ChakraProvider } from "@chakra-ui/react";
import Header from "../components/header";
import styles from '../styles/global.css';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import supabase from "../utils/supabase";


function App({Component, pageProps}) {
    const [ supabaseClient ] = useState(() => createBrowserSupabaseClient());

    return (
            <ChakraProvider>
                <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
                    <Header />
                    <Component {...pageProps} styles={styles.background} />
                </SessionContextProvider>
            </ChakraProvider>
    );
}

export default App;