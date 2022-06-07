import "../styles/globals.css";
import { FC } from "react";
import type { AppProps } from "next/app";
import { StoreProvider } from "easy-peasy";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import PlayerLayout from "../components/PlayerLayout";
import { store } from "../lib/store";

const theme = extendTheme({
  colors: {
    gray: {
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ":focus": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
  },
});
const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      {/* @ts-ignore */}
      <StoreProvider store={store}>
        {/* @ts-ignore */}
        {Component.publicPage ? (
          // @ts-ignore
          <Component {...pageProps} />
        ) : (
          <PlayerLayout>
            {/* @ts-ignore */}
            <Component {...pageProps} />
          </PlayerLayout>
        )}
      </StoreProvider>
    </ChakraProvider>
  );
};

export default MyApp;
