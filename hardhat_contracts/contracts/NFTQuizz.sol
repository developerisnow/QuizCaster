// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTQuizz is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public tokenIdCounter;
 
   // Metadata information for each stage of the NFT on IPFS.
    string[] IpfsUri = [
        "https://ipfs.io/ipfs/QmSX75ufmhmtPz4cEYMBwLwpACKFzHpu94AsMidRW7A1mv", // NFT winner 
        "https://ipfs.io/ipfs/QmcusKgN4XKSLcJjHD9WF7WAuww6mmcGUkUWKgQsXhW7vA/photo02.json",
        "https://ipfs.io/ipfs/QmcusKgN4XKSLcJjHD9WF7WAuww6mmcGUkUWKgQsXhW7vA/photo03.json",
        "https://ipfs.io/ipfs/QmcusKgN4XKSLcJjHD9WF7WAuww6mmcGUkUWKgQsXhW7vA/photo03.json",
        "https://ipfs.io/ipfs/QmcusKgN4XKSLcJjHD9WF7WAuww6mmcGUkUWKgQsXhW7vA/photo02.json",
        "https://ipfs.io/ipfs/QmSX75ufmhmtPz4cEYMBwLwpACKFzHpu94AsMidRW7A1mv" // NFT winner 
    ];


    constructor() ERC721("NFT Quizz Levels", "NQL") {
    }


    function safeMint(address to) public {
        //require(quizzScore <= 5, "Invalid quizzScore, must be in the range [0..5]");

        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, IpfsUri[0]);
    }

    // the quizzScore is supposed to be on the range [0 ... 50]
    // if score is between 0..9 : the gamer gets NFT_1
    // if score is between 10..19 : the gamer gets NFT_2
    // if score is between 20..29 : the gamer gets NFT_3
    // if score is between 30..39 : the gamer gets NFT_4
    // if score is between 40..49 : the gamer gets NFT_5
    function safeMint_Score(address to, uint256 quizzScore) public {
        require(quizzScore <= 50, "Invalid quizzScore, must be in the range [0..50]");

        uint256 tokenId = tokenIdCounter.current();
        tokenIdCounter.increment();
        _safeMint(to, tokenId);

        // Determine the URI index based on the quizzScore.
        // Dividing quizzScore by 10 categorizes the scores into different ranges.
        uint uriIndex = quizzScore/10;

        // Ensure uriIndex is within the bounds of your IPFS URI array.
        require(uriIndex < IpfsUri.length, "URI index is out of bounds");

        // Set the token URI based on the calculated index.
        _setTokenURI(tokenId, IpfsUri[uriIndex]);
    }

    function tokenURI(uint256 tokenId)
        public view override(ERC721, ERC721URIStorage) returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // The following function is an override required by Solidity.
   // function _burn(uint256 tokenId) internal virtual override(ERC721, ERC721URIStorage)
    //{
    //    super._burn(tokenId);
   // }
    
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
