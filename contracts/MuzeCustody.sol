// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777Sender.sol";
import "@openzeppelin/contracts/token/ERC777/IERC777Recipient.sol";
import "@openzeppelin/contracts/utils/introspection/IERC1820Registry.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract MuzeCustody is
  IERC777Sender,
  IERC777Recipient,
  IERC721Receiver,
  Ownable,
  AccessControl
{
  struct RentedNFT {
    address previousOwner;
    uint256 tokenId;
    uint256 timeLockExpiry;
  }

  struct TourStake {
    address previousOwner;
    uint256 numberOfTokens;
  }
  // Create a new role identifier for the minter role
  bytes32 public constant WHITELISTED_ROLE = keccak256("WHITELISTED_ROLE");

  // Registering with ERC1820 Registry that we can recieve ERC777
  IERC1820Registry private _erc1820 =
    IERC1820Registry(0x1820a4B7618BdE71Dce8cdc73aAB6C95905faD24);
  bytes32 private constant TOKENS_RECIPIENT_INTERFACE_HASH =
    keccak256("ERC777TokensRecipient");

  bytes4 private ERC721_SELECTOR =
    bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));

  uint256 public TOUR_ENTRY_FEE = 30 * (10**18);
  IERC777 public token;
  IERC721 public nft;

  bool hasTourClosed;

  // tour => account => t/f
  mapping(address => mapping(address => bool)) hasEntered;
  mapping(address => uint256) feesCollected;

  // for when we have more tours
  // mapping(address => RentedNFT[]) rents;
  // mapping(address => TourStake[]) stakes;

  RentedNFT[] public rents;
  address[] public lookupTable;
  uint256 public totalStaked;
  mapping(address => TourStake) public stake;

  event EnteredTour(address indexed person, address indexed tour);

  modifier onlyWhitelisted() {
    require(hasRole(WHITELISTED_ROLE, msg.sender), "Caller is not whitelisted");
    _;
  }

  constructor() {
    _erc1820.setInterfaceImplementer(
      address(this),
      TOKENS_RECIPIENT_INTERFACE_HASH,
      address(this)
    );
    _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
  }

  function addWhitelistedUser(address _address) external onlyOwner {
    _grantRole(WHITELISTED_ROLE, _address);
  }

  function hasEnteredTour(address _address) external view returns (bool) {
    return hasEntered[address(nft)][_address];
  }

  function getRents() external view returns (RentedNFT[] memory) {
    return rents;
  }

  function getEstimatedRewards(address _address)
    external
    view
    returns (uint256)
  {
    uint256 total = feesCollected[address(nft)];
    uint256 numOfTokens = stake[_address].numberOfTokens;

    return total * (numOfTokens / totalStaked);
  }

  function setTokenAddress(address _token) external onlyOwner {
    token = IERC777(_token);
  }

  function setNFTAddress(address _token) external onlyOwner {
    nft = IERC721(_token);
  }

  function enterTour(address _tour) external {
    require(!hasEntered[_tour][msg.sender], "Already entered tour");
    require(!hasTourClosed);
    hasEntered[_tour][msg.sender] = true;
    feesCollected[_tour] = feesCollected[_tour] + TOUR_ENTRY_FEE;
    token.operatorSend(msg.sender, address(this), TOUR_ENTRY_FEE, "", "");
    emit EnteredTour(msg.sender, _tour);
  }

  function onERC721Received(
    address,
    address _from,
    uint256 _tokenId,
    bytes calldata //_data
  ) external override(IERC721Receiver) returns (bytes4) {
    require(hasRole(WHITELISTED_ROLE, _from));
    RentedNFT memory newRent = RentedNFT({
      previousOwner: _from,
      tokenId: _tokenId,
      timeLockExpiry: block.timestamp + (14 * 86400) // 2 WEEKS
    });
    rents.push(newRent);

    if (stake[_from].previousOwner == _from) {
      stake[_from].numberOfTokens++;
    } else {
      lookupTable.push(_from);
      stake[_from] = TourStake({ previousOwner: _from, numberOfTokens: 1 });
    }

    totalStaked++;

    return ERC721_SELECTOR;
  }

  function redeemRewards(address _tour) external onlyWhitelisted {
    require(hasTourClosed);
    uint256 total = feesCollected[_tour];

    uint256 s = stake[msg.sender].numberOfTokens;
    token.send(msg.sender, total * (s / totalStaked), "");

    feesCollected[_tour] -= (total * (s / totalStaked));
  }

  function redeemNFT() external onlyWhitelisted {
    require(hasTourClosed);
    for (uint256 i = 0; i < rents.length; i++) {
      if (rents[i].previousOwner == msg.sender) {
        require(rents[i].timeLockExpiry < block.timestamp);
        nft.safeTransferFrom(address(this), msg.sender, rents[i].tokenId);
      }
    }
  }

  function forceCloseTour() external onlyWhitelisted {
    uint256 total = feesCollected[address(nft)];

    for (uint256 i = 0; i < lookupTable.length; i++) {
      uint256 s = stake[lookupTable[i]].numberOfTokens;
      token.send(lookupTable[i], total * (s / totalStaked), "");
      delete stake[lookupTable[i]];
    }

    feesCollected[address(nft)] = 0;

    delete lookupTable;

    for (uint256 i = 0; i < rents.length; i++) {
      nft.safeTransferFrom(
        address(this),
        rents[i].previousOwner,
        rents[i].tokenId
      );
    }

    delete rents;
  }

  // code to conform to ERC777TokensRecipient
  function tokensReceived(
    address operator,
    address from,
    address to,
    uint256 amount,
    bytes calldata userData,
    bytes calldata operatorData
  ) external override(IERC777Recipient) {}

  function tokensToSend(
    address operator,
    address from,
    address to,
    uint256 amount,
    bytes calldata userData,
    bytes calldata operatorData
  ) external override(IERC777Sender) {}
}
