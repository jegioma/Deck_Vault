import "../styles/global.css";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "../components/header";
import styles from '../styles/global.css';


export default function App({Component, pageProps}) {
    return (
        <>
            <ChakraProvider>
                <Header />
                <main className={styles.background}>
                    <Component {...pageProps} />
                </main>
            </ChakraProvider>
        </>
    );
}