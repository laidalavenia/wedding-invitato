import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  fonts: {
    heading: "Playfair Display, serif",
    body: "Inter, sans-serif",
  },
  colors: {
    brand: {
      50: "#fff9f1",
      100: "#ffecd6",
      200: "#ffd4a8",
      300: "#ffb770",
      400: "#ff9138",
      500: "#ff7a15",
      600: "#ff6b09",
      700: "#cc4e00",
      800: "#a64000",
      900: "#803200",
      950: "#FEFEFE"
    },
  },
});

export default theme;