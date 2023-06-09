import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import "@/styles/globals.css";
import { theme } from "@/utils/theme";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StateProvider from "@/context/StateProvider";
import { ToastContainer } from "react-toastify";
import { BackToTop } from "@/components/Common";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <StateProvider>
                <CSSReset />
                {/* <ToastContainer /> */}
                <Toaster position="top-right" containerClassName="text-lg p-4" />
                <Component {...pageProps} />
                <BackToTop />
            </StateProvider>
        </ChakraProvider>
    );
}
