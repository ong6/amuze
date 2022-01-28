import {
    Button,
    Container,
    Flex,
    Input,
    InputGroup,
    InputLeftElement,
    Skeleton,
    useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import CollectItem from "../../components/CollectItem";
import Layout from "../../components/layouts/Museum";
import Section from "../../components/Section";
import { MetaContext } from "../../context/MetaContext";
import {
    closeTour,
    getHashesFromTokenIds,
    getTokenIdsForMuseum,
} from "../api/contract";
import tours from '../../public/tours/tours.json'

function getAttributeValue(arr, key) {
    return arr.filter((item) => item.trait_type === key)[0].value;
}

export default function Museum({ tour }) {
    const router = useRouter()
    const { address } = useContext(MetaContext);
    const [collectItems, setCollectItems] = useState(null);

    const toast = useToast();

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

    const onClickClose = async () => {
        await closeTour();
        toast({
            title: "Tour has been force close!",
            description: `You will be redirected to the homepage in ${10} seconds`,
            status: "success",
            duration: 6000,
            isClosable: true,
            position: "top",
        });
        setTimeout(() => {
            router.push("/");
        }, 10000);
    };

    return (
        <Layout title={tour.name} id={tour.id}>
            {address ? (
                <Section delay={0.2} mb={0}>
                    <div
                        style={{
                            backgroundImage: "url(/bg.png) ",
                            backgroundSize: "cover",
                        }}
                        className="pb-32 bg-fixed bg-center bg-cover bg-clip-border"
                    >
                        <div className="flex items-center justify-center gap-4 mb-4 text-xl font-bold text-gray-100">
                            <h1 className="w-1/3 py-10 text-3xl">
                                VIEW PIECES FROM AROUND THE WORLD
                            </h1>
                            <div className="flex flex-col py-10 space-y-4 w-96">
                                <InputGroup className="flex-1">
                                    <InputLeftElement
                                        pointerEvents="none"
                                        // eslint-disable-next-line react/no-children-prop
                                        children={<AiOutlineSearch className="text-gray-400" />}
                                    />
                                    <Input placeholder="Search" variant="filled" />
                                </InputGroup>
                                <Button
                                    colorScheme="telegram"
                                    className="flex flex-1 w-full p-3"
                                    onClick={onClickClose}
                                >
                                    Force end tour (demo only)
                                </Button>
                            </div>
                        </div>
                        <Container minW={"70%"} pb={12}>
                            <Flex className="" gap={10}>
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
                                    <>
                                        <Skeleton height="400px" />
                                        <Skeleton height="400px" />
                                        <Skeleton height="400px" />
                                        <Skeleton height="400px" />
                                    </>
                                )}
                            </Flex>
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

// This function gets called at build time
export async function getStaticPaths() {
    const paths = tours.map((tour) => ({
        params: { id: tour.id },
    }))

    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
}

// This function gets called at build time
export async function getStaticProps({ params }) {
    const tour = tours.find(tour => tour.id === params.id)
    // By returning { props: { tour } }, the Museum component
    // will receive `tour` as a prop at build time
    return {
        props: {
            tour,
        },
    }
}