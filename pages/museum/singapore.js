import Head from "next/head";
import Layout from "../../components/layouts/Museum";
import Entry from "../../components/museum/Entry";
import Section from "../../components/Section";

export default function Museum() {
	return (
		<Layout>
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
		</Layout>
	);
}
