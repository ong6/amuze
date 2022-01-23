// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract MuzeTour is ERC721URIStorage {

  constructor() ERC721("Chinese Artefacts of the Qing Dynasty Tour", "QDT") {
  }

  function mint(address _to, uint256 _tokenId, string memory _tokenURI) external {
    _safeMint(_to, _tokenId);
    _setTokenURI(_tokenId, _tokenURI);
  }
}
