import {
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Select,
  Stack,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { BsDashLg, BsQuestionCircle } from "react-icons/bs";
import Layout from "../components/layouts/Default";
import Section from "../components/Section";
import { MetaContext } from "../context/MetaContext";
import RentNFT from "../components/rent/Rent";
import MintNFT from "../components/rent/Mint";
import { getRewards, getEstimatedRewards } from "./api/contract";

export default function Renting() {
  const { address } = useContext(MetaContext);

  const styles = {
    heading: "text-left text-2xl font-semibold text-gray-600",
    headers: "text-left text-sm text-gray-600 uppercase",
    select: "bg-gray-100",
  };

  function Rewards() {
    const [rewards, setRewards] = useState("0");

    useEffect(() => {
      getEstimatedRewards().then((rewards) => {
        setRewards(Number(rewards));
      });
    }, [getEstimatedRewards]);

    const getRewards = async () => {
      await getRewards();
      return false;
    };

    return (
      <Container maxW="xs" className="bg-white rounded-xl">
        <div className="flex flex-col space-y-4 p-4 justify-center">
          <div className="flex space-x-2 items-center text-gray-600">
            <div className="font-semibold ">Muze Reward Bounty</div>
            <Tooltip
              hasArrow
              label="Museum Rent collection fees paid to you"
              placement="top"
            >
              <div className="items-center mb-1">
                <Icon as={BsQuestionCircle} />
              </div>
            </Tooltip>
          </div>

          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="text-xl font-semibold">{rewards}</div>
              <div className="div">~{rewards / 3300} eth </div>
            </div>
            <Button variant="solid" colorScheme="green" rounded="full">
              Claim
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  // const redeemRewards = async () => {
  //   console.log("hi");
  //   // console.log(await getEstimatedRewards());
  //   // await getRewards();
  // };

  function CompleteNFT() {
    return (
      <Container className="bg-white rounded-xl">
        <div className="flex flex-col space-y-4 p-4 justify-center">
          <div className="div">
            <div className={styles.heading}>Mint Your NFT</div>
          </div>
          <div className="self-center bg-gray-200 justify-center">
            {mint &&
              rent(
                <>
                  <Image
                    src={URL.createObjectURL(selectedImage)}
                    alt="Not found"
                    height={"250px"}
                  />
                  <div className="flex flex-col justify-center text-center">
                    <div className="div"> {mint.nft} </div>
                    <div className="div"> Owner: {rent.owner}</div>
                  </div>
                </>
              )}
          </div>
          <Button colorScheme="red">YOUR NFT HAS BEEN MINTED</Button>
          <CheckboxGroup>
            <Stack spacing={2} direction="column">
              <Checkbox size="md" value="termsAndConditions">
                <div className="text-xs">
                  I agree to the <Link>terms and conditions.</Link>
                </div>
              </Checkbox>
            </Stack>
          </CheckboxGroup>
          <Button colorScheme="blue">Rent</Button>
        </div>
      </Container>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Amuze</title>
        <meta name="description" content="Amuze-Museum at your fingertips" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {address ? (
        <Section delay={0.2}>
          <div className="flex flex-col pt-6 space-y-6">
            <div className="text-white text-4xl font-bold text-center w-full">
              A-MUZE NFT Renting / Listing Platform
            </div>
            <Rewards />
            <MintNFT />
            <RentNFT />
            {/* <CompleteNFT /> */}
          </div>
        </Section>
      ) : (
        <div className="[height:50vh] flex text-4xl text-white items-center justify-center">
          Please connect your wallet to view Renting and Listing.
        </div>
      )}
    </Layout>
  );
}
