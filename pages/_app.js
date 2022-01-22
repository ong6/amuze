import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import Layout from "../components/layouts/Main";
import theme from "../lib/theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Layout>
				<AnimatePresence exitBeforeEnter initial={true}>
					<Component {...pageProps} />
				</AnimatePresence>
			</Layout>
		</ChakraProvider>
	);
}

export default MyApp;
