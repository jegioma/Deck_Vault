import Image from "next/image";
import styles from '../styles/header.module.css';
import { Breadcrumb, Heading, BreadcrumbItem, BreadcrumbSeparator } from '@chakra-ui/react'
import LoginButton from './loginButton.js';
import Link from "next/link";

function Header() {
  return (
    <header className={styles.header}>
      <Image src='/DVLogo.svg' alt="Deck Vault Logo" width={100} height={100} className={styles.logo}/>

      <Heading  fontFamily='RapidTech' fontSize='8xl' fontWeight='extrabold' className={styles.title}>DECK VAULT</Heading>
      <Breadcrumb fontSize='large'>
        <BreadcrumbItem className={styles.links}>
          <Link href='/'>Home</Link>
        </BreadcrumbItem>

        <BreadcrumbItem className={styles.links}>
          <Link href='/about'>About</Link>
        </BreadcrumbItem>

        <BreadcrumbItem className={styles.links}>
          <Link href='/cardSearch'>Search</Link>
        </BreadcrumbItem>

        <BreadcrumbItem className={styles.links}>
          <Link href='/collections'>Collections</Link>
        </BreadcrumbItem>

        <BreadcrumbItem className={styles.links}>
          <Link href='/decks'>Decks</Link>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
      </Breadcrumb>  

      <LoginButton />
    </header>
  );
}

export default Header;