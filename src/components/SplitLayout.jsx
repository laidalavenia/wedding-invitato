import { Grid } from "@chakra-ui/react";

export const SplitLayout = (props) => (
  <Grid
    templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
    minH='100vh'
    {...props}
  />
);
