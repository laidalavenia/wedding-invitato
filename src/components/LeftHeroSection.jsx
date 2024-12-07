import { Box, VStack, Text } from "@chakra-ui/react";
import { AnnouncementText, CoupleNames, QuoteText } from "./Typography";

export const LeftHeroSection = ({ backgroundImage }) => (
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
      <AnnouncementText color='brand.950' fontWeight='bold' mt={4}>
        Wedding Announcement
      </AnnouncementText>

      <CoupleNames color='white'>
        TIFFANY &<br />
        JARED
      </CoupleNames>

      <QuoteText>
        "Aku ingin mencintaimu dengan sederhana; dengan kata yang tak sempat
        diucapkan kayu kepada api yang menjadikannya abu. Aku ingin
        mencintaimu dengan sederhana; dengan isyarat yang tak sempat
        disampaikan awan kepada hujan yang menjadikannya tiada."
        <Text as='span' display='block' mt={2}>
          — Sapardi Djoko Damono
        </Text>
      </QuoteText>
    </VStack>
  </Box>
);