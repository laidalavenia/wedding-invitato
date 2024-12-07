import { Text, Heading } from "@chakra-ui/react";

export const AnnouncementText = (props) => (
  <Text
    textTransform='uppercase'
    letterSpacing='wider'
    fontSize='sm'
    fontWeight='medium'
    {...props}
  />
);

export const CoupleNames = (props) => (
  <Heading
    as='h1'
    fontSize={{ base: "4xl", md: "6xl" }}
    fontWeight='normal'
    lineHeight='1.2'
    {...props}
  />
);

export const QuoteText = (props) => (
  <Text
    fontSize={{ base: "md", md: "lg" }}
    fontStyle='italic'
    color='whiteAlpha.900'
    {...props}
  />
);
