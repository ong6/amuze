import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Card from "../../components/Card";
import Layout from "../../components/layouts/Default";
import Section from "../../components/Section";
import {
	SimpleGrid,
	GridItem,
	Container,
	localStorageManager,
	Button,
	useDisclosure
} from '@chakra-ui/react'
import Entry from "../../components/museum/Entry";

export default function Museum() {
	return (
		<Layout>
			<div>
				<Head>
					<title>Amuze</title>
					<meta name="description" content="Amuze-Museum at your fingertips" />
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<Section delay={0.2}>
					<div className="p-8">
						<div className="text-gray-100 text-center text-4xl font-bold mb-4">
							Choose a museum to visit!
						</div>
						<Container minW={"80%"}>
							<SimpleGrid columns={[1, 1, 3]} gap={6}>
								<Card />
								<Card />
								<Card />
								<Card />
								<Card />
							</SimpleGrid>
						</Container>
					</div>
				</Section>
			</div>
		</Layout>
	);
}
