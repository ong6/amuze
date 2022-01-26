import Link from "next/link";
import Image from "next/image";
import { Text, useColorModeValue } from "@chakra-ui/react";
import styled from "@emotion/styled";

const Logo = ({ title = null }) => {
  const titleUrl = title ? title.replace(/\s/g, "-") : "";

  return (
    <Link href={"/"}>
      <a>
        <Text color={"#FFFFFF"} fontWeight="bold" ml={3}>
          {title ? title : "A - MUZE"}
        </Text>
      </a>
    </Link>
  );
};

export default Logo;
