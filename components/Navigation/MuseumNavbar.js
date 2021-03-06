import { Box, Container, Flex, Heading, Link, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

const LinkItem = ({ href, path, _target, children, ...props }) => {
  const active = path.asPath === href;
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
        {...props}
      >
        {children}
      </Link>
    </NextLink>
  );
};

const MuseumNavbar = (props) => {
  const path = useRouter();

  return (
    <Box
      position=""
      as="nav"
      w="100%"
      bg={"transparent"}
      css={{ backdropFilter: "blur(10px)" }}
      zIndex={1}
      {...props}
    >
      <Container
        display="flex"
        p={8}
        maxW="full"
        wrap="wrap"
        align="center"
        alignItems="center"
        justify="space-between"
      >
        <Flex align="center" mr={12}>
          <LinkItem href={"/"} path={path}>
            <Heading as="h1" size="lg" letterSpacing={"tighter"}>
              {props.title}
            </Heading>
          </LinkItem>
        </Flex>
        <Stack
          direction={{ md: "row" }}
          display={{ md: "flex" }}
          width={{ md: "auto" }}
          alignItems="center"
          flexGrow={1}
          mt={{ md: 0 }}
        >
          <LinkItem href={`/tours/${props.id}`} path={path}>
            Full Collection
          </LinkItem>
          <LinkItem href="/tours/experience" path={path}>
            Experience
          </LinkItem>
          <LinkItem href="/tours/souvenir" path={path}>
            Souvenir
          </LinkItem>
        </Stack>
      </Container>
    </Box>
  );
};

export default MuseumNavbar;
