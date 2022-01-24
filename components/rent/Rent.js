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
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { BsDashLg } from "react-icons/bs";
import { MetaContext } from "../../context/MetaContext";
import { getTokenIdsUser, rentToMuseum } from "../../pages/api/contract";

export default function RentNFT() {
  const { address } = useContext(MetaContext);

  const styles = {
    heading: "text-left text-2xl font-semibold text-gray-600",
    headers: "text-left text-sm text-gray-600 uppercase",
    select: "bg-gray-100",
  };

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
              <option value="Stone Tablet Winged Buddha">
                Stone Tablet Winged Buddha
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
                <div className="text-xs">This NFT has an audio narration.</div>
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
      </div>
    </Container>
  );
}
