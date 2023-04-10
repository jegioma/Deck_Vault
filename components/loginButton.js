import { Button } from '@chakra-ui/react';
import styles from '../styles/loginBtn.module.css';

function LoginButton() {
    return (
        <Button  bg='#03C988' _hover={{ bg: '#03C988', border: 'solid #e8f1f2 2px', transition: 'all 0.3s ease 0s'}} fontSize='xl' className={styles.btn}>LOGIN</Button>
    );
}

export default LoginButton;