import {
    Box, Heading, BreadcrumbItem, Breadcrumb, BreadcrumbSeparator, Button, defineStyle, defineStyleConfig
} from '@chakra-ui/react'
import styles from '@/styles/header.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
    return (
        <Box className={styles.header} as='header' position='relative' backgroundColor='transparent' >

            <Heading className={styles.title} fontSize='8xl' fontFamily='RapidTech' >DECKVAULT</Heading>
            <Breadcrumb>
                <BreadcrumbItem className={styles.links}>
                    <Link href='/'>Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem className={styles.links}>
                    <Link href='/search'>Search</Link>
                </BreadcrumbItem>
                <BreadcrumbItem className={styles.links}>
                    <Link href='/vault'>Vault</Link>
                    <BreadcrumbSeparator/>
                </BreadcrumbItem>
            </Breadcrumb>

            <Link href='/login'>
                <Button bg='#86C232' color='#222629' size='lg' _hover={{ color: '#fffeee', backgroundColor: '#61892f', transition: 'all 0.3s ease 0s'}} margin='1rem'>
                    Account                    
                </Button>
            </Link>

        </Box>
    )
}