import { Center, Heading, Box } from "@chakra-ui/react";

export default function Custom404() {
    return (
        <Box bg='lightgrey' height='100vh'>
            <Center>
                <Heading color='#800000' size='4xl' marginTop='15%'>404 - Page not found</Heading>
            </Center>
        </Box>
    );
}