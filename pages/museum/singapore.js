import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Card from "../../components/Card";
import Layout from "../../components/layouts/Museum";
import Section from "../../components/Section";
import { SimpleGrid, GridItem } from "@chakra-ui/react";
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
						<Entry />
					</div>
				</Section>
			</div>
		</Layout>
	);
}
