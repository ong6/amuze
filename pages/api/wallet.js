import Coin from "../../public/logo.svg";
import { ethers } from "ethers";
import { useRouter } from "next/router";

const tourAddress = "0x964F854F19716B2633c3b7E663Bbb18bE5fD3d87";
const custodyAddress = "0x3f70fAeA8C66F6E4F4ACdEd35D8292aCe3d499Aa";
const muzeAddress = "0x99C1b88CC20F6192d22B7dF0AAe123301262d978";

// Adds the muze coin to your wallet
export const addMuze = async () => {
  const tokenSymbol = "MUZE";
  const tokenDecimals = 18;
  const tokenImage = window.location.href + Coin.src;

  try {
    const wasAdded = await ethereum.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20", // Initially only supports ERC20, but eventually more!
        options: {
          address: muzeAddress, // The address that the token is at.
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

// Pays the museum 30 muze
export const handlePayment = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const abi = [
    "function enterTour(address _tour) external",
    "function hasEnteredTour(address _tour) external view returns (bool)",
  ];
  const signer = provider.getSigner();
  const muzeCustody = new ethers.Contract(custodyAddress, abi, signer);

  if (!(await muzeCustody.hasEnteredTour(tourAddress))) {
    try {
      await muzeCustody.enterTour(tourAddress);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  console.log("you already bought the tour");
  return true;
};

export const swapEthToMuze = async (ether) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const abi = ["function fakeSwap() external payable"];
  const signer = provider.getSigner();
  const muzeErc20 = new ethers.Contract(muzeAddress, abi, signer);

  await muzeErc20.fakeSwap({
    value: ethers.utils.parseUnits(ether, "ether").toString(),
  });
};
