import {
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { BsDashLg } from "react-icons/bs";
import { MetaContext } from "../../context/MetaContext";
import {
  getTokenIdsUser,
  rentToMuseum,
  getHashesFromTokenIds,
  isWhitelisted,
} from "../../pages/api/contract";

export default function RentNFT({ onClose }) {
  const { address } = useContext(MetaContext);

  const styles = {
    heading: "text-left text-2xl font-semibold text-gray-600",
    headers: "text-left text-sm text-gray-600 uppercase",
    select: "bg-gray-100",
  };

  const toast = useToast();

  const [nft, setNft] = useState(null);
  const [museum, setMuseum] = useState(null);
  const [tour, setTour] = useState(null);
  const [owner, setOwner] = useState(null);

  const handleNftChange = (e) => setNft(e.target.value);
  const handleMuseumChange = (e) => setMuseum(e.target.value);
  const handleTourChange = (e) => setTour(e.target.value);
  const handleOwnerChange = (e) => setOwner(e.target.value);

  const [mintedNft, setMintedNft] = useState(null);
  const [whitelisted, setWhitelisted] = useState(true);
  const [rent, setRent] = useState(false);

  useEffect(() => {
    async function getCollectItems() {
      const hashes = await getHashesFromTokenIds(
        await getTokenIdsUser(address)
      );
      let items = [];
      for (const tokenId in hashes) {
        let response = fetch(hashes[tokenId]);
        let item = await response.then((res) => res.json());
        items.push({ tokenId: tokenId, ...item });
      }
      setMintedNft(items);
    }
    async function canRent() {
      setRent(await isWhitelisted(address));
    }
    getCollectItems();
    canRent();
  }, [address]);

  const handleRent = async () => {
    try {
      await rentToMuseum(nft, address);
      setTimeout(() => {
        onClose();
      }, 1000);
      toast({
        title: "Your NFT is being rented!",
        description: "Please give us a few seconds",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    } catch (e) {
      setWhitelisted(false);
      console.log(e);
    }
    return false;
  };

  return (
    <Container className="bg-white rounded-xl">
      {rent ? (
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
              >
                {mintedNft ? (
                  mintedNft.map((item) => (
                    <option value={item.tokenId} key={item.tokenId}>
                      {item.name}
                    </option>
                  ))
                ) : (
                  <>
                    <option value="temp">Loading...</option>
                  </>
                )}
              </Select>
            </div>
            <div className="div">
              {/* <FormLabel htmlFor="Museum" className={styles.headers}>
              Museum
            </FormLabel> */}
              {/* <Select
              id="Museum"
              placeholder="Select Museum"
              variant="filled"
              size={"sm"}
              onChange={handleMuseumChange}
            >
              <option value="National Museum of singapore">
                National Museum of singapore
              </option>
            </Select> */}
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
            Rent
          </Button>
          {whitelisted ? null : (
            <div className="text-red-500 whitespace-pre">
              You are not Whitelisted! Contact <Link>this number</Link> to find
              out more!
            </div>
          )}
        </div>
      ) : (
        <div className="[height:50vh] flex text-4xl text-black items-center justify-center">
          <div className="">
            You are not whitelisted! Contact <Link>this number</Link> to get
            whitelisted.
          </div>
        </div>
      )}
    </Container>
  );
}
