import Image from "next/image";
import styles from '../styles/header.module.css';
import { Breadcrumb, BreadcrumbLink, Heading, BreadcrumbItem, BreadcrumbSeparator } from '@chakra-ui/react'
import LoginButton from './loginButton.js';

function Header() {
  return (
    <header className={styles.header}>
      <Image src='/DVLogo.svg' alt="Deck Vault Logo" width={100} height={100} className={styles.logo}/>

      <Heading fontFamily='batmanFO' size='xl' className={styles.title}>DECK VAULT</Heading>

      <Breadcrumb fontSize='large'>
        <BreadcrumbItem className={styles.links}>
          <BreadcrumbLink href="/index" >HOME</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem className={styles.links}>
          <BreadcrumbLink href="/search" >SEARCH</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem className={styles.links}>
          <BreadcrumbLink href="/collections" >COLLECTIONS</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem className={styles.links}>
          <BreadcrumbLink href="/decks" >DECKS</BreadcrumbLink>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
      </Breadcrumb>  

      <LoginButton />
    </header>
  );
}

export default Header;