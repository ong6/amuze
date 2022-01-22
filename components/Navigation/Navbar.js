import { Box, Container, Flex, Heading, Link, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useContext } from "react";
import { IoWallet } from "react-icons/io5";
import { MetaContext } from "../../context/MetaContext";
import { getShortAccountHash, login } from "../../pages/api/util";
import Logo from "../Logo";

const LinkItem = ({ href, path, _target, children, ...props }) => {
	const active = path === href;
	const inactiveColor = "#FFFFFF";

	return (
		<NextLink href={href} passHref>
			<Link
				p={2}
				px={4}
				fontFamily="heading"
				fontWeight="medium"
				fontSize="lg"
				color={active ? "#F6973F" : inactiveColor}
				_hover={{ color: "#F6973F" }}
				_target={_target}
				{...props}>
				{children}
			</Link>
		</NextLink>
	);
};

const Navbar = (props) => {
	const { path } = props;

	return (
		<Box
			position=""
			as="nav"
			w="100%"
			bg={"transparent"}
			css={{ backdropFilter: "blur(10px)" }}
			zIndex={1}
			{...props}>
			<Container
				display="flex"
				p={8}
				maxW="full"
				wrap="wrap"
				align="center"
				alignItems="center"
				justify="space-between">
				<Flex align="center" mr={12}>
					<Heading as="h1" size="lg" letterSpacing={"tighter"}>
						<Logo />
					</Heading>
				</Flex>

				<Stack
					direction={{ md: "row" }}
					display={{ md: "flex" }}
					width={{ md: "auto" }}
					alignItems="center"
					flexGrow={1}
					mt={{ md: 0 }}>
					<LinkItem href="/museum" path={path}>
						Museums
					</LinkItem>
					<LinkItem href="#how-it-works" path={path}>
						How it works
					</LinkItem>
					<LinkItem href="/renting" path={path}>
						Renting/Listing
					</LinkItem>
				</Stack>
				<ConnectWallet />
			</Container>
		</Box>
	);
};

const ConnectWallet = () => {
	const [address, metamask] = useContext(MetaContext);

	return (
		<div className="fixed top-0 right-0 z-50 p-8">
			<button
				onClick={login}
				className="items-center px-2 py-1 text-center border border-white rounded-full md:px-6 md:py-3"
				disabled={metamask}>
				<div
					className={
						address
							? `text-lg md:text-2xl font-bold p-2 text-orange-500 inline-flex items-center gap-2`
							: `text-lg md:text-2xl font-bold p-2 text-white inline-flex items-center gap-2`
					}>
					<IoWallet className="mt-1" />
					{metamask
						? "Install MetaMask!"
						: address
							? getShortAccountHash(address)
							: "Connect wallet"}
				</div>
			</button>
		</div>
	);
};

export default Navbar;
