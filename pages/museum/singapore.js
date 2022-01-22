import Head from "next/head";
import { useContext } from "react";
import Layout from "../../components/layouts/Museum";
import Entry from "../../components/museum/Entry";
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
						<Entry />
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
