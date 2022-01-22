import {
	Box,
	Button,
	Container,
	Divider,
	Icon,
	Image,
	Input,
} from "@chakra-ui/react";
import React from "react";
import { Go } from "../../public/museum_pic/go.svg";
import { FaEthereum } from "react-icons/fa";
import { BsArrowDownCircle } from "react-icons/bs";
import { GiTicket } from "react-icons/gi";

export default function Entry() {
	return (
		<Container className="bg-white p-8 self-center rounded-xl" maxW="lg">
			<div className="flex flex-col space-y-4">
				{/* 1 */}
				<div className="flex flex-row justify-between">
					<span className="flex flex-row items-center space-x-3">
						<Image src="/museum_pic/go.svg" alt="go" layout="fill" />
						<div className="font-bold text-2xl text-orange-400">SWAP $MUZE</div>
					</span>
				</div>
				{/* payment section */}

				<div className="flex flex-col pt-2 space-y-8 p-3 ">
					<InputEntry />
					<Icon as={BsArrowDownCircle} w={8} h={8} className="self-center" />
					<InputReceive />
					<div className="self-center font-base text-gray-700 text-sm">
						1 ETH = 3300 MUZE
					</div>
					<div className="flex flex-col space-y-2">
						<Button
							className="w-full"
							colorScheme="orange"
							size="lg"
							bg={"orange.400"}
							rounded={15}>
							Confirm Order
						</Button>
						<div className="self-center font-base text-gray-700 text-sm">
							Enter an amount to see more trading details
						</div>
					</div>
				</div>

				<Divider borderColor={"purple.500"} />

				{/* enter section */}
				<div className="flex flex-col pt-4 px-4 space-y-6">
					<div className="flex flex-row items-center justify-center">
						You have selected:
						<div className="text-purple-500 pl-2 items-center">
							National Museum of Singapore <Icon as={GiTicket} w={4} h={4} />
						</div>
					</div>
					<Button
						className="w-full"
						colorScheme="purple"
						size="lg"
						bg={"purple.500"}
						rounded={15}>
						Enter Museum
					</Button>
				</div>
			</div>
		</Container>
	);
}

function InputEntry() {
	const [value, setValue] = React.useState("");
	const handleChange = (event) => setValue(event.target.value);

	return (
		<div>
			<div className="flex flex-col space-y-2">
				<div className="flex flex-row justify-between text-gary-900">
					<div className="div">Pay</div>
					<div className=" underline">Available:0.05</div>
				</div>
				<div className="border-4 rounded-xl border-orange-400 px-4 py-3">
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between">
						<span className="flex flex-row items-center space-x-4">
							<Icon as={FaEthereum} w={5} h={5} />
							<div className="font-semibold text-base">ETH</div>
						</span>
						<Input
							variant="unstyled"
							placeholder="0.01"
							w="30%"
							className="text-right font-bold"
							onChange={handleChange}
							value={value}
							type="number"
							size="lg"
						/>
					</Box>
				</div>
			</div>
		</div>
	);
}

function InputReceive() {
	const [value, setValue] = React.useState("");
	const handleChange = (event) => setValue(event.target.value);

	return (
		<div>
			<div className="flex flex-col space-y-2">
				<div className="flex flex-row justify-between text-gary-900">
					<div className="div">Receive (Estimated)</div>
					<div className=" underline">Available:0.00</div>
				</div>
				<div className="border-4 rounded-xl border-orange-400 px-4 py-3">
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-between">
						<span className="flex flex-row items-center space-x-4">
							<Image src={"/favicon.ico"} w={5} h={5} alt="coin" />
							<div className="font-semibold text-base">MUZE</div>
						</span>
						<Input
							variant="unstyled"
							placeholder="0.00"
							w="30%"
							className="text-right font-bold"
							onChange={handleChange}
							value={value}
							type="number"
							size="lg"
						/>
					</Box>
				</div>
			</div>
		</div>
	);
}
