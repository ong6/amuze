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

export default function MintNFT() {
  const { address } = useContext(MetaContext);

  const [nftName, setNftName] = useState(null);
  const [description, setDescription] = useState(null);
  const [tour, setTour] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleNftChange = (e) => setNftName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleTourChange = (e) => setTour(e.target.value);

  const handleMint = () => {
    setMint({
      nftName: nftName,
      description: description,
      tour: tour,
      image: selectedImage,
    });
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
        <Button colorScheme="blue" onClick={() => handleMint()}>
          Next
        </Button>
      </div>
    </Container>
  );
}
