import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/layouts/Main";
import theme from "../lib/theme";

function MyApp({ Component, pageProps, router }) {
	return (
		<ChakraProvider theme={theme}>
			<Layout router={router}>
				<AnimatePresence exitBeforeEnter initial={true}>
					<Component {...pageProps} />
				</AnimatePresence>
			</Layout>
		</ChakraProvider>
	);
}

export default MyApp;
