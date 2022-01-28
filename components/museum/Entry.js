import {
  Box,
  Button,
  Container,
  Divider,
  Icon,
  Image,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import { FaEthereum } from "react-icons/fa";
import { GiTicket } from "react-icons/gi";
import { MetaContext } from "../../context/MetaContext";
import { addMuze, handlePayment, swapEthToMuze } from "../../pages/api/wallet";

export default function Entry({ title, id }) {
  const { address, network, viewMode } = useContext(MetaContext);
  const router = useRouter();

  const enterMuseum = async () => {
    if (viewMode) {
      router.push(`tours/${id}`);
    } else {
      if (await handlePayment(address)) {
        router.push(`tours/${id}`);
      } else {
        console.log("You didn't pay");
      }
    }
  };

  function TopSection() {
    const [ether, setEther] = useState("0");
    const handleChange = (event) => setEther(event.target.value);

    return (
      <div className="flex flex-col p-3 pt-2 space-y-8 ">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row justify-between text-gary-900">
            <div className="div">Pay</div>
            <div className="underline ">Available:0.05</div>
          </div>
          <div className="px-4 py-3 border-4 border-orange-400 rounded-xl">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <span className="flex flex-row items-center space-x-4">
                <Icon as={FaEthereum} w={5} h={5} />
                <div className="text-base font-semibold">ETH</div>
              </span>
              <Input
                variant="unstyled"
                placeholder="0.01"
                w="30%"
                className="font-bold text-right"
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
            <div className="underline ">Available:0.00</div>
          </div>
          <div className="px-4 py-3 border-4 border-orange-400 rounded-xl">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <span className="flex flex-row items-center space-x-4">
                <Image src={"/favicon.ico"} w={5} h={5} alt="coin" />
                <div className="text-base font-semibold">MUZE</div>
              </span>
              <Input
                variant="unstyled"
                placeholder="0.00"
                w="30%"
                className="font-bold text-right"
                value={ether * 3300}
                size="lg"
                isReadOnly
              />
            </Box>
          </div>
        </div>
        <div className="self-center text-sm text-gray-700 font-base">
          1 ETH = 3300 MUZE
        </div>
        <div className="flex flex-col space-y-2">
          <Button
            className="w-full"
            colorScheme="orange"
            size="lg"
            bg={"orange.400"}
            rounded={15}
            onClick={addMuze}
          >
            Add $MUZE
          </Button>
          <Button
            className="w-full"
            colorScheme="orange"
            size="lg"
            bg={"orange.400"}
            rounded={15}
            onClick={() => swapEthToMuze(ether)}
          >
            Confirm Order
          </Button>
          <div className="self-center text-sm text-gray-700 font-base">
            Enter an amount to see more trading details
          </div>
        </div>
      </div>
    );
  }

  return (
    <Container className="self-center p-8 bg-white rounded-xl" maxW="lg">
      {address && network ? (
        <div className="flex flex-col space-y-4">
          {/* 1 */}
          <div className="flex flex-row justify-between">
            <span className="flex flex-row items-center space-x-3">
              <Image src="/museum_pic/go.svg" alt="go" layout="fill" />
              <div className="text-2xl font-bold text-orange-400">
                SWAP $MUZE
              </div>
            </span>
            <span>Entrance Fee: {30} MUZE</span>
          </div>
          {/* payment section */}
          <TopSection />

          <Divider borderColor={"purple.500"} />
          {/* enter section */}
          <div className="flex flex-col px-4 pt-4 space-y-6">
            <div className="flex flex-row items-center justify-center">
              You have selected:
              <div className="items-center pl-2 text-purple-500">
                {title} <Icon as={GiTicket} w={4} h={4} />
              </div>
            </div>
            <Button
              className="w-full"
              colorScheme="purple"
              size="lg"
              bg={"purple.500"}
              rounded={15}
              onClick={enterMuseum}
            >
              Enter Museum Tour
            </Button>
          </div>
        </div>
      ) : (
        <div className="[height:50vh] flex text-4xl text-black items-center justify-center">
          {network
            ? "Please connect your wallet before entering the museum tour"
            : "Please connect to the Rinkeby test network!"}
        </div>
      )}
    </Container>
  );
}

// const payment = async ({ ether = 5 }) => {
// 	try {
// 		if (!window.ethereum)
// 			throw new Error("No crypto wallet found. Please install it.");

// 		await window.ethereum.send("eth_requestAccounts");
// 		const provider = new ethers.providers.Web3Provider(window.ethereum);
// 		const signer = provider.getSigner();
// 		ethers.utils.getAddress(payment_addr);
// 		const { hash } = await signer.sendTransaction({
// 			to: payment_addr,
// 			value: ethers.utils.parseEther(ether),
// 		});
// 		await provider.waitForTransaction(hash);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// const handlePayment = async (amt) => {
// 	await payment({
// 		ether: amt,
// 	});
// };
