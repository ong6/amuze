import {
	Box,
	Button,
	Container,
	Divider,
	Icon,
	Image,
	Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Go } from "../../public/museum_pic/go.svg";
import { FaEthereum } from "react-icons/fa";
import { BsArrowDownCircle } from "react-icons/bs";
import { GiTicket } from "react-icons/gi";
import Coin from "../../public/logo.svg";
import { ethers } from "ethers";

export default function Entry() {
	const [muze, setMuze] = useState(null);

	const onSubmit = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum);
		await provider.send("eth_requestAccoun ts", []);
		const signer = provider.getSigner();
	};

	const addMuze = async () => {
		const contractAddr = "0xec91c38f021149f72e4d7788c39cf3d941afa3a6";
		const tokenSymbol = "MUZE";
		const tokenDecimals = 18;
		const tokenImage = window.location.href + Coin.src;

		try {
			const wasAdded = await ethereum.request({
				method: "wallet_watchAsset",
				params: {
					type: "ERC20", // Initially only supports ERC20, but eventually more!
					options: {
						address: contractAddr, // The address that the token is at.
						symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
						decimals: tokenDecimals, // The number of decimals in the token
						image: tokenImage, // A string url of the token logo
					},
				},
			});

			if (wasAdded) {
				console.log("Thanks for adding!");
			} else {
				console.log("Your loss!");
			}
		} catch (error) {
			console.log(error);
		}
	};

	function TopSection() {
		const [ether, setEther] = useState("");
		const handleChange = (event) => setEther(event.target.value);

		return (
			<div className="flex flex-col pt-2 space-y-8 p-3 ">
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
								value={ether}
								type="number"
								size="lg"
							/>
						</Box>
					</div>
				</div>
				<Icon as={BsArrowDownCircle} w={8} h={8} className="self-center" />
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
								value={ether * 3300}
								size="lg"
								isReadOnly
							/>
						</Box>
					</div>
				</div>
				<div className="self-center font-base text-gray-700 text-sm">
					1 ETH = 3300 MUZE
				</div>
				<div className="flex flex-col space-y-2">
					<Button
						className="w-full"
						colorScheme="orange"
						size="lg"
						bg={"orange.400"}
						rounded={15}
						onClick={addMuze}>
						Add $MUZE
					</Button>
					<Button
						className="w-full"
						colorScheme="orange"
						size="lg"
						bg={"orange.400"}
						rounded={15}
						onClick={onSubmit}>
						Confirm Order
					</Button>
					<div className="self-center font-base text-gray-700 text-sm">
						Enter an amount to see more trading details
					</div>
				</div>
			</div>
		);
	}

	return (
		<Container className="bg-white p-8 self-center rounded-xl" maxW="lg">
			<div className="flex flex-col space-y-4">
				{/* 1 */}
				<div className="flex flex-row justify-between">
					<span className="flex flex-row items-center space-x-3">
						<Image src="/museum_pic/go.svg" alt="go" layout="fill" />
						<div className="font-bold text-2xl text-orange-400">SWAP $MUZE</div>
					</span>
					<span>Entrance Fee: {30} MUZE</span>
				</div>
				{/* payment section */}
				<TopSection />

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
