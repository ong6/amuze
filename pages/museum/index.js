import Head from "next/head";
import Image from "next/image";
import Section from "../../components/Section";

export default function Museum() {
	return (
		<div>
			<Head>
				<title>Amuze</title>
				<meta name="description" content="Amuze-Museum at your fingertips" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Section delay={0.2}>
				<div className="h-screen text-white">test</div>
				<div className="h-screen">test</div>
			</Section>
		</div>
	);
}
