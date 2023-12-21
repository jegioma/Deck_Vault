import { CSSReset, ChakraProvider, Box } from '@chakra-ui/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'

import theme from '../components/themes/backgroundTheme';
import Header from '@/components/header';

  function MyApp({ Component, pageProps }) {

    const [ supabaseClient ] = useState(() => createPagesBrowserClient());

    return (
      <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
        <ChakraProvider theme={theme}>
            <CSSReset />
            <Box as='main' minHeight='100vh'minWidth='100vw' >
              <Header />
              <Component {...pageProps} supabaseClient={supabaseClient} />
              <SpeedInsights />
              <Analytics />
            </Box>
          </ChakraProvider>
      </SessionContextProvider>
    );
  }

export default MyApp;
