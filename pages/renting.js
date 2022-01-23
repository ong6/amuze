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
} from "@chakra-ui/react";
import Head from "next/head";
import React, { useContext, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { BsDashLg } from "react-icons/bs";
import Layout from "../components/layouts/Default";
import Section from "../components/Section";
import { MetaContext } from "../context/MetaContext";
import { getTokenIdsUser, mintUserNft, rentToMuseum } from "./api/contract";

export default function Renting() {
  const { address } = useContext(MetaContext);

  const styles = {
    heading: "text-left text-2xl font-semibold text-gray-600",
    headers: "text-left text-sm text-gray-600 uppercase",
    select: "bg-gray-100",
  };

  const [rent, setRent] = useState(null);
  const [mint, setMint] = useState(null);

  function RentNFT() {
    const [nft, setNft] = useState(null);
    const [museum, setMuseum] = useState(null);
    const [tour, setTour] = useState(null);
    const [owner, setOwner] = useState(null);

    const handleNftChange = (e) => setNft(e.target.value);
    const handleMuseumChange = (e) => setMuseum(e.target.value);
    const handleTourChange = (e) => setTour(e.target.value);
    const handleOwnerChange = (e) => setOwner(e.target.value);

    let path;

    const handleRent = async () => {
      setRent({
        nft: nft,
        museum: museum,
        tour: tour,
        owner: owner,
      });

      // path = uploadProposal(JSON.stringify(testData));
      // console.log(path);

      const tempData = await getTokenIdsUser(address);
      console.log(tempData);
      await rentToMuseum(tempData[0], address);

      return false;
    };

    return (
      <Container className="bg-white rounded-xl">
        <div className="flex flex-col space-y-4 p-4">
          <div className="div">
            <div className={styles.heading}>Rent NFT</div>
            <div className="text-left font-base text-gray-500 text-sm">
              Please fill in the following to rent your NFT.
            </div>
          </div>
          <FormControl className="space-y-6">
            <div className="div">
              <FormLabel htmlFor="NFT" className={styles.headers}>
                Select NFT
              </FormLabel>
              <Select
                id="NFT"
                placeholder="Select NFT"
                variant="filled"
                size={"sm"}
                onChange={handleNftChange}
                value={nft}
              >
                <option value="Qin Hua Porcelain Flower Vase">
                  Qin Hua Porcelain Flower Vase
                </option>
              </Select>
            </div>
            <div className="div">
              <FormLabel htmlFor="Museum" className={styles.headers}>
                Museum
              </FormLabel>
              <Select
                id="Museum"
                placeholder="Select Museum"
                variant="filled"
                size={"sm"}
                value={museum}
                onChange={handleMuseumChange}
              >
                <option value="National Museum of singapore">
                  National Museum of singapore
                </option>
              </Select>
            </div>
            <div className="div">
              <FormLabel htmlFor="Tour" className={styles.headers}>
                Tour
              </FormLabel>
              <Select
                id="Tour"
                placeholder="Select Tour"
                variant="filled"
                size={"sm"}
                value={tour}
                onChange={handleTourChange}
              >
                <option value="Chinese Artefacts of the Qing Dynasty Tour">
                  Chinese Artefacts of the Qing Dynasty Tour
                </option>
                <option value="JOURNEY TO THE WEST - TRADITIONAL VASES">
                  Hawaiian Ancient Ruins, the story of King Kamehameha Tour
                </option>
                <option value="JOURNEY TO THE WEST - TRADITIONAL VASES">
                  Babylonian Kings and their luxurious lives Tour
                </option>
              </Select>
            </div>
            <div className="div">
              <div className="text-xs text-gray-400 mb-2">
                {`*you have selected ${tour}.
                Dates for tour below.`}
              </div>
              <div className="flex flex-row justify-between items-center">
                <InputGroup>
                  <Input
                    variant="filled"
                    size="sm"
                    placeholder={
                      tour === "Chinese Artefacts of the Qing Dynasty Tour"
                        ? "21/1/22"
                        : "date"
                    }
                    isReadOnly
                  />
                  <InputRightElement>
                    <Icon as={BiCalendar} color="gray.500" w={5} h={5} mb={2} />
                  </InputRightElement>
                </InputGroup>
                <div className="px-6">
                  <BsDashLg />
                </div>
                <InputGroup>
                  <Input
                    variant="filled"
                    size="sm"
                    placeholder={
                      tour === "Chinese Artefacts of the Qing Dynasty Tour"
                        ? "21/8/22"
                        : "date"
                    }
                    isReadOnly
                  />
                  <InputRightElement>
                    <Icon as={BiCalendar} color="gray.500" w={5} h={5} mb={2} />
                  </InputRightElement>
                </InputGroup>
              </div>
            </div>
            <div className="div">
              <FormLabel
                htmlFor="Name"
                className={styles.headers + " normal-case"}
              >
                OWNER NAME
              </FormLabel>
              <Input
                id="Name"
                placeholder="Enter Name"
                variant="filled"
                size={"sm"}
                onChange={handleOwnerChange}
                value={owner}
              />
            </div>
            <CheckboxGroup>
              <Stack spacing={2} direction="column">
                <Checkbox size="md" value="audio">
                  <div className="text-xs">
                    This NFT has an audio narration.
                  </div>
                </Checkbox>
                <Checkbox size="md" value="termsAndConditions">
                  <div className="text-xs">
                    I agree to the <Link>terms and conditions.</Link>
                  </div>
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </FormControl>
          <Button colorScheme="blue" onClick={handleRent}>
            Next
          </Button>
        </div>
      </Container>
    );
  }

  function MintNFT() {
    const [nftName, setNftName] = useState(null);
    const [description, setDescription] = useState(null);
    const [tour, setTour] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleNftChange = (e) => setNftName(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleTourChange = (e) => setTour(e.target.value);

    function handleMint() {
      setMint({
        nftName: nftName,
        description: description,
        tour: tour,
        image: selectedImage,
      });

      mintUserNft(
        "https://ipfs.infura.io/ipfs/QmdhZvbz1nXMSUZUL8BdSW8THWefYZNNp4G4pHJtAWe2wn",
        address
      );
    }

    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    }

    return (
      <Container className="bg-white rounded-xl">
        <div className="flex flex-col space-y-4 p-4">
          <div className="div">
            <div className={styles.heading}>Mint Your NFT</div>
            <div className="text-left font-base text-gray-500 text-sm">
              Please fill in the following to rent your NFT.
            </div>
          </div>
          <FormControl className="space-y-6" isRequired>
            <div className="div">
              <FormLabel htmlFor="NFT Name" className={styles.headers}>
                Name of NFT
              </FormLabel>
              <Input
                id="NFT Name"
                placeholder="Input NFT"
                variant="filled"
                size={"sm"}
                onChange={handleNftChange}
              ></Input>
            </div>
            <div className="div">
              <FormLabel htmlFor="NFT Description" className={styles.headers}>
                Description
              </FormLabel>
              <Textarea
                id="NFT Description"
                placeholder="Enter Description"
                variant="filled"
                size={"sm"}
                onChange={handleDescriptionChange}
              />
            </div>
            <div className="div">
              <FormLabel htmlFor="Tour" className={styles.headers}>
                Tour
              </FormLabel>
              <Select
                id="Tour"
                placeholder="Select Tour"
                variant="filled"
                size={"sm"}
                onChange={handleTourChange}
              >
                <option value="Chinese Artefacts of the Qing Dynasty Tour">
                  Chinese Artefacts of the Qing Dynasty Tour
                </option>
                <option value="JOURNEY TO THE WEST - TRADITIONAL VASES">
                  Hawaiian Ancient Ruins, the story of King Kamehameha Tour
                </option>
                <option value="JOURNEY TO THE WEST - TRADITIONAL VASES">
                  Babylonian Kings and their luxurious lives Tour
                </option>
              </Select>
            </div>
            <div className="div">
              <div className="text-xs text-gray-400 mb-2">
                {`*you have selected ${tour}.
                Dates for tour below.`}
              </div>
              <div className="flex flex-row justify-between items-center">
                <InputGroup>
                  <Input
                    variant="filled"
                    size="sm"
                    placeholder={
                      tour === "Chinese Artefacts of the Qing Dynasty Tour"
                        ? "21/1/22"
                        : "date"
                    }
                    isReadOnly={true}
                  />
                  <InputRightElement>
                    <Icon as={BiCalendar} color="gray.500" w={5} h={5} mb={2} />
                  </InputRightElement>
                </InputGroup>
                <div className="px-6">
                  <BsDashLg />
                </div>
                <InputGroup>
                  <Input
                    variant="filled"
                    size="sm"
                    placeholder={
                      tour === "Chinese Artefacts of the Qing Dynasty Tour"
                        ? "21/8/22"
                        : "date"
                    }
                    isReadOnly={true}
                    className="text-red-800"
                  />
                  <InputRightElement>
                    <Icon as={BiCalendar} color="gray.500" w={5} h={5} mb={2} />
                  </InputRightElement>
                </InputGroup>
              </div>
            </div>
            <div className="div">
              <FormLabel htmlFor="Name" className={styles.headers}>
                {"Image"}
              </FormLabel>
              <Input
                id="Name"
                placeholder="Enter Name"
                variant="filled"
                size={"sm"}
                type="file"
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                  console.log(selectedImage);
                  // getBase64(selectedImage).then((data) => {
                  //   console.log(data);
                  // });
                }}
              />
            </div>
            <div className="div">
              <FormLabel htmlFor="certification" className={styles.headers}>
                {"Certificate"}
              </FormLabel>
              <Input
                id="certification"
                variant="filled"
                size={"sm"}
                type="file"
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                  console.log(selectedImage);
                  // getBase64(selectedImage).then((data) => {
                  //   console.log(data);
                  // });
                }}
              />
            </div>
            <div className="div">
              <FormLabel htmlFor="audio" className={styles.headers}>
                {"Audio (mp3)"}
              </FormLabel>
              <Input
                id="audio"
                variant="filled"
                size={"sm"}
                type="file"
                onChange={(event) => {
                  setSelectedImage(event.target.files[0]);
                  console.log(selectedImage);
                  // getBase64(selectedImage).then((data) => {
                  //   console.log(data);
                  // });
                }}
              />
            </div>
            <CheckboxGroup>
              <Stack spacing={2} direction="column">
                <Checkbox size="md" value="audio">
                  <div className="text-xs">
                    This NFT has an audio narration.
                  </div>
                </Checkbox>
                <Checkbox size="md" value="termsAndConditions">
                  <div className="text-xs">
                    I agree to the <Link>terms and conditions.</Link>
                  </div>
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </FormControl>
          <Button colorScheme="blue" onClick={() => handleMint()}>
            Next
          </Button>
        </div>
      </Container>
    );
  }

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
