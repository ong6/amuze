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
  Textarea,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { BsDashLg } from "react-icons/bs";
import { MetaContext } from "../../context/MetaContext";
import { mintUserNft } from "../../pages/api/contract";
import { uploadProposal } from "../../pages/api/ipfs";

export default function MintNFT() {
  const { address } = useContext(MetaContext);

  const styles = {
    heading: "text-left text-2xl font-semibold text-gray-600",
    headers: "text-left text-sm text-gray-600 uppercase",
    select: "bg-gray-100",
  };

  const [nftName, setNftName] = useState(null);
  const [description, setDescription] = useState(null);
  const [tour, setTour] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [selectedProof, setSelectedProof] = useState(null);

  const handleNftChange = (e) => setNftName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleTourChange = (e) => setTour(e.target.value);

  const handleMint = async () => {
    // const hash = await uploadIpfs();
    // const hashUri = "https://ipfs.infura.io/ipfs/" + hash;
    // mintUserNft(hashUri, address);

    mintUserNft(
      "https://ipfs.infura.io/ipfs/QmdhZvbz1nXMSUZUL8BdSW8THWefYZNNp4G4pHJtAWe2wn",
      address
    );
  };

  const uploadIpfs = async () => {
    const data = {
      name: nftName,
      description: description,
      image: selectedImage,
      audio: selectedAudio,
      proof: selectedProof,
      attributes: [
        {
          trait_type: "artist",
          value: "Unknown",
        },
        {
          trait_type: "countryOfOrigin",
          value: "Iraq",
        },
        {
          trait_type: "region",
          value: "Asia and the Pacific",
        },
        {
          trait_type: "route",
          value: "Land",
        },
        {
          trait_type: "specifications",
          value: "218x125x331cm",
        },
        {
          trait_type: "date",
          value: "Hammurabi (1792–50 BCE)",
        },
        {
          trait_type: "hostMuseum",
          value: "Mesopotamia Museum",
        },
        {
          trait_type: "objectType",
          value: "Monument",
        },
      ],
    };

    const uri = await uploadProposal(data);
    return uri;
  };

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
                setSelectedProof(event.target.files[0]);
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
                setSelectedAudio(event.target.files[0]);
                console.log(selectedImage);
                // getBase64(selectedImage).then((data) => {
                //   console.log(data);
                // });
              }}
            />
          </div>
          <CheckboxGroup isRequired>
            <Stack spacing={2} direction="column">
              <Checkbox size="md" value="audio_confirmation">
                <div className="text-xs">This NFT has an audio narration.</div>
              </Checkbox>
              <Checkbox size="md" value="t_and_c">
                <div className="text-xs">
                  I agree to the <Link>terms and conditions.</Link>
                </div>
              </Checkbox>
            </Stack>
          </CheckboxGroup>
        </FormControl>
        <Button colorScheme="blue" onClick={() => handleMint()}>
          Mint
        </Button>
      </div>
    </Container>
  );
}
