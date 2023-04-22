import { Button } from '@chakra-ui/react';
import styles from '../styles/loginBtn.module.css';
import Link from 'next/link';

function LoginButton() {
    return (
        <Button href bg='darkred' color='white' _hover={{ bg: 'darkred', border: 'solid #e8f1f2 2px', transition: 'all 0.3s ease 0s'}} fontSize='lg' className={styles.btn}>
            <Link href='/login' >Login</Link>
        </Button>
    );
}

export default LoginButton;