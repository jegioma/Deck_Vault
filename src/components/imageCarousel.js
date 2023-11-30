import {
  Container, Image
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export default function ImageSlider({ imageUrls }) {
  const [ currentImageIndex, setCurrentImageIndex ] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const nextIndex = prevIndex + 1 >= imageUrls.length ? 0 : prevIndex + 1;
        return nextIndex;
      });
    }, 4000);
    return () => {
      clearInterval(interval);
    }

  }, [imageUrls]);

  return (
    <Container>
      <Image 
        src={imageUrls[currentImageIndex]} 
        alt={`Image ${currentImageIndex}`}
        border='outset 10px #61892f'
        boxShadow= '2px 2px 5px 5px'
        width={400}
        height={550}
       />
    </Container>
  )
}