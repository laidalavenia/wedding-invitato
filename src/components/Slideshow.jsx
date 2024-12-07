import React, { useEffect, useState } from "react";
import { Box, Image, keyframes } from "@chakra-ui/react";
import { SLIDESHOW_IMAGES } from "../constants/images";

export const Slideshow = ({ isVisible }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previousImageIndex, setPreviousImageIndex] = useState(null);
  const images = Object.values(SLIDESHOW_IMAGES);

  // Keyframes for zoom in and out animation
  const zoomInOut = keyframes`
    0% { 
      transform: scale(1);
      opacity: 1;
    }
    50% { 
      transform: scale(1.2);
      opacity: 0.8;
    }
    100% { 
      transform: scale(1);
      opacity: 1;
    }
  `;

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setPreviousImageIndex(currentImageIndex);
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 6000);

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
      position='relative'
    >
      {/* Previous image (fading out) */}
      {previousImageIndex !== null && (
        <Image
          key={`prev-${previousImageIndex}`}
          src={images[previousImageIndex]}
          alt={`Previous slideshow image ${previousImageIndex + 1}`}
          position='absolute'
          top={0}
          left={0}
          w='100%'
          h='100%'
          objectFit='cover'
          opacity={0}
          transition='opacity 1.5s ease-in-out'
          animation={`${zoomInOut} 3s ease-in-out`}
        />
      )}

      {/* Current image */}
      <Image
        key={currentImageIndex}
        src={images[currentImageIndex]}
        alt={`Slideshow image ${currentImageIndex + 1}`}
        w='100%'
        h='100%'
        objectFit='cover'
        transition='opacity 1.5s ease-in-out'
        animation={`${zoomInOut} 3s ease-in-out`}
        position='absolute'
        top={0}
        left={0}
      />
    </Box>
  );
};
