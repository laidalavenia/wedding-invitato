import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  VStack,
  Text,
  Button,
  Image,
  useToast,
  Flex,
  HStack,
  Input,
  Textarea,
  SimpleGrid,
} from "@chakra-ui/react";
import { AnnouncementText, CoupleNames } from "./Typography";
import { SLIDESHOW_IMAGES } from "../constants/images";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { CountdownTimer } from "./CountdownTimer";

export const RightHeroSection = ({ backgroundImage, hashtag }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const audioRef = useRef(null);
  const images = Object.values(SLIDESHOW_IMAGES);
  const toast = useToast();
  const visibleImages = images.slice(galleryIndex, galleryIndex + 3);

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

  const handlePrevImage = () => {
    setGalleryIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextImage = () => {
    setGalleryIndex((prev) => Math.min(images.length - 3, prev + 1));
  };

  return (
    <Box
      h='100vh'
      w='full'
      position='relative'
      onClick={handlePageClick}
      overflowY={isOpen ? "auto" : "hidden"}
      sx={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "gray.300",
          borderRadius: "24px",
        },
      }}
    >
      {/* Hero Section */}
      <Box
        h='100vh'
        w='full'
        position='relative'
        bgImage={
          isOpen
            ? `url(${images[currentImageIndex]})`
            : `url(${backgroundImage})`
        }
        bgSize='cover'
        bgPosition='center'
        transition='background-image 0.3s ease-in-out'
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
        <audio
          ref={audioRef}
          src='https://www.bensound.com/bensound-music/bensound-love.mp3'
          loop
          preload='auto'
        />
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
            JARED
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

          {!isOpen && hashtag && (
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

      {/* Welcome Section */}
      {isOpen && (
        <>
          <Box bg='white' w='full' p={12}>
            <VStack spacing={8} maxW='3xl' mx='auto'>
              <VStack spacing={6} textAlign='center'>
                <Text
                  color='gray.800'
                  fontSize='sm'
                  fontWeight='medium'
                  letterSpacing='wider'
                  textTransform='uppercase'
                >
                  Dear Mr-Mrs-Ms,
                  <br />
                  Family & Friends
                </Text>
                <Text
                  fontSize={{ base: "4xl", md: "5xl" }}
                  fontWeight='medium'
                  lineHeight='tight'
                  fontFamily='serif'
                >
                  Welcome to
                  <br />
                  Tiffany & Jared's
                  <br />
                  Wedding Website
                </Text>
                <Text
                  color='gray.600'
                  fontSize='md'
                  fontStyle='italic'
                  maxW='2xl'
                >
                  Together with joyful hearts and the grace of God, we joyfully
                  announce the upcoming of our marriage.
                </Text>
              </VStack>

              <Box w='full' position='relative'>
                <HStack spacing={4} w='full' position='relative'>
                  {visibleImages.map((image, index) => (
                    <Box
                      key={index}
                      flex='1'
                      h='400px'
                      position='relative'
                      overflow='hidden'
                    >
                      <Image
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        objectFit='cover'
                        w='full'
                        h='full'
                      />
                    </Box>
                  ))}
                </HStack>
                <Flex
                  position='absolute'
                  bottom={4}
                  right={4}
                  gap={2}
                  zIndex={2}
                >
                  <Button
                    size='sm'
                    variant='outline'
                    bg='white'
                    onClick={handlePrevImage}
                    disabled={galleryIndex === 0}
                    leftIcon={<ChevronLeftIcon />}
                  >
                    Previous
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    bg='white'
                    onClick={handleNextImage}
                    disabled={galleryIndex >= images.length - 3}
                    rightIcon={<ChevronRightIcon />}
                  >
                    Next
                  </Button>
                </Flex>
              </Box>
            </VStack>
          </Box>

          {/* Meet the Bride & Groom Section */}
          <Box
            bg='white'
            w='full'
            p={12}
            borderTop='1px'
            borderColor='gray.100'
          >
            <VStack spacing={12} maxW='2xl' mx='auto'>
              <Text
                fontSize='sm'
                fontWeight='medium'
                letterSpacing='wider'
                textTransform='uppercase'
              >
                Meet the Bride & Groom
              </Text>

              <Box position='relative' w='full' maxW='md' mx='auto'>
                <Image
                  src={images[0]} // Using the first image from the slideshow
                  alt='Bride and Groom'
                  w='full'
                  h='500px'
                  objectFit='cover'
                  filter='grayscale(100%)'
                />
              </Box>

              <VStack spacing={8} textAlign='center' w='full'>
                <VStack spacing={2}>
                  <Text fontSize='3xl' fontFamily='serif'>
                    TIFFANY SMITH
                  </Text>
                  <Text color='gray.600'>@tiffanyinvitato</Text>
                  <Text fontSize='sm' fontStyle='italic' color='gray.600'>
                    The Daughter of
                    <br />
                    Mr. Smith & Mrs. Bellyna
                  </Text>
                </VStack>

                <VStack spacing={2}>
                  <Text fontSize='3xl' fontFamily='serif'>
                    ROBIN JARED LUCAS
                  </Text>
                  <Text color='gray.600'>@jaredinvitato</Text>
                  <Text fontSize='sm' fontStyle='italic' color='gray.600'>
                    The Son of
                    <br />
                    Mr. Lucas & Mrs. Anita
                  </Text>
                </VStack>
              </VStack>
            </VStack>
          </Box>

          {/* Quran Quote Section */}
          <Box bg='rgb(241, 236, 233)' w='full' p={16} textAlign='center'>
            <VStack spacing={6} maxW='3xl' mx='auto'>
              <Text
                fontSize='xl'
                fontStyle='italic'
                color='gray.700'
                lineHeight='relaxed'
              >
                "And of His signs is that He created for you from yourselves
                mates that you may find tranquility in them, and He placed
                between you affection and mercy. Indeed in that are signs for a
                people who give thought."
              </Text>
              <Text fontSize='md' fontWeight='medium' color='gray.600'>
                - Q.S. AR-RUM: 21
              </Text>
            </VStack>
          </Box>

          {/* Place & Time Section */}
          <Box bg='white' w='full' p={16}>
            <VStack spacing={8} maxW='2xl' mx='auto'>
              <Text
                fontSize='sm'
                fontWeight='medium'
                letterSpacing='wider'
                textTransform='uppercase'
              >
                Place & Time
              </Text>

              <Text
                fontSize='4xl'
                fontFamily='serif'
                fontWeight='medium'
                align='center'
                justify='center'
              >
                Holy Matrimony
              </Text>

              <VStack spacing={2} textAlign='center'>
                <Text fontSize='lg'>Date: Monday, 26 February 2024</Text>
                <Text fontSize='lg'>Time: 10.00 WIB</Text>
              </VStack>
            </VStack>
          </Box>

          {/* Wedding Gift Section */}
          <Box position='relative' h='400px' w='full'>
            <Image
              src={images[0]}
              alt='Wedding Gift'
              w='full'
              h='full'
              objectFit='cover'
              filter='grayscale(100%)'
            />
            <Box
              position='absolute'
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg='blackAlpha.500'
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              gap={4}
            >
              <Text
                color='white'
                fontSize='3xl'
                fontFamily='serif'
                fontWeight='medium'
              >
                Wedding Gift
              </Text>
              <Button
                variant='outline'
                color='white'
                borderColor='white'
                _hover={{
                  bg: "whiteAlpha.200",
                }}
              >
                Send Gift
              </Button>
            </Box>
          </Box>
          <Box position='relative' h='400px' w='full'>
            <Image
              src={images[3]}
              alt='Wedding Gift'
              w='full'
              h='full'
              objectFit='cover'
              filter='grayscale(100%)'
            />
            <Box
              position='absolute'
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg='blackAlpha.500'
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              gap={4}
            >
              <Text
                color='white'
                fontSize='3xl'
                fontFamily='serif'
                fontWeight='medium'
              >
                Live Streaming
              </Text>
              <Button
                variant='outline'
                color='white'
                borderColor='white'
                _hover={{
                  bg: "whiteAlpha.200",
                }}
              >
                Open the Youtube
              </Button>
            </Box>
          </Box>
          <Box bg='white' w='full' p={16}>
            <VStack spacing={8} maxW='2xl' mx='auto' textAlign='center'>
              <Text
                fontSize='4xl'
                fontFamily='serif'
                fontWeight='medium'
                lineHeight='tight'
              >
                Tiffany & Jared are
                <br />
                Getting Married!
              </Text>

              <Box position='relative' w='full' maxW='md' mx='auto'>
                <Image
                  src={images[2]}
                  alt='Couple in field'
                  w='full'
                  h='500px'
                  objectFit='cover'
                />
              </Box>

              <Text
                fontSize='sm'
                fontWeight='bold'
                textTransform='uppercase'
                textDecoration='underline'
              >
                WATCH OUR VIDEO
              </Text>

              <Text fontSize='lg' fontWeight='medium'>
                9 APRIL 2018
              </Text>

              <Text
                color='gray.600'
                fontSize='md'
                fontStyle='italic'
                maxW='xl'
                lineHeight='relaxed'
                textAlign='center'
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                sollicitudin malesuada sapien, sit amet sodales ex sagittis
                quis. Suspendisse facilisis mi volupat urna pulvinar, quis
                aliquet dui lobortis. Sed egestas consequat risus, ac efficiunt
                accumsan.
              </Text>

              <HStack spacing={4} pt={4}>
                <Button
                  variant='outline'
                  size='sm'
                  leftIcon={<ChevronLeftIcon />}
                >
                  Previous
                </Button>
                <Button
                  variant='outline'
                  size='sm'
                  rightIcon={<ChevronRightIcon />}
                >
                  Next
                </Button>
              </HStack>
            </VStack>
          </Box>
          {/* Prayers & Wishes Section */}
          <Box bg='white' w='full' p={16}>
            <VStack spacing={8} maxW='2xl' mx='auto' textAlign='center'>
              <Text
                fontSize='4xl'
                fontFamily='serif'
                fontWeight='medium'
                lineHeight='tight'
              >
                Prayers & Wishes
              </Text>

              <Text color='gray.700' fontSize='md'>
                Please leave your sincere prayers and wishes to us and our
                family:
              </Text>

              <VStack as='form' spacing={4} w='full'>
                <Input
                  placeholder='Name'
                  size='lg'
                  bg='white'
                  borderColor='gray.300'
                />
                <Input
                  placeholder='The Relationship'
                  size='lg'
                  bg='white'
                  borderColor='gray.300'
                />
                <Textarea
                  placeholder='Prayers & Wishes'
                  size='lg'
                  bg='white'
                  borderColor='gray.300'
                  rows={4}
                />
                <Button
                  bg='rgb(241, 236, 233)'
                  color='gray.700'
                  size='lg'
                  w='full'
                  maxW='200px'
                  _hover={{
                    bg: "rgb(231, 226, 223)",
                  }}
                >
                  Submit
                </Button>
              </VStack>

              <Text
                color='gray.600'
                fontSize='md'
                fontStyle='italic'
                maxW='xl'
                pt={8}
              >
                It will be a joy for us if you are still willing to give your
                blessing from afar. Thank you for all the words, prayers, and
                attention given.
              </Text>

              <CountdownTimer targetDate={new Date("2025-02-26T10:00:00")} />
            </VStack>
          </Box>

          {/* Our Sincere Section */}
          <Box bg='white' w='full' p={16}>
            {/* <VStack spacing={12} maxW='2xl' mx='auto' textAlign='center'> */}
            <VStack spacing={4}>
              <Text
                fontSize='sm'
                fontWeight='medium'
                letterSpacing='wider'
                textTransform='uppercase'
              >
                OUR SINCERE,
              </Text>

              <Text
                fontSize='3xl'
                fontFamily='serif'
                fontWeight='medium'
                align='center'
                justify='center'
              >
                TIFFANY & JARED
              </Text>

              <Text fontSize='lg' fontStyle='italic' color='gray.600'>
                #TImetoshaRE
              </Text>
              {/* </VStack> */}

              <SimpleGrid columns={3} spacing={4} w='full'>
                {[images[0], images[1], images[2]].map((image, index) => (
                  <Box key={index} h='200px' overflow='hidden'>
                    <Image
                      src={image}
                      alt={`Couple photo ${index + 1}`}
                      w='full'
                      h='full'
                      objectFit='cover'
                      filter='grayscale(100%)'
                    />
                  </Box>
                ))}
              </SimpleGrid>

              <VStack spacing={1} pt={8} borderTop='1px' borderColor='gray.200'>
                <Text fontSize='lg' fontFamily='serif'>
                  Invitato
                </Text>
                <Text fontSize='sm' color='gray.600'>
                  Created with Love by Invitato
                </Text>
                <Text
                  fontSize='sm'
                  color='gray.600'
                  align='center'
                  justify='center'
                >
                  Song by So Far, So Good - Don Williams
                </Text>
                <Text
                  fontSize='sm'
                  color='gray.600'
                  align='center'
                  justify='center'
                >
                  © 2024 Tiffany & Jared. All Rights Reserved
                </Text>
              </VStack>
            </VStack>
          </Box>
        </>
      )}
    </Box>
  );
};
