import {
	Button,
	useDisclosure,
	Drawer,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	Image,
} from "@chakra-ui/react";
import CollectItemDetail from "./CollectItemDetail";
export default function CollectItem({
	title = "Qing Dynasty Stone Statue",
	description = "item description",
	origins = "1644 to 1912",
	country = "China",
	owner = "Qing Shi Huang",
	imgUrl = "/robe.svg",
	audio = "https://amuze.vercel.app/hackathon/1.mp3",
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<div className="flex flex-wrap">
			<div className="rounded-3xl">
				<Image
					className="object-cover object-center w-full lg:h-48 md:h-36"
					width={373}
					height={250}
					layout="responsive"
					src={imgUrl}
					alt="video"
				/>
				<div className="flex flex-col gap-3 p-4 bg-gray-100 rounded-b-3xl">
					<h1 className="h-10 font-bold text-gray-900 text-md">{title}</h1>
					<div className="flex items-end justify-between gap-3 ">
						<div className="flex flex-col">
							<p className="inline-flex items-center text-sm text-gray-400 md:mb-2 lg:mb-0">
								Origin: {origins}
							</p>
							<p className="inline-flex items-center text-sm text-gray-400 md:mb-2 lg:mb-0">
								Country: {country}
							</p>
							<p className="inline-flex items-center text-sm text-gray-400 md:mb-2 lg:mb-0">
								Owner: {owner}
							</p>
						</div>
						<Button
							className="flex"
							rounded={"3xl"}
							size="xs"
							colorScheme="purple"
							onClick={onOpen}>
							Learn More
						</Button>
					</div>
				</div>
			</div>
			<Drawer placement={"bottom"} onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth="1px">NFT Details</DrawerHeader>
					<DrawerBody className="bg-gray-100">
						<CollectItemDetail imgUrl={imgUrl} title={title} audio={audio} description={description} />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</div>
	);
}
