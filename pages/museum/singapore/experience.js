import Head from "next/head";
import { useContext } from "react";
import Layout from "../../../components/layouts/Museum";
import Section from "../../../components/Section";
import { MetaContext } from "../../../context/MetaContext";

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
                    <div className="flex flex-col h-screen p-8 text-center">
                        <div className="flex items-center justify-center gap-4 mb-4 text-4xl font-bold text-gray-100">
                            <h1 className="w-1/3 py-10">Coming Soon</h1>
                        </div>
                        <div className="flex items-center justify-center gap-6 text-white">
                            <div className="flex items-center justify-center w-1/3 text-6xl text-center border h-72">2D</div>
                            <div className="flex items-center justify-center w-1/3 text-6xl text-center border h-72">3D</div>
                        </div>
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
