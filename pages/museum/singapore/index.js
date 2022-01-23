import {
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
} from "@chakra-ui/react";
import Head from "next/head";
import Card from "../../../components/Card";
import { useContext, useState } from "react";
import Layout from "../../../components/layouts/Museum";
import Section from "../../../components/Section";
import { MetaContext } from "../../../context/MetaContext";
import { AiOutlineSearch } from "react-icons/ai";
import CollectItem from "../../../components/CollectItem";
import SingaporeCollection from "../../../public/sample_nft/singapore.json";
import { ethers } from "ethers";

function getAttributeValue(arr, key) {
  return arr.filter((item) => item.trait_type === key)[0].value;
}

export default function Museum() {
  const { address } = useContext(MetaContext);
  const [collectItems, setCollectItems] = useState(SingaporeCollection);

  const tourAddress = "0xB9dE71AdFa99FDB0313f381B12335D890C41D34f";
  const custodyAddress = "0x70c326a3B6B7eF767d2eCE68D9C5b91A38FE92B7";
  const muzeAddress = "0xDABAb1D8E95A491374CEe8280Be480A901a7C807";

  const getTokenIdsForMuseum = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const abi = [
      "function getRents() external view returns (RentedNFT[] memory)",
    ];

    const signer = provider.getSigner();
    const muzeCustody = new ethers.Contract(custodyAddress, abi, signer);
    const rents = await muzeCustody.getRents();

    return rents.map((rent) => rent.tokenId);
  };

  const test = async () => {
    getTokenIdsForMuseum().then(console.log);
  };

  return (
    <Layout>
      <Head>
        <title>Amuze</title>
        <meta name="description" content="Amuze-Museum at your fingertips" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {address ? (
        <Section delay={0.2}>
          <div
            className="h-screen"
            style={{
              backgroundImage: "url(/bg.png) ",
              backgroundSize: "cover",
            }}
          >
            <div className="flex items-center justify-center gap-4 mb-4 text-xl font-bold text-gray-100">
              <h1 className="w-1/3 py-10" onClick={test}>
                VIEW PIECES FROM AROUND THE WORLD
              </h1>
              <div className="py-10 w-96">
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    // eslint-disable-next-line react/no-children-prop
                    children={<AiOutlineSearch className="text-gray-400" />}
                  />
                  <Input placeholder="Search" variant="filled" />
                </InputGroup>
              </div>
            </div>
            <Container minW={"80%"}>
              <SimpleGrid columns={[1, 1, 4]} gap={10}>
                {collectItems.map((item, index) => (
                  <CollectItem
                    key={index}
                    origins={getAttributeValue(
                      item.attributes,
                      "countryOfOrigin"
                    )}
                    imgUrl={item.image}
                    title={item.name}
                    audio={item.audio}
                    description={item.description}
                  />
                ))}
              </SimpleGrid>
            </Container>
          </div>
        </Section>
      ) : (
        <div className="[height:50vh] flex text-4xl text-white items-center justify-center">
          Please Connect Your wallet to view Renting and Listing.
        </div>
      )}
    </Layout>
  );
}
