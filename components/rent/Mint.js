import {
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  FormControl,
  FormLabel,
  Input,
  Link,
  Select,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useS3Upload } from "next-s3-upload";
import React, { useContext, useState } from "react";
import { MetaContext } from "../../context/MetaContext";
import { mintUserNft } from "../../pages/api/contract";
import { uploadProposal } from "../../pages/api/ipfs";

export default function MintNFT({ onClose }) {
  const { address } = useContext(MetaContext);

  const styles = {
    heading: "text-left text-2xl font-semibold text-gray-600",
    headers: "text-left text-sm text-gray-600 uppercase",
    select: "bg-gray-100",
  };

  const [nftName, setNftName] = useState(null);
  const [description, setDescription] = useState(null);
  const [tour, setTour] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(
    "https://amuze.vercel.app/hackathon/1.png"
  );
  const [selectedAudioUrl, setSelectedAudioUrl] = useState(
    "https://amuze.vercel.app/hackathon/1.mp3"
  );
  const [selectedProofUrl, setSelectedProofUrl] = useState(
    "https://amuze.vercel.app/hackathon/proof.png"
  );

  const handleNftChange = (e) => setNftName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleTourChange = (e) => setTour(e.target.value);

  //S3 upload
  let { uploadToS3 } = useS3Upload();

  let handleImageChange = async (file) => {
    let { url } = await uploadToS3(file);
    setSelectedImageUrl(url);
  };

  let handleAudioChange = async (file) => {
    let { url } = await uploadToS3(file);
    setSelectedAudioUrl(url);
  };

  let handleProofChange = async (file) => {
    let { url } = await uploadToS3(file);
    setSelectedProofUrl(url);
  };

  const handleMint = async () => {
    const hash = await uploadIpfs();
    const hashUri = "https://ipfs.infura.io/ipfs/" + hash;
    await mintUserNft(hashUri, address);
    setTimeout(() => {
      onClose();
    }, 1000);

    // mintUserNft(
    //   "https://ipfs.infura.io/ipfs/QmdhZvbz1nXMSUZUL8BdSW8THWefYZNNp4G4pHJtAWe2wn",
    //   address
    // );
  };

  const [attributes, setAttributes] = useState({
    artist: "Unknown",
    countryOfOrigin: "Unknown",
    region: "Unknown",
    route: "Unknown",
    specifications: "Unknown",
    date: "Unknown",
    hostMuseum: "Unknown",
    objectType: "Unknown",
  });

  const uploadIpfs = async () => {
    const data = {
      name: nftName,
      description: description,
      image: selectedImageUrl,
      audio: selectedAudioUrl,
      proof: selectedProofUrl,
      attributes: [
        {
          trait_type: "artist",
          value: attributes.artist,
        },
        {
          trait_type: "countryOfOrigin",
          value: attributes.countryOfOrigin,
        },
        {
          trait_type: "region",
          value: attributes.region,
        },
        {
          trait_type: "route",
          value: attributes.route,
        },
        {
          trait_type: "specifications",
          value: attributes.specifications,
        },
        {
          trait_type: "date",
          value: attributes.date,
        },
        {
          trait_type: "hostMuseum",
          value: attributes.hostMuseum,
        },
        {
          trait_type: "objectType",
          value: attributes.objectType,
        },
      ],
    };

    const uri = await uploadProposal(data);
    return uri;
  };

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
            <FormLabel htmlFor="Artist" className={styles.headers}>
              Artist of NFT
            </FormLabel>
            <Input
              id="Artist"
              placeholder="Artist"
              variant="filled"
              size={"sm"}
              value={attributes.artist}
              onChange={(e) =>
                setAttributes({ ...attributes, artist: e.target.value })
              }
            ></Input>
          </div>
          <div className="div">
            <FormLabel htmlFor="countryOfOrigin" className={styles.headers}>
              country Of Origin of NFT
            </FormLabel>
            <Input
              id="countryOfOrigin"
              placeholder="country Of Origin"
              variant="filled"
              size={"sm"}
              value={attributes.countryOfOrigin}
              onChange={(e) =>
                setAttributes({
                  ...attributes,
                  countryOfOrigin: e.target.value,
                })
              }
            ></Input>
          </div>
          <div className="div">
            <FormLabel htmlFor="region" className={styles.headers}>
              region of NFT
            </FormLabel>
            <Input
              id="region"
              placeholder="region"
              variant="filled"
              size={"sm"}
              value={attributes.region}
              onChange={(e) =>
                setAttributes({
                  ...attributes,
                  region: e.target.value,
                })
              }
            ></Input>
          </div>
          <div className="div">
            <FormLabel htmlFor="route" className={styles.headers}>
              route of NFT
            </FormLabel>
            <Input
              id="route"
              placeholder="route"
              variant="filled"
              size={"sm"}
              value={attributes.route}
              onChange={(e) =>
                setAttributes({
                  ...attributes,
                  route: e.target.value,
                })
              }
            ></Input>
          </div>
          <div className="div">
            <FormLabel htmlFor="specifications" className={styles.headers}>
              specifications of NFT
            </FormLabel>
            <Input
              id="specifications"
              placeholder="specifications"
              variant="filled"
              size={"sm"}
              value={attributes.specifications}
              onChange={(e) =>
                setAttributes({
                  ...attributes,
                  specifications: e.target.value,
                })
              }
            ></Input>
          </div>
          <div className="div">
            <FormLabel htmlFor="date" className={styles.headers}>
              date of NFT
            </FormLabel>
            <Input
              id="date"
              placeholder="date"
              variant="filled"
              size={"sm"}
              value={attributes.date}
              onChange={(e) =>
                setAttributes({
                  ...attributes,
                  date: e.target.value,
                })
              }
            ></Input>
          </div>
          <div className="div">
            <FormLabel htmlFor="hostMuseum" className={styles.headers}>
              host Museum of NFT
            </FormLabel>
            <Input
              id="hostMuseum"
              placeholder="Host Museum"
              variant="filled"
              size={"sm"}
              value={attributes.hostMuseum}
              onChange={(e) =>
                setAttributes({
                  ...attributes,
                  hostMuseum: e.target.value,
                })
              }
            ></Input>
          </div>
          <div className="div">
            <FormLabel htmlFor="objectType" className={styles.headers}>
              object Type of NFT
            </FormLabel>
            <Input
              id="objectType"
              placeholder="Object Type"
              variant="filled"
              size={"sm"}
              value={attributes.objectType}
              onChange={(e) =>
                setAttributes({
                  ...attributes,
                  objectType: e.target.value,
                })
              }
            ></Input>
          </div>
          {/* <div className="div">
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
          </div> */}
          <div className="div">
            <FormLabel htmlFor="image" className={styles.headers}>
              {"Image"}
            </FormLabel>
            <Input
              id="image"
              variant="filled"
              size={"sm"}
              type="file"
              onChange={(event) => {
                handleImageChange(event.target.files[0]);
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
                handleProofChange(event.target.files[0]);
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
                handleAudioChange(event.target.files[0]);
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
