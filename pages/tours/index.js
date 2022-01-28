import Head from "next/head";
import Card from "../../components/Card";
import Layout from "../../components/layouts/Default";
import Section from "../../components/Section";
import tours from "../../public/tours/tours.json";
import { SimpleGrid, Container } from "@chakra-ui/react";

export default function Museum({ tours }) {
  return (
    <Layout>
      <div>
        <Head>
          <title>Museum Tours | Amuze</title>
          <meta name="description" content="Amuze-Museum at your fingertips" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Section delay={0.2}>
          <div className="p-8">
            <div className="mb-4 text-4xl font-bold text-center text-gray-100">
              Choose a museum tour to visit!
            </div>
            <Container minW={"80%"}>
              <SimpleGrid columns={[1, 1, 3]} gap={6}>
                {tours.map((tour, index) => {
                  return (
                    <Card
                      id={tour.id}
                      imgUrl={tour.image}
                      title={tour.name}
                      description={tour.description}
                      key={index}
                    />
                  );
                })}
              </SimpleGrid>
            </Container>
          </div>
        </Section>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      tours,
    },
  };
}
