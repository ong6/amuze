import {
  Box,
  Button,
  Container,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Entry from "./museum/Entry";
export default function Card({
  title = "Topkapi Palace Museum",
  description = "In the 15th and 16th centuries it served as the main administrative ...",
  label = "Entrance Fee",
  imgUrl = "/topkapi.png",
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box className="flex flex-col justify-between flex-1 h-full overflow-hidden bg-white border-2 rounded-3xl border-opacity-60">
      <div className="">
        <Image
          className="object-cover object-center w-full"
          width={373}
          height={250}
          layout="responsive"
          src={imgUrl}
          alt="video"
        />
        <div className="justify-between w-full p-4 bg-white">
          <Heading className="text-lg font-bold text-gray-900" size={"base"}>
            {title}
          </Heading>
          <div className="">
            <Text className="text-sm text-ellipsis">
              {description}
              {/* <Link> Read More</Link> */}
            </Text>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-100 ">
        <div>
          <p className="inline-flex items-center text-sm text-gray-400 md:mb-2 lg:mb-0">
            {label}
          </p>
          <p className="text-lg font-bold text-left text-gray-900">30 MUZE</p>
        </div>
        <Button
          className="flex"
          rounded={"3xl"}
          colorScheme="purple"
          onClick={onOpen}
        >
          Buy Ticket
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buy Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody borderRadius="xl">
            <Entry title={title} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
