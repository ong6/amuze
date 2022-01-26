import {
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  Icon,
  Image,
  Link,
  Modal,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import Layout from "../components/layouts/Default";
import ListItem from "../components/rent/ListItem";
import MintNFT from "../components/rent/Mint";
import RentNFT from "../components/rent/Rent";
import Section from "../components/Section";
import { MetaContext } from "../context/MetaContext";
import {
  getEstimatedRewards,
  getHashesFromTokenIds,
  getRewards,
  getTokenIdsUser,
} from "./api/contract";

export default function Renting() {
  const { address, network } = useContext(MetaContext);

  const styles = {
    heading: "text-left text-2xl font-semibold text-gray-600",
    headers: "text-left text-sm text-gray-600 uppercase",
    select: "bg-gray-100",
  };

  function Rewards() {
    const [rewards, setRewards] = useState("0");

    useEffect(() => {
      getEstimatedRewards(address).then((r) => {
        setRewards(Number(r));
      });
    }, [rewards]);

    const receiveRewards = async () => {
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
            <Button
              variant="solid"
              colorScheme="green"
              rounded="full"
              onClick={receiveRewards}
            >
              Claim
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  const [collectItems, setCollectItems] = useState([]);

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
      setCollectItems(items);
    }
    if (address) {
      getCollectItems();
    }
  }, [address, setCollectItems]);

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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isRentOpen,
    onOpen: onRentOpen,
    onClose: onRentClose,
  } = useDisclosure();

  return (
    <>
      <Layout>
        {address && network ? (
          <Section delay={0.2}>
            <div className="flex flex-col pt-6 space-y-6 pb-60">
              <div className="text-white text-4xl font-bold text-center w-full pb-4">
                A-MUZE NFT Renting / Listing Platform
              </div>
              <Container>
                <SimpleGrid columns={2} gap={5}>
                  <Rewards />
                  <Button
                    h={"full"}
                    rounded={12}
                    colorScheme="telegram"
                    onClick={onRentOpen}
                  >
                    Rent your NFTs
                  </Button>
                </SimpleGrid>
              </Container>
              <Container bg={"white"} rounded="10" p={6}>
                <div className="text-black text-lg font-semibold mb-4">
                  Your NFT Collection
                </div>
                <SimpleGrid columns={[1, 1, 1]} gap={10}>
                  {collectItems.map((item, index) => (
                    <ListItem
                      key={index}
                      imgUrl={item.image}
                      title={item.name}
                      description={item.description}
                    />
                  ))}
                  <Button onClick={onOpen} colorScheme="red">
                    Mint A NFT
                  </Button>
                </SimpleGrid>
              </Container>

              {/* <CompleteNFT /> */}
            </div>
          </Section>
        ) : (
          <div className="[height:50vh] flex text-4xl text-white items-center justify-center">
            {network
              ? "Please connect your wallet to view Renting and Listing."
              : "Please connect to the Ropsten Test Network before proceeding."}
          </div>
        )}
      </Layout>
      <Modal isOpen={isRentOpen} onClose={onRentClose}>
        <ModalOverlay />
        <ModalContent minW="2xl" p={6}>
          <RentNFT />
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW="2xl" py={6}>
          <MintNFT />
        </ModalContent>
      </Modal>
    </>
  );
}
