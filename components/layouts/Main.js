import { Box } from "@chakra-ui/react";
import { ethers } from "ethers";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { MetaContext } from "../../context/MetaContext";
import Footer from "../Footer";

const Main = ({ children }) => {
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
			<Box as="main">
				<Head>
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
				</Head>
				{children}
				<Footer />
			</Box>
		</MetaContext.Provider>
	);
};

export default Main;
