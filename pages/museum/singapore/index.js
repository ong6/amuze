import {
  Container,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import CollectItem from "../../../components/CollectItem";
import Layout from "../../../components/layouts/Museum";
import Section from "../../../components/Section";
import { MetaContext } from "../../../context/MetaContext";
import {
  getHashesFromTokenIds,
  getTokenIdsForMuseum,
} from "../../api/contract";

function getAttributeValue(arr, key) {
  return arr.filter((item) => item.trait_type === key)[0].value;
}

export default function Museum() {
  const { address } = useContext(MetaContext);
  const [collectItems, setCollectItems] = useState(null);

  useEffect(() => {
    async function getCollectItems() {
      const hashes = await getHashesFromTokenIds(await getTokenIdsForMuseum());
      // fetch json data from api
      let items = [];
      for (const tokenId in hashes) {
        let response = fetch(hashes[tokenId]);
        let item = await response.then((res) => res.json());
        items.push(item);
      }
      setCollectItems(items);
    }
    getCollectItems();
  }, [setCollectItems]);

  return (
    <Layout title="Chinese Artefacts of the Qing Dynasty Tour">
      {address ? (
        <Section delay={0.2} mb={0}>
          <div
            style={{
              backgroundImage: "url(/bg.png) ",
              backgroundSize: "cover",
            }}
            className="bg-fixed bg-center bg-cover bg-clip-border"
          >
            <div className="flex items-center justify-center gap-4 mb-4 text-xl font-bold text-gray-100">
              <h1 className="w-1/3 py-10">VIEW PIECES FROM AROUND THE WORLD</h1>
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
            <Container minW={"80%"} pb={12}>
              <SimpleGrid columns={[1, 1, 3]} gap={10}>
                {collectItems ? (
                  collectItems.map((item, index) => (
                    <CollectItem
                      key={index}
                      origin={getAttributeValue(
                        item.attributes,
                        "countryOfOrigin"
                      )}
                      imgUrl={item.image}
                      title={item.name}
                      audio={item.audio}
                      description={item.description}
                      date={getAttributeValue(item.attributes, "date")}
                      region={getAttributeValue(item.attributes, "region")}
                      artist={getAttributeValue(item.attributes, "artist")}
                      route={getAttributeValue(item.attributes, "route")}
                      hostMuseum={getAttributeValue(
                        item.attributes,
                        "hostMuseum"
                      )}
                      objectType={getAttributeValue(
                        item.attributes,
                        "objectType"
                      )}
                      specifications={getAttributeValue(
                        item.attributes,
                        "specifications"
                      )}
                    />
                  ))
                ) : (
                  <SimpleGrid columns={[1, 1, 3]} gap={10}>
                    <Skeleton height="400px" width="350px" />
                    <Skeleton height="400px" width="350px" />
                    <Skeleton height="400px" width="350px" />
                  </SimpleGrid>
                )}
              </SimpleGrid>
            </Container>
          </div>
        </Section>
      ) : (
        <div className="[height:50vh] flex text-4xl text-white items-center justify-center">
          Please Connect Your wallet to view the museum.
        </div>
      )}
    </Layout>
  );
}
