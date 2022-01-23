const ethers = require("ethers");

const tourAddress = "0xB9dE71AdFa99FDB0313f381B12335D890C41D34f";
const custodyAddress = "0x70c326a3B6B7eF767d2eCE68D9C5b91A38FE92B7";
const muzeAddress = "0xDABAb1D8E95A491374CEe8280Be480A901a7C807";

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
export const handlePayment = async (router) => {
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
      return console.log(error);
    }
  }
  router.push("/museum/singapore");
};
