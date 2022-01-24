import { Container, Input, SimpleGrid } from "@chakra-ui/react";
import Head from "next/head";
import Card from "../../components/Card";
import { useContext } from "react";
import Layout from "../../components/layouts/Museum";
import Section from "../../components/Section";
import { MetaContext } from "../../context/MetaContext";

export default function Museum() {
	const { address } = useContext(MetaContext);

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
						<div className="text-gray-100 text-center text-4xl font-bold mb-4 flex justify-center gap-4">
							<h1>VIEW PIECES FROM AROUND THE WORLD</h1>
							<div className="w-56">
								<Input placeholder='Search' />
							</div>
						</div>
						<Container minW={"80%"}>
							<SimpleGrid columns={[1, 1, 4]} gap={6}>
								<Card />
								<Card />
								<Card />
								<Card />
								<Card />
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
