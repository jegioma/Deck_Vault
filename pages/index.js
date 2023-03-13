import { ChakraProvider } from '@chakra-ui/react';
import Header from '../components/header';
import Home from './home';
import Search from './search';
import styles from '../styles/index.module.css';

function Index() {
  return (
    <ChakraProvider >
      <div className={styles.backg} >
        <Header />
      {/* <Home /> */}
      <Search />
      </div>
      
    </ChakraProvider>
  );
}

export default Index;
