import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function Card({
	title = "Topkapi Palace Museum",
	description = "In the 15th and 16th centuries it served as the main administrative ...",
	label = "Entrance Fee",
	imgUrl = "/topkapi.png",
}) {
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
						<span className="text-sm">{description}</span>
						<span className="text-indigo-500">Read More</span>
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
						<Link href="/museum/singapore" passHref>
							<Button className="flex" rounded={"3xl"} colorScheme="purple">
								Buy Ticket
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
