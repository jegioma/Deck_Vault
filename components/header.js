import Image from "next/image";
import styles from '../styles/header.module.css';
import { Breadcrumb, Heading, BreadcrumbItem, BreadcrumbSeparator, Button, defineStyle, defineStyleConfig } from '@chakra-ui/react'
import Link from "next/link";

function Header() {
  return (
    <header className={styles.header}>
      <Image src='/DVLogo.svg' alt="Deck Vault Logo" width={100} height={100} className={styles.logo}/>

      <Heading  fontFamily='RapidTech' fontSize='7xl' fontWeight='extrabold' className={styles.title}>DECK VAULT</Heading>
      <Breadcrumb fontSize='lg'>
        <BreadcrumbItem className={styles.links}>
          <Link href='/'>Home</Link>
        </BreadcrumbItem>

        <BreadcrumbItem className={styles.links}>
          <Link href='/construction'>About</Link>
        </BreadcrumbItem>

        <BreadcrumbItem className={styles.links}>
          <Link href='/cardSearch'>Search</Link>
        </BreadcrumbItem>

        <BreadcrumbItem className={styles.links}>
          <Link href='/construction'>Collections</Link>
        </BreadcrumbItem>

        <BreadcrumbItem className={styles.links}>
          <Link href='/construction'>Decks</Link>
          <BreadcrumbSeparator />
        </BreadcrumbItem>
      </Breadcrumb>  

      <Button bg='#800000' color='#ecf1f2' _hover={{ color: '#800000', backgroundColor: '#ecf1f2', border: 'solid #800000 3px', transition: 'all 0.3s ease 0s'}} fontSize='sm' margin='1%'>
        <Link href='/login'>ACCOUNT</Link>
      </Button>
    </header>
  );
}

export default Header;