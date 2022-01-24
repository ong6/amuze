import Link from "next/link";
import Image from "next/image";
import { Text, useColorModeValue } from "@chakra-ui/react";
import styled from "@emotion/styled";

// const LogoBox = styled.span`
// 	font-weight: bold;
// 	font-size: 22px;
// 	display: inline-flex;
// 	align-items: center;
// 	height: 30px;
// 	line-height: 20px;
// 	padding: 10px;

// 	img {
// 		transition: 200ms ease;
// 	}

// 	&:hover img {
// 		transform: rotate(20deg);
// 	}
// `;

const Logo = ({ title = null }) => {
  // const img = `/images/Brackets${useColorModeValue("", "-dark")}.png`;

  const titleUrl = title ? title.replace(/\s/g, "-") : "";

  return (
    // <Link href={title ? `/museum/${titleUrl}` : "/"}>
    <Link href={"/"}>
      <a>
        {/* <LogoBox> */}
        {/* <Image src={img} width={20} height={20} alt="logo" /> */}
        <Text color={"#FFFFFF"} fontWeight="bold" ml={3}>
          {title ? title : "A - MUZE"}
        </Text>
        {/* </LogoBox> */}
      </a>
    </Link>
  );
};

export default Logo;
