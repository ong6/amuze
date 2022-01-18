import Logo from "./Logo";
import NextLink from "next/link";
import {
	Container,
	Box,
	Link,
	Stack,
	Heading,
	Flex,
	Menu,
	MenuItem,
	MenuList,
	MenuButton,
	IconButton,
	useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { IoLogoGithub } from "react-icons/io5";

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
				p={2}
				maxW="container.lg"
				wrap="wrap"
				align="center"
				justify="space-between">
				<Flex align="center" mr={5}>
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
					<LinkItem href="#works" path={path}>
						How it works
					</LinkItem>
					<LinkItem href="/renting" path={path}>
						Renting/Listing
					</LinkItem>
					{/* <LinkItem
						_target="_blank"
						href="https://github.com/ong6/amuze"
						path={path}
						display="inline-flex"
						alignItems="center"
						style={{ gap: 4 }}
						pl={2}>
						<IoLogoGithub />
						Source
					</LinkItem> */}
				</Stack>
			</Container>
		</Box>
	);
};

export default Navbar;
