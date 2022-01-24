import {
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
} from "@chakra-ui/react";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Layout from "../../../components/layouts/Museum";
import Section from "../../../components/Section";
import { MetaContext } from "../../../context/MetaContext";
import { AiOutlineSearch } from "react-icons/ai";
import CollectItem from "../../../components/CollectItem";
import SingaporeCollection from "../../../public/sample_nft/singapore.json";
import { getHashesFromTokenIds, getTokenIdsForMuseum } from "../../api/contract";


function getAttributeValue(arr, key) {
  return arr.filter((item) => item.trait_type === key)[0].value;
}

export default function Museum() {
  const { address } = useContext(MetaContext);
  const [collectItems, setCollectItems] = useState([]);

  useEffect(() => {
    async function getCollectItems() {
      const hashs = await getHashesFromTokenIds(await getTokenIdsForMuseum());
      // fetch json data from api
      let items = [];
      for (const tokenId in hashs) {
        let response = fetch(
          hashs[tokenId]
        )
        let item = await response.then((res) => res.json())
        items.push(item)
      }
      setCollectItems(items);
    }
    getCollectItems()
  }, [setCollectItems]);

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
            style={{
              backgroundImage: "url(/bg.png) ",
              backgroundSize: "cover",
            }}
          >
            <div className="flex items-center justify-center gap-4 mb-4 text-xl font-bold text-gray-100">
              <h1 className="w-1/3 py-10">
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
