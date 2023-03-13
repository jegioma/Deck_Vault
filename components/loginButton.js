import { Button } from '@chakra-ui/react';
import styles from '../styles/loginBtn.module.css';

function LoginButton() {
    return (
        <Button  background='#B8336A' _hover={{ bg: '#B8336A', border: 'solid #e8f1f2 2px', transition: 'all 0.3s ease 0s'}} fontSize='xl' className={styles.btn}>LOGIN</Button>
    );
}

export default LoginButton;