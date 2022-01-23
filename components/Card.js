import Image from "next/image";
import Link from "next/link";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalCloseButton,
	SimpleGrid,
	GridItem,
	Container,
	localStorageManager,
	Button,
	useDisclosure,
} from "@chakra-ui/react";
import Entry from "./museum/Entry";
export default function Card({
	title = "Topkapi Palace Museum",
	description = "In the 15th and 16th centuries it served as the main administrative ...",
	label = "Entrance Fee",
	imgUrl = "/topkapi.png",
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<div className="flex flex-wrap">
			<div className="p-4">
				<div className="h-full overflow-hidden border-2 border-gray-200 rounded-3xl border-opacity-60">
					<Image
						className="object-cover object-center w-full lg:h-48 md:h-36"
						width={373}
						height={250}
						layout="responsive"
						src={imgUrl}
						alt="video"
					/>
					<div className="p-6 bg-white">
						<h1 className="text-lg font-bold text-gray-900 ">{title}</h1>
						<span className="text-sm text-ellipsis">{description}</span>
						<span className="text-indigo-500"> Read More</span>
					</div>
					<div className="flex items-center justify-between p-4 bg-gray-100">
						<div>
							<p className="inline-flex items-center text-sm text-gray-400 md:mb-2 lg:mb-0">
								{label}
							</p>
							<p className="text-lg font-bold text-left text-gray-900">
								30 MUZE
							</p>
						</div>
						<Button
							className="flex"
							rounded={"3xl"}
							colorScheme="purple"
							onClick={onOpen}>
							Buy Ticket
						</Button>
					</div>
				</div>
			</div>
			<Modal isOpen={isOpen} onClose={onClose} size="lg">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Buy Ticket</ModalHeader>
					<ModalCloseButton />
					<ModalBody borderRadius="xl">
						<Entry />
					</ModalBody>
				</ModalContent>
			</Modal>
		</div>
	);
}
