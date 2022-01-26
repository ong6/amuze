import Head from "next/head";
import Image from "next/image";
import Canvas from "../../../components/Canvas";
import { useRouter } from "next/router";
import Layout from "../../../components/layouts/Museum";
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
import { useContext, useEffect, useState } from "react";
import { MetaContext } from "../../../context/MetaContext";

export default function Souvenir() {
  const { address } = useContext(MetaContext);

  const [imgData, setImgData] = useState({
    name: "John",
    description: "I really enjoyed this virtual experience!",
    walletAddress: address,
  });

  useEffect(() => {
    setImgData({ ...imgData, walletAddress: address });
  }, [address]);

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

  const download = function () {
    var link = document.createElement("a");
    link.download = "ThanksForVisiting.png";
    link.href = document.getElementById("postcard").toDataURL();
    link.click();
  };

  return (
    <Layout>
      {address ? (
        <>
          <Section delay={0.2}>
            <div className="items-center text-center justify-center space-y-8 pb-72">
              <Heading color="white">View your Souvenir!</Heading>
              <Container className="bg-white rounded-xl pb-4">
                <div className="flex flex-col space-y-4 p-4">
                  <div className="div">
                    <div className={styles.heading}>Generate Postcard</div>
                    <div className="text-left font-base text-gray-500 text-sm">
                      Please fill in the following to get a postcard that you
                      can keep!
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
              minW={"70%"}
              justifyItems="center"
              className="text-center"
              p={6}
              bg="gray.100"
            >
              <Box className="space-y-4">
                <Canvas
                  id="postcard"
                  className="flex mx-auto h-[70vh] rounded-lg"
                  imgdata={imgData}
                />
                <Button colorScheme="blue" w="50%" onClick={download}>
                  Download
                </Button>
              </Box>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <div className="[height:50vh] flex text-4xl text-white items-center justify-center">
          Please connect your wallet to get your souvenir!
        </div>
      )}
    </Layout>
  );
}
