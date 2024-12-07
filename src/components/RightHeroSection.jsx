import React, { useState, useRef, useEffect } from "react";
import { Box, VStack, Text, Button, Image, useToast } from "@chakra-ui/react";
import { AnnouncementText, CoupleNames } from "./Typography";
import { SLIDESHOW_IMAGES } from "../constants/images";

export const RightHeroSection = ({ backgroundImage, hashtag }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const audioRef = useRef(null);
  const images = Object.values(SLIDESHOW_IMAGES);
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isOpen, images.length]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      console.log("Audio element properties after load:", {
        src: audioRef.current.src,
        readyState: audioRef.current.readyState,
        error: audioRef.current.error,
      });
    }
  }, []);

  const handleOpenClick = async () => {
    setIsOpen(true);
    if (audioRef.current) {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error("Audio playback failed:", error.name, error.message);
        toast({
          title: "Audio playback failed",
          description: `Error: ${error.message}. Please ensure audio autoplay is enabled in your browser settings.`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handlePageClick = () => {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch((error) => {
        console.error("Audio playback failed:", error);
      });
    }
  };

  if (isOpen) {
    return (
      <Box h='100vh' w='full' position='relative' onClick={handlePageClick}>
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
  }

  return (
    <Box
      h='100vh'
      w='full'
      position='relative'
      bgImage={`url(${backgroundImage})`}
      bgSize='cover'
      bgPosition='center'
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: "blackAlpha.500",
        zIndex: 1,
      }}
    >
      <audio ref={audioRef} src='/audio/wedding.mp3' loop preload='auto' />
      <VStack
        position='relative'
        zIndex={2}
        h='full'
        justify='center'
        align='flex-start'
        spacing={8}
        px={{ base: 6, md: 12 }}
        maxW='xl'
      >
        <AnnouncementText
          color='brand.950'
          fontWeight='bold'
          fontSize={{ base: "3xl", md: "2xl" }}
        >
          Wedding Announcement
        </AnnouncementText>

        <CoupleNames color='white' fontSize={{ base: "3xl", md: "5xl" }}>
          TIFFANY &<br />
          JAREDA
        </CoupleNames>

        {hashtag && (
          <Text
            fontSize={{ base: "2xl", md: "3xl" }}
            color='brand.200'
            fontFamily='heading'
          >
            #{hashtag}
          </Text>
        )}

        {hashtag && (
          <Button
            variant='solid'
            bg='white'
            color='black'
            _hover={{ bg: "brand.100", color: "black" }}
            fontSize={{ base: "md", md: "lg" }}
            onClick={handleOpenClick}
          >
            Open
          </Button>
        )}
      </VStack>
    </Box>
  );
};
