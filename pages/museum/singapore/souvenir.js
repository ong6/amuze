import Head from "next/head";
import Image from "next/image";
import Canvas from "../../../components/Canvas";
import { useRouter } from "next/router";
import Layout from "../../../components/layouts/Default";
import Section from "../../../components/Section";
import {
  Text,
  FormLabel,
  Input,
  Heading,
  FormControl,
  Container,
  Button,
  Textarea,
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Souvenir() {
  const [imgData, setImgData] = useState({
    name: "temp",
    description: "temp",
  });

  const styles = {
    heading: "text-left text-2xl font-semibold text-gray-600",
    headers: "text-left text-sm text-gray-600 uppercase",
    select: "bg-gray-100",
  };

  const {
    isOpen: isPostcardOpen,
    onOpen: onPostcardOpen,
    onClose: onPostcardClose,
  } = useDisclosure();

  return (
    <Layout>
      <Section delay={0.2}>
        <div className="items-center text-center justify-center space-y-8 pb-40">
          <Heading color="white">View your Souvenir!</Heading>
          <Container className="bg-white rounded-xl">
            <div className="flex flex-col space-y-4 p-4">
              <div className="div">
                <div className={styles.heading}>Generate Postcard</div>
                <div className="text-left font-base text-gray-500 text-sm">
                  Please fill in the following to get a postcard that you can
                  keep!
                </div>
              </div>
              <FormControl className="space-y-6">
                <FormLabel
                  htmlFor="name"
                  className={"text-left text-sm text-gray-600 uppercase"}
                >
                  Visitor Name:
                </FormLabel>
                <Input
                  id="name"
                  placeholder="name"
                  variant="filled"
                  size={"sm"}
                  value={imgData.name}
                  onChange={(e) =>
                    setImgData({
                      ...imgData,
                      name: e.target.value,
                    })
                  }
                ></Input>
                <FormLabel
                  htmlFor="description"
                  className={"text-left text-sm text-gray-600 uppercase"}
                >
                  How was your experience
                </FormLabel>
                <Textarea
                  id="description"
                  placeholder="description"
                  variant="filled"
                  size={"sm"}
                  value={imgData.description}
                  onChange={(e) =>
                    setImgData({
                      ...imgData,
                      description: e.target.value,
                    })
                  }
                ></Textarea>
              </FormControl>
              <Button colorScheme="blue" onClick={onPostcardOpen}>
                Generate postcard
              </Button>
            </div>
          </Container>
        </div>
      </Section>

      <Modal isOpen={isPostcardOpen} onClose={onPostcardClose}>
        <ModalOverlay />
        <ModalContent
          minW={"90%"}
          justifyItems="center"
          className="text-center"
          p={6}
          bg="gray.100"
        >
          <Box className="space-y-4">
            <Canvas
              id="postcard"
              className="flex mx-auto w-[80vw] rounded-lg"
              imgdata={imgData}
            />
            <Button colorScheme="blue" w="50%">
              Download
            </Button>
          </Box>
        </ModalContent>
      </Modal>
    </Layout>
  );
}
