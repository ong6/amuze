import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Head from "next/head";
import MuseumNavbar from "../Navigation/MuseumNavbar";
import Section from "../Section";

const variants = {
  hidden: { opacity: 0, x: 0, y: 20 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 },
};

const Layout = ({ children, title, router, id }) => (
  <motion.div
    initial="hidden"
    animate="enter"
    exit="exit"
    variants={variants}
    transition={{ duration: 0.4, type: "easeInOut" }}
    style={{ position: "relative" }}
  >
    <>
      {title && (
        <Head>
          <title>{title} | Amuze</title>
          <meta
            name="description"
            content="Amuze-Museum at your fingertips"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}
      <Section delay={0.1}>
        <MuseumNavbar path={router} title={title} id={id} />
      </Section>

      <Box>{children}</Box>
    </>
  </motion.div>
);

export default Layout;
