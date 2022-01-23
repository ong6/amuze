import Head from "next/head";
import Layout from "../components/layouts/Default";
import Section from "../components/Section";
import React, { useContext, useState } from "react";
import {
  Container,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  InputGroup,
  InputRightElement,
  Icon,
  Stack,
  Checkbox,
  CheckboxGroup,
  Link,
  Button,
  Textarea,
  Image,
} from "@chakra-ui/react";
import { BsDashLg } from "react-icons/bs";
import { BiCalendar } from "react-icons/bi";
import { MetaContext } from "../context/MetaContext";
import { uploadProposal } from "./api/ipfs";
import testData from "../public/sample_nft/nft1.json";

export default function Renting() {
  const { address } = useContext(MetaContext);

  const tourAddress = "0xB9dE71AdFa99FDB0313f381B12335D890C41D34f";
  const custodyAddress = "0x70c326a3B6B7eF767d2eCE68D9C5b91A38FE92B7";
  const muzeAddress = "0xDABAb1D8E95A491374CEe8280Be480A901a7C807";

  const styles = {
    heading: "text-left text-2xl font-semibold text-gray-600",
    headers: "text-left text-sm text-gray-600 uppercase",
    select: "bg-gray-100",
  };

  const [rent, setRent] = useState(null);
  const [mint, setMint] = useState(null);

  const getTokenIds = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const abi = [
      "function balanceOf(address owner) external view returns (uint256 balance)",
      "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256 tokenId)",
    ];

    const signer = provider.getSigner();
    const muzeTour = new ethers.Contract(tourAddress, abi, signer);
    const numOfNfts = await muzeTour.balanceOf(address);

    let tokenIds = [];
    let promises = [];

    for (let i = 0; i < numOfNfts; i++) {
      promises.push(
        muzeTour
          .tokenOfOwnerByIndex(i)
          .then((tokenId) => tokenIds.push(tokenId))
      );
    }

    await Promise.all(promises);

    return tokenIds;
  };

  const getHashFromTokenId = async (tokenId) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const abi = [
      "function tokenURI(uint256 tokenId) public view virtual override returns (string memory)",
    ];

    const signer = provider.getSigner();
    const muzeTour = new ethers.Contract(tourAddress, abi, signer);

    return await muzeTour.tokenURI(tokenId);
  };

  const getHashesFromTokenIds = async (tokenIds) => {
    let hashes = {};
    let promises = [];

    for (let i = 0; i < tokenIds.length(); i++) {
      promises.push(
        getHashFromTokenId(tokenIds[i]).then(
          (hash) => (hashes[tokenIds[i]] = hash)
        )
      );
    }

    await Promise.all(promises);

    return hashes;
  };

  const mintNFT = async (ipfsUrl) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const abi = [
      "function totalSupply() external view returns (uint256)",
      "function mint(address _to, uint256 _tokenId, string memory _tokenURI) external",
    ];
    const signer = provider.getSigner();
    const muzeTour = new ethers.Contract(tourAddress, abi, signer);

    const newTokenId = (await muzeTour.totalSupply()) + 1;

    // eg: https://ipfs.infura.io/ipfs/QmdhZvbz1nXMSUZUL8BdSW8THWefYZNNp4G4pHJtAWe2wn
    await muzeTour.mint(address, newTokenId, ipfsUrl);
  };

  function RentNFT() {
    const [nft, setNft] = useState("Qin Hua Porcelain Flower Vase");
    const [museum, setMuseum] = useState("National Museum of singapore");
    const [tour, setTour] = useState("JOURNEY TO THE WEST - TRADITIONAL VASES");
    const [owner, setOwner] = useState("");

    const handleNftChange = (e) => setNft(e.target.value);
    const handleMuseumChange = (e) => setMuseum(e.target.value);
    const handleTourChange = (e) => setTour(e.target.value);
    const handleOwnerChange = (e) => setOwner(e.target.value);

    let path;

    const handleRent = async ({ tokenId }) => {
      setRent({
        nft: nft,
        museum: museum,
        tour: tour,
        owner: owner,
      });
      console.log("submit");
      console.log(rent);

      // path = uploadProposal(JSON.stringify(testData));
      // console.log(path);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const abi = [
        "function safeTransferFrom(address from, address to, uint256 tokenId) external",
      ];
      const signer = provider.getSigner();
      const tourAddress = "0xBA6FF536370Cc75f0D7643d21E2cF546f1da7C0E";
      const custodyAddress = "0x3B83b5762FC63956F923FC244E6bd1d0C4731b06";
      const muzeTour = new ethers.Contract(tourAddress, abi, signer);

      await muzeTour.safeTransferFrom(address, custodyAddress, tokenId);

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
                <option value="test1">test</option>
                <option value="test2">test</option>
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
                <option value="JOURNEY TO THE WEST - TRADITIONAL VASES">
                  JOURNEY TO THE WEST - TRADITIONAL VASES
                </option>
              </Select>
            </div>
            <div className="div">
              <div className="text-xs text-gray-400 mb-2">
                *you have selected “JOURNEY TO THE WEST - TRADITIONAL VASES”.
                Dates for tour below.
              </div>
              <div className="flex flex-row justify-between items-center">
                <InputGroup>
                  <Input
                    variant="filled"
                    size="sm"
                    placeholder="date"
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
                    placeholder="date"
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

    function handleMint(nft, description, tour, image) {
      setMint({
        nftName: nft,
        description: description,
        tour: tour,
        image: image,
      });
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
                <option value="JOURNEY TO THE WEST - TRADITIONAL VASES">
                  JOURNEY TO THE WEST - TRADITIONAL VASES
                </option>
                <option value="test1">test</option>
                <option value="test2">test</option>
              </Select>
            </div>
            <div className="div">
              <div className="text-xs text-gray-400 mb-2">
                *you have selected “JOURNEY TO THE WEST - TRADITIONAL VASES”.
                Dates for tour below.
              </div>
              <div className="flex flex-row justify-between items-center">
                <InputGroup>
                  <Input
                    variant="filled"
                    size="sm"
                    placeholder="date"
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
                    placeholder="date"
                    isReadOnly={true}
                  />
                  <InputRightElement>
                    <Icon as={BiCalendar} color="gray.500" w={5} h={5} mb={2} />
                  </InputRightElement>
                </InputGroup>
              </div>
            </div>
            <div className="div">
              <FormLabel htmlFor="Name" className={styles.headers}>
                {"UPLOAD 2D & 3D IMAGES, CERTIFICATE & AUDIO"}
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
                  getBase64(selectedImage).then((data) => {
                    console.log(data);
                  });
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
          <Button
            colorScheme="blue"
            onClick={() =>
              handleMint(nftName, description, tour, selectedImage)
            }
          >
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
            <RentNFT />
            <MintNFT />
            <CompleteNFT />
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
