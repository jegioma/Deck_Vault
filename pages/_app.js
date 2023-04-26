import { ChakraProvider } from "@chakra-ui/react";
import Header from "../components/header";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

function App({ Component, pageProps }) {
    const [ supabaseClient ] = useState(() => createBrowserSupabaseClient());

    return (
        <ChakraProvider>
            <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession} >
                <Header />
                <Component {...pageProps} />
            </SessionContextProvider> 
        </ChakraProvider>
    );
}

export default App;