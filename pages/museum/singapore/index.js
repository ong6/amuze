import { Container, Input, InputGroup, InputLeftElement, SimpleGrid } from "@chakra-ui/react";
import Head from "next/head";
import Card from "../../../components/Card";
import { useContext, useState } from "react";
import Layout from "../../../components/layouts/Museum";
import Section from "../../../components/Section";
import { MetaContext } from "../../../context/MetaContext";
import { AiOutlineSearch } from "react-icons/ai";
import CollectItem from "../../../components/CollectItem";
import SingaporeColelction from '../../../public/sample_nft/singapore.json'
function getAttributeValue(arr, key) {
	return arr.filter((item) => item.trait_type === key)[0].value;
}

export default function Museum() {
	const { address } = useContext(MetaContext);
	const [collectItems, setCollectItems] = useState(SingaporeColelction)
	return (
		<Layout>
			<Head>
				<title>Amuze</title>
				<meta name="description" content="Amuze-Museum at your fingertips" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			{address ? (
				<Section delay={0.2}>
					<div className="p-8">
						<div className="flex items-center justify-center gap-4 mb-4 text-4xl font-bold text-gray-100">
							<h1 className="w-1/3 py-10">VIEW PIECES FROM AROUND THE WORLD</h1>
							<div className="py-10 w-96">
								<InputGroup>
									<InputLeftElement
										pointerEvents='none'
										// eslint-disable-next-line react/no-children-prop
										children={<AiOutlineSearch className="text-gray-400" />}
									/>
									<Input placeholder='Search' variant='filled' />
								</InputGroup>
							</div>
						</div>
						<Container minW={"80%"}>
							<SimpleGrid columns={[1, 1, 4]} gap={10}>
								{collectItems.map((item, index) => (
									<CollectItem key={index} origins={getAttributeValue(item.attributes, "countryOfOrigin")}
										imgUrl={item.image} title={item.name}
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
