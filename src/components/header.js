import {
    Box, Heading, BreadcrumbItem, Breadcrumb, BreadcrumbSeparator, Button, defineStyle, defineStyleConfig
} from '@chakra-ui/react'
import styles from '@/styles/header.module.css'
import Link from 'next/link'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'

export default function Header() {
    const user = useUser();
    const supabase = useSupabaseClient();

    return (
        <Box as='header' position='relative' backgroundColor='transparent' display='flex' alignItems='center' width='100vw' margin={0}>

            <Heading color='#61892f' marginRight='auto' marginLeft='2rem' fontWeight={700} fontSize='8xl' fontFamily='RapidTech'>DECKVAULT</Heading>
                {
                    user ? (
                        <Breadcrumb>          
                            <BreadcrumbItem className={styles.links}>
                                <Link href='/'>Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem className={styles.links}>
                                <Link href='/search'>Search</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem className={styles.links}>
                                <Link href='/vault'>Vault</Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem className={styles.links}>
                                <Link href='/login'>Account</Link>
                                <BreadcrumbSeparator/>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    ) : (
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

                    )
                }
            {
                user ? (
                    <Button 
                        bg='#86C232' 
                        color='#222629' 
                        size='lg' 
                        _hover={{ color: '#fffeee', backgroundColor: '#61892f', transition: 'all 0.3s ease 0s'}} margin='1rem'
                        onClick={() => supabase.auth.signOut()}
                        >Logout</Button>
                ) : (
                    <Link href='/login'>
                        <Button 
                            bg='#86C232' 
                            color='#222629' 
                            size='lg' 
                            _hover={{ color: '#fffeee', backgroundColor: '#61892f', transition: 'all 0.3s ease 0s'}} margin='1rem'
                        >Login</Button>
                    </Link>
                )
            }
        </Box>
    )
}