import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Head from "next/head";
import Navbar from "../navigation/Navbar";
import Section from "../Section";

const variants = {
	hidden: { opacity: 0, x: 0, y: 20 },
	enter: { opacity: 1, x: 0, y: 0 },
	exit: { opacity: 0, x: -0, y: 20 },
};

import React from "react";
import { useRouter } from "next/router";

function Layout({ children, title }) {
	const router = useRouter();
	return (
		<motion.div
			initial="hidden"
			animate="enter"
			exit="exit"
			variants={variants}
			transition={{ duration: 0.4, type: "easeInOut" }}
			style={{ position: "relative" }}>
			<>
				{title && (
					<Head>
						<title>{title} - AMUZE</title>
					</Head>
				)}
				<Section delay={0.1}>
					<Navbar path={router.asPath} />
				</Section>

				<Box>{children}</Box>
			</>
		</motion.div>
	);
}

// const Layout = ({ children, title, router }) => (
// 	<motion.div
// 		initial="hidden"
// 		animate="enter"
// 		exit="exit"
// 		variants={variants}
// 		transition={{ duration: 0.4, type: "easeInOut" }}
// 		style={{ position: "relative" }}>
// 		<>
// 			{title && (
// 				<Head>
// 					<title>{title} - AMUZE</title>
// 				</Head>
// 			)}
// 			<Section delay={0.1}>
// 				<Navbar path={router} />
// 			</Section>

// 			<Box pt={14}>{children}</Box>
// 		</>
// 	</motion.div>
// );

export default Layout;
