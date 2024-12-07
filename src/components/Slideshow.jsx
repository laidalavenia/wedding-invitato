import React, { useEffect, useState } from "react";
import { Box, Image } from "@chakra-ui/react";
import { SLIDESHOW_IMAGES } from "../constants/images";

export const Slideshow = ({ isVisible }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = Object.values(SLIDESHOW_IMAGES);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible, images.length]);

  if (!isVisible) return null;

  return (
    <Box
      position='absolute'
      top={0}
      right={0}
      bottom={0}
      width='50%'
      zIndex={10}
      bg='black'
      overflow='hidden'
    >
      <Image
        src={images[currentImageIndex]}
        alt={`Slideshow image ${currentImageIndex + 1}`}
        w='100%'
        h='100%'
        objectFit='cover'
        transition='opacity 0.3s ease-in-out'
      />
    </Box>
  );
};
