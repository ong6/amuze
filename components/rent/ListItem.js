import { Container, Image } from "@chakra-ui/react";

export default function ListItem({
  title = "Qing Dynasty Stone Statue",
  description = "item description",
  imgUrl = "/robe.svg",
}) {
  return (
    <div className="flex flex-wrap bg-white">
      <div className="flex row">
        <Image
          className="object-cover object-center w-full lg:h-48 md:h-36"
          height={100}
          w="auto"
          layout="responsive"
          src={imgUrl}
          alt="video"
          bg="white"
        />
        <div className="flex flex-col space-y-2">
          <div className="text-gray-600 font-bold text-xl">{title}</div>
          <div className="font-base text-sm overflow-ellipsis">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
