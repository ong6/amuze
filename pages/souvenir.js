import Head from "next/head";
import Image from "next/image";
import Canvas from "../components/Canvas";
import { useRouter } from "next/router";
import Layout from "../components/layouts/Default";
import Section from "../components/Section";
import { Text } from "@chakra-ui/react";

export default function Museum() {
//   const testData = {
//     noOfTrades: 456,
//     gasUSD: 2000,
//     value: 10000,
//     favPair: "DOGE / ETH",
//     favPairValue: 150840,
//     avgTrade: 5940,
//     maxTrade: 54120,
//     maxDate: 1641212754,
//     minTrade: 520,
//     minDate: 1641212754,
//   };
  return (
    <Layout>
      <div>
        <Head>
          <title>Amuze</title>
          <meta name="description" content="Amuze-Museum at your fingertips" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Section delay={0.2}>
          <div className="items-center text-center justify-center ">
            <div
              className="font-bold text-black uppercase whitespace-pre text-center"
              id="claimSuccess"
            >
              <Text color="white">View your Souvenir!</Text>
            </div>
            <Canvas
              id="roadMapDrawing"
              className="flex mx-auto h-[70vh]"
            //   imgdata={testData}
            />
            {/* <p>
              <input
                type="text"
                id="msg"
                placeholder="write your message here"
              />
            </p> */}
          </div>
        </Section>
      </div>
    </Layout>
  );
}
