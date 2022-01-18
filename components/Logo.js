import Link from "next/link";
import Image from "next/image";
import { Text, useColorModeValue } from "@chakra-ui/react";
import styled from "@emotion/styled";

const LogoBox = styled.span`
	font-weight: bold;
	font-size: 22px;
	display: inline-flex;
	align-items: center;
	height: 30px;
	line-height: 20px;
	padding: 10px;

	img {
		transition: 200ms ease;
	}

	&:hover img {
		transform: rotate(20deg);
	}
`;

const Logo = () => {
	const footPrintImg = `/images/Brackets${useColorModeValue("", "-dark")}.png`;

	return (
		<Link href="/">
			<a>
				<LogoBox>
					<Image src={footPrintImg} width={20} height={20} alt="logo" />
					<Text color={"#FFFFFF"} fontWeight="bold" ml={3}>
						A-MUZE
					</Text>
				</LogoBox>
			</a>
		</Link>
	);
};

export default Logo;
