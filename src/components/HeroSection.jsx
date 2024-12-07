import { Box, Button, VStack, Text } from "@chakra-ui/react";
import { AnnouncementText, CoupleNames, QuoteText } from "./Typography";

export const HeroSection = ({ backgroundImage, hashtag }) => (
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
      <AnnouncementText color='brand.950' >
        Wedding Announcement
      </AnnouncementText>

      <CoupleNames color='white'>
        TIFFANY &<br />
        JARED
      </CoupleNames>

      {hashtag ? (
        <Text fontSize='3xl' color='brand.200' fontFamily='heading'>
          #{hashtag}
        </Text>
      ) : (
        <QuoteText>
          "Aku ingin mencintaimu dengan sederhana; dengan kata yang tak sempat
          diucapkan kayu kepada api yang menjadikannya abu. Aku ingin
          mencintaimu dengan sederhana; dengan isyarat yang tak sempat
          disampaikan awan kepada hujan yang menjadikannya tiada."
          <Text as='span' display='block' mt={2}>
            — Sapardi Djoko Damono
          </Text>
        </QuoteText>
      )}

      {hashtag && (
        <Button
          variant='outline'
          color='brand.100'
          borderColor='brand.100'
          _hover={{ bg: "brand.500", color: "white" }}
        >
          Open
        </Button>
      )}
    </VStack>
  </Box>
);
