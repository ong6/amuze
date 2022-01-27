const ethers = require("ethers");
const Web3 = require("web3");
import abi from "../../public/abi.json";

const tourAddress = "0xbF3a365396E3e58E359F17Aa1fe79cC3b9E2F409";
const custodyAddress = "0x87576ee1d14e8F8A4dBAD4F73208cc807ba15c47";
const muzeAddress = "0x4274772d79e94cAD912DED4781E70343F6EB758B";
const whiteListedHash =
  "0x8429d542926e6695b59ac6fbdcd9b37e8b1aeb757afab06ab60b1bb5878c3b49";

//Gets a list of token id belonging to the user address
export const getTokenIdsUser = async (address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const abi = [
    "function balanceOf(address owner) external view returns (uint256 balance)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) external view returns (uint256 tokenId)",
  ];

  const signer = provider.getSigner();
  const muzeTour = new ethers.Contract(tourAddress, abi, signer);
  const numOfNfts = await muzeTour.balanceOf(address);

  let tokenIds = [];
  let promises = [];

  for (let i = 0; i < numOfNfts; i++) {
    promises.push(
      muzeTour
        .tokenOfOwnerByIndex(address, i)
        .then((tokenId) => tokenIds.push(tokenId))
    );
  }

  await Promise.all(promises);

  return tokenIds;
};

//Get a list of token id belonging to the tour address
export const getTokenIdsForMuseum = async () => {
  const web3 = new Web3(
    `https://rinkeby.infura.io/v3/91497597cc9a407f8cca5e815275dcbd`
  );
  // console.log(abi);
  const contract = new web3.eth.Contract(abi, custodyAddress);

  const rents = await contract.methods.getRents().call();
  // console.log(rents);
  return rents.map((rent) => rent.tokenId);
};

//Get a list of token id belonging to the tour address
export const getTokenIdsRented = async (address) => {
  const web3 = new Web3(
    `https://rinkeby.infura.io/v3/91497597cc9a407f8cca5e815275dcbd`
  );
  // console.log(abi);
  const contract = new web3.eth.Contract(abi, custodyAddress);

  const rents = await contract.methods.getRents().call();
  // console.log(rents);
  return rents
    .filter((e) => e.previousOwner === address)
    .map((rent) => rent.tokenId);
};

// Mints the NFT that the user uploaded to the contract
export const mintUserNft = async (ipfsUrl, address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const abi = [
    "function totalSupply() external view returns (uint256)",
    "function mint(address _to, uint256 _tokenId, string memory _tokenURI) external",
  ];
  const signer = provider.getSigner();
  const muzeTour = new ethers.Contract(tourAddress, abi, signer);
  const newTokenId = Number(await muzeTour.totalSupply()) + 1;

  // eg: https://ipfs.infura.io/ipfs/QmdhZvbz1nXMSUZUL8BdSW8THWefYZNNp4G4pHJtAWe2wn
  await muzeTour.mint(address, newTokenId, ipfsUrl);
};

// Rents the current selected NFT to the museum
export const rentToMuseum = async (tokenId, address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const abi = [
    "function safeTransferFrom(address from, address to, uint256 tokenId) external",
  ];
  const signer = provider.getSigner();
  const muzeTour = new ethers.Contract(tourAddress, abi, signer);

  await muzeTour.safeTransferFrom(address, custodyAddress, tokenId);
};

// Get the Hash ID for IPFS from the token ID
export const getHashFromTokenId = async (tokenId) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const abi = [
    "function tokenURI(uint256 tokenId) public view returns (string memory)",
  ];

  const signer = provider.getSigner();
  const muzeTour = new ethers.Contract(tourAddress, abi, signer);
  const hash = await muzeTour.tokenURI(tokenId);
  return hash;
};

// Get a mapping of token ID to the IPFS hash
export const getHashesFromTokenIds = async (tokenIds) => {
  let hashes = {};
  let promises = [];
  try {
    for (let i = 0; i < tokenIds.length; i++) {
      promises.push(
        getHashFromTokenId(tokenIds[i]).then(
          (hash) => (hashes[tokenIds[i]] = hash)
        )
      );
    }
    await Promise.all(promises);
  } catch (err) {
    console.log(err);
  }
  return hashes;
};

// Get the rewards from contract
export const getRewards = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const abi = ["function redeemRewards(address _tour) external"];
  const signer = provider.getSigner();
  const custodyReward = new ethers.Contract(custodyAddress, abi, signer);

  return await custodyReward.redeemRewards(tourAddress);
};

// Get the estimated rewards from the contract
export const getEstimatedRewards = async (address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const abi = [
    "function getEstimatedRewards(address _address) external view returns (uint256)",
  ];
  const signer = provider.getSigner();
  const custodyReward = new ethers.Contract(custodyAddress, abi, signer);
  return custodyReward.getEstimatedRewards(address);
};

export const isWhitelisted = async (address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const abi = [
    "function hasRole(bytes32 _role, address _address) external view returns (bool)",
  ];
  const signer = provider.getSigner();
  const custodyReward = new ethers.Contract(custodyAddress, abi, signer);

  return custodyReward.hasRole(whiteListedHash, address);
};

// export const addWhiteListedPeople = aync (address) => {

// }
