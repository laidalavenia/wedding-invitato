import { ChakraProvider } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { SplitLayout } from "../src/components/SplitLayout";
import { LeftHeroSection } from "../src/components/LeftHeroSection";
import { RightHeroSection } from "../src/components/RightHeroSection";
import theme from "../src/theme";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <SplitLayout>
          <LeftHeroSection backgroundImage='https://ik.imagekit.io/drpq5xrph/Template%20Tiffany%20&%20Jared/1.%20Cover.jpg?updatedAt=1698222296920' />
          <RightHeroSection
            backgroundImage='https://ik.imagekit.io/drpq5xrph/Template%20Tiffany%20&%20Jared/Desktop.jpg?updatedAt=1698223781539'
            hashtag='TImetoshaRE'
          />
        </SplitLayout>
      </Box>
    </ChakraProvider>
  );
}

export default App;
