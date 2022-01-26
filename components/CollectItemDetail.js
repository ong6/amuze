import { Button, Image } from "@chakra-ui/react";
import { AiFillCaretRight } from "react-icons/ai";

function play(url) {
  var audio = new Audio(url);
  audio.play();
}

export default function CollectItemDetail({
  title = "Qing Dynasty Stone Statue",
  date = "1644 to 1912",
  origins = "Iraq",
  description = "The mythical twin heroes, Kastor (Κάστωρ, beaver; Latin, Castor) and Polydeukes (Πολυδεύκης, much sweet wine; Latin, Polydeuces or Pollux) were known as the Dioskouroi (Greek ).Their mother was Leda, but they had different fathers; Castor was the mortal son of Tyndareus, the king of Sparta, while Pollux was the divine son of Zeus, who seduced Leda in the guise of a swan.\nSpecifications:",
  imgUrl = "/robe.svg",
  audio = "https://amuze.vercel.app/hackathon/1.mp3",
  region = "",
  artist = "",
  route = "",
  hostMuseum = "",
  objectType = "",
  specifications = "",
}) {
  return (
    <section className="bg-gray-100 rounded-3xl">
      <div className="container flex items-center justify-center px-5 py-24 mx-auto">
        <div className="flex">
          <div className="p-4 lg:w-1/3 w-full">
            <div className="flex flex-col p-8 bg-white border-2 border-gray-200 border-opacity-50 rounded-lg shadow-lg sm:flex-row">
              <Image src={imgUrl} alt="NFT" />
            </div>
          </div>
          <div className="p-4 lg:w-1/2 w-full">
            <div className="flex flex-col w-full h-full p-8 bg-white rounded-lg shadow-lg sm:flex-row">
              <div className="">
                <h2 className="text-lg font-medium text-gray-900">{title}</h2>
                <h2 className="font-medium text-gray-900 text-md">
                  Date: {date}
                </h2>
                <h2 className="font-medium text-gray-900 text-md">
                  Origin: {origins}
                </h2>
                <h2 className="font-medium text-gray-900 text-md">
                  Region: {region}
                </h2>
                <h2 className="font-medium text-gray-900 text-md">
                  Artist: {artist}
                </h2>
                <h2 className="font-medium text-gray-900 text-md">
                  Route: {route}
                </h2>
                <h2 className="font-medium text-gray-900 text-md">
                  Host Museum: {hostMuseum}
                </h2>
                <h2 className="font-medium text-gray-900 text-md">
                  Object Type: {objectType}
                </h2>
                <h2 className="font-medium text-gray-900 text-md">
                  Specifications: {specifications}
                </h2>
                <p className="text-base leading-relaxed">{description}</p>
                <Button
                  onClick={() => play(audio)}
                  variant="ghost"
                  colorScheme={"red"}
                  pt={2}
                >
                  <Image src="/music.png" alt="music" className="my-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex items-center cursor-pointer">
            <AiFillCaretRight size={70} />
          </div>
        </div>
      </div>
    </section>
  );
}
