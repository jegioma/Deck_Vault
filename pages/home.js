import { Box, Container, Image, Text } from '@chakra-ui/react';
import styles from '../styles/home.module.css';

function Home() {
    return (
        <>
            <Box className={styles.container}>
                    <Image src='/backgroundArt/utopia.png' className={styles.img_ctn} alt="Cover Image" />

         
                <Container className={styles.text_ctn}>
                    <Text>
                        Keep track of your physical colleciton digitally
                    </Text>
                </Container>
            </Box>
        </>
    );
}

export default Home;