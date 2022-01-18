import { Box, Container } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
import Navbar from "../Navbar";
// import Footer from "../Footer";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { MetaContext } from "../../context/MetaContext";

const Main = ({ children, router }) => {
	const [metamask, setMetamask] = useState(false);
	const [address, setAddress] = useState(null);
	const [network, setNetwork] = useState(false);

	useEffect(() => {
		if (!window.ethereum) {
			setMetamask("Please install metamask");
			return;
		}
		async function getNetwork() {
			if (window.ethereum) {
				const provider = new ethers.providers.Web3Provider(
					window.ethereum,
					"any"
				);
				const curr_network = await provider.getNetwork();
				setNetwork(curr_network.chainId);
				provider.on("network", (newNetwork, oldNetwork) => {
					if (oldNetwork) {
						window.location.reload();
					}
				});
			}
		}
		getNetwork();
	}, []);

	return (
		<MetaContext.Provider value={{ network, address, metamask }}>
			<Box as="main" pb={8}>
				<Head>
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta name="description" content="Jun Xiong's homepage" />
					<meta name="author" content="Jun Xiong" />
					<meta property="og:site_name" content="Jun Xiong's Homepage" />
					<meta property="og:type" content="website" />
					<meta property="og:image" content="/favicon.png" />
					<link rel="icon" href="/favicon.ico" />
					<title>Jun Xiong - Homepage</title>
				</Head>

				<Navbar path={router.asPath} />

				<Box pt={14}>
					{children}

					{/* <Footer /> */}
				</Box>
			</Box>
		</MetaContext.Provider>
	);
};

export default Main;
