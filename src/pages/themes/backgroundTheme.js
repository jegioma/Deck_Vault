import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'body': {
        height: '100vh',
        width: '100vw',
        backgroundSize: '300% 300%',
        backgroundImage: 'radial-gradient(#474B4F, #222629)',
        animation: 'gradient 5s linear infinite',
        '@keyframes gradient': {
          '0%': {
            backgroundPosition: '100% 0%',
          },
          '25%': {
            backgroundPosition: '100% 100%',
          },
          '50%': {
            backgroundPosition: '0% 100%',
          },
          '75%': {
            backgroundPosition: '0% 0%',
          },
          '100%': {
            backgroundPosition: '100% 0%',
          },
        },
      },
    },
  },
});

export default theme;
