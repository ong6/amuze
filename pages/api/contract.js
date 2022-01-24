const ethers = require("ethers");

const tourAddress = "0xB9dE71AdFa99FDB0313f381B12335D890C41D34f";
const custodyAddress = "0x70c326a3B6B7eF767d2eCE68D9C5b91A38FE92B7";
const muzeAddress = "0xDABAb1D8E95A491374CEe8280Be480A901a7C807";

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

// Mints the NFT that the user uploaded to the contract
export const mintUserNft = async (ipfsUrl, address) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const abi = [
    "function totalSupply() external view returns (uint256)",
    "function mint(address _to, uint256 _tokenId, string memory _tokenURI) external",
  ];
  const signer = provider.getSigner();
  const muzeTour = new ethers.Contract(tourAddress, abi, signer);

  const newTokenId = (await muzeTour.totalSupply()) + 1;

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
    "function tokenURI(uint256 tokenId) public view virtual override returns (string memory)",
  ];

  const signer = provider.getSigner();
  const muzeTour = new ethers.Contract(tourAddress, abi, signer);

  return await muzeTour.tokenURI(tokenId);
};

// Get a mapping of token ID to the IPFS hash
export const getHashesFromTokenIds = async (tokenIds) => {
  let hashes = {};
  let promises = [];

  console.log(tokenIds);

  for (let i = 0; i < tokenIds.length; i++) {
    promises.push(
      getHashFromTokenId(tokenIds[i]).then(
        (hash) => (hashes[tokenIds[i]] = hash)
      )
    );
  }

  await Promise.all(promises);

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
export const getEstimatedRewards = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const abi = [
    "function getEstimatedRewards() external view returns (uint256)",
  ];
  const signer = provider.getSigner();
  const custodyReward = new ethers.Contract(custodyAddress, abi, signer);

  return await custodyReward.getEstimatedRewards();
};
