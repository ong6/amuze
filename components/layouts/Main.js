import { Box, Button, Link } from "@chakra-ui/react";
import { ethers } from "ethers";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { MetaContext } from "../../context/MetaContext";
import Footer from "../Footer";
import ConnectWallet from "../Navigation/Metamask";

const Main = ({ children }) => {
  const [metamask, setMetamask] = useState(true);
  const [address, setAddress] = useState(undefined);
  const [network, setNetwork] = useState(true);
  const [viewMode, setViewMode] = useState(false);

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
        setNetwork(curr_network.chainId === 4);
        provider.on("network", (newNetwork, oldNetwork) => {
          if (oldNetwork) {
            window.location.reload();
          }
        });
      }
    }
    if (!viewMode) {
      console.log("ran");
      getNetwork();
    }
  }, [metamask, address, network, viewMode]);

  const handleViewMode = () => {
    setViewMode(true);
    setMetamask(true);
    setAddress(true);
    setNetwork(true);
  };

  return (
    <MetaContext.Provider value={{ network, address, metamask, viewMode }}>
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
          <div className="flex flex-col h-screen items-center justify-center space-y-12">
            <div className="text-5xl font-bold text-white self-center items-center justify-center flex  whitespace-pre">
              Please install{" "}
              <Link href="https://metamask.io/download/">metamask</Link> to
              continue...
            </div>
            <h1 className="text-xl font-bold text-red-600 self-center items-center justify-center flex flex-col ">
              <span>Alternatively, proceed with view only mode.</span>
              <span>
                Please note that in this mode, the website is prone to errors.
              </span>
            </h1>
            <Button colorScheme={"red"} onClick={handleViewMode}>
              View-only mode
            </Button>
          </div>
        )}
      </Box>
    </MetaContext.Provider>
  );
};

export default Main;
