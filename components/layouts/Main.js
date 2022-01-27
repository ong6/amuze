import { Box, Link } from "@chakra-ui/react";
import { ethers } from "ethers";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { MetaContext } from "../../context/MetaContext";
import Footer from "../Footer";
import ConnectWallet from "../Navigation/Metamask";

const Main = ({ children }) => {
  const [metamask, setMetamask] = useState(true);
  const [address, setAddress] = useState(undefined);
  const [network, setNetwork] = useState(false);

  useEffect(() => {
    async function getNetwork() {
      if (!window.ethereum) {
        setMetamask(false);
        return;
      }
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(
          window.ethereum,
          "any"
        );
        const curr_network = await provider.getNetwork();
        setNetwork(curr_network.chainId === 3);
        provider.on("network", (newNetwork, oldNetwork) => {
          if (oldNetwork) {
            window.location.reload();
          }
        });
      }
    }
    getNetwork();
  }, [metamask, address, network]);

  return (
    <MetaContext.Provider value={{ network, address, metamask }}>
      <Box as="main">
        <Head>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        {metamask ? (
          <>
            <ConnectWallet address={address} setAddress={setAddress} />
            {children}
            <Footer />
          </>
        ) : (
          <div className="text-5xl font-bold text-white self-center items-center justify-center flex h-screen whitespace-pre">
            Please install <Link href="https://metamask.io/download/">metamask</Link> to continue...
          </div>
        )}
      </Box>
    </MetaContext.Provider>
  );
};

export default Main;
