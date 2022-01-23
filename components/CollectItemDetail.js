import { Image } from "@chakra-ui/react";

export default function CollectItemDetail({
    title = "Qing Dynasty Stone Statue",
    origins = "1644 to 1912",
    description = "The mythical twin heroes, Kastor (Κάστωρ, beaver; Latin, Castor) and Polydeukes (Πολυδεύκης, much sweet wine; Latin, Polydeuces or Pollux) were known as the Dioskouroi (Greek ).Their mother was Leda, but they had different fathers; Castor was the mortal son of Tyndareus, the king of Sparta, while Pollux was the divine son of Zeus, who seduced Leda in the guise of a swan.\nSpecifications:",
    imgUrl = "/robe.svg",
}) {
    return (
        <section className="bg-gray-100 rounded-3xl">
            <div className="container flex items-center justify-center px-5 py-24 mx-auto">
                <div className="flex ">
                    <div className="p-4 lg:w-1/3 md:w-full ">
                        <div className="flex flex-col p-8 bg-white border-2 border-gray-200 border-opacity-50 rounded-lg shadow-lg sm:flex-row">
                            <Image src={imgUrl} alt="NFT" />
                        </div>
                    </div>
                    <div className="p-4 lg:w-1/2 md:w-full">
                        <div className="flex flex-col w-full h-full p-8 bg-white rounded-lg shadow-lg sm:flex-row">
                            <div className="">
                                <h2 className="mb-3 text-lg font-medium text-gray-900 title-font">{title}</h2>
                                <h2 className="mb-3 font-medium text-gray-900 text-md title-font">Year: {origins}</h2>
                                <p className="text-base leading-relaxed">{description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}