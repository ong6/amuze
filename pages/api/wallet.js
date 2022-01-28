import { ethers } from "ethers";

const tourAddress = "0x57B6A575aa2574A561C26A1297659803e6328aEa";
const custodyAddress = "0x0Ee09710D1ca4E6AE555aEafc3D12A76F0fCD66B";
const muzeAddress = "0xfc4931C661963A3ABF4f9BE6c5902b3E12f9bBb9";
const whiteListedHash =
  "0x8429d542926e6695b59ac6fbdcd9b37e8b1aeb757afab06ab60b1bb5878c3b49";

// Adds the muze coin to your wallet
export const addMuze = async () => {
  const tokenSymbol = "MUZE";
  const tokenDecimals = 18;
  const tokenImage = "https://amuze.vercel.app/logo.png";

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
      toast({
        title: "$MUZE added!",
        description: "You have added $MUZE to your account!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
    } else {
      console.log("Your loss!");
    }
  } catch (error) {
    console.log(error);
  }
};

// Pays the museum 30 muze
export const handlePayment = async (address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const abi = [
    "function enterTour(address _tour) external",
    "function hasEnteredTour(address _address) external view returns (bool)",
  ];
  const signer = provider.getSigner();
  const muzeCustody = new ethers.Contract(custodyAddress, abi, signer);

  if (!(await muzeCustody.hasEnteredTour(address))) {
    try {
      await muzeCustody.enterTour(tourAddress);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  return true;
};

export const swapEthToMuze = async (ether) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const abi = ["function swap() external payable"];
  const signer = provider.getSigner();
  const muzeErc20 = new ethers.Contract(muzeAddress, abi, signer);

  await muzeErc20.swap({
    value: ethers.utils.parseUnits(ether, "ether").toString(),
  });
};
