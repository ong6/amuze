import {
  Button,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Image,
  Icon,
  Text,
} from "@chakra-ui/react";
import { BsPlay } from "react-icons/bs";
import CollectItemDetail from "./CollectItemDetail";
export default function CollectNewItem({
  title = "Qing Dynasty Stone Statue",
  description = "item description",
  origin = "Unknown",
  date = "1644 to 1912",
  country = "Unknown",
  owner = "Unknown",
  imgUrl = "/robe.svg",
  audio = "https://amuze.vercel.app/hackathon/1.mp3",
  region = "Unknown",
  artist = "Unknown",
  route = "Unknown",
  hostMuseum = "Unknown",
  objectType = "Unknown",
  specifications = "Unknown",
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="m-6">
      {/* <div className="rounded-3xl"> */}
      <div className="relative w-full flex flex-col">
        <Image
          className="object-cover object-center w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500"
          width={450}
          height={350}
          layout="responsive"
          src={imgUrl}
          alt="image"
          roundedTop={15}
        />
        <div className="flex flex-col w-full text-center items-center">
          <div className="h-16 w-16 justify-center item-center flex absolute bg-red-500 -mt-8 rounded-full mx-auto hover:bg-red-300 transition-all ease-in-out duration-400">
            <Icon
              as={BsPlay}
              w={14}
              h={14}
              ml={2}
              className="self-center"
              color="white"
              onClick={onOpen}
            />
          </div>
        </div>
        <div className="flex flex-col w-full bg-gray-100 text-black text-center py-12 space-y-2 rounded-b-xl">
          <Text color={"black"} className="font-semibold text-2xl text-black">
            {title}
          </Text>
          <Text color={"black"} className=" text-md text-black">
            Origin: {origin}
          </Text>
        </div>
      </div>
      <Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">NFT Details</DrawerHeader>
          <DrawerBody className="bg-gray-100">
            <CollectItemDetail
              imgUrl={imgUrl}
              title={title}
              audio={audio}
              description={description}
              date={date}
              origin={origin}
              region={region}
              artist={artist}
              hostMuseum={hostMuseum}
              objectType={objectType}
              specifications={specifications}
              route={route}
              onClick={onClose}
            />
            ,
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
