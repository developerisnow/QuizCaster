pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./NFTQuizz.sol"; // Assume this is your NFT contract

contract QuizGame {
    IERC20 public apeCoin;
    NFTQuizz public nftContract;
    address public owner;
    uint256 public startTime;
    uint256 public endTime;
    uint256 public entryFee;
    mapping(address => uint256) public userScores;
    mapping(address => bool) public hasParticipated;

    constructor(address _apeCoinAddress, address _nftContractAddress, uint256 _entryFee, uint256 _duration) {
        apeCoin = IERC20(_apeCoinAddress);
        nftContract = NFTQuizz(_nftContractAddress);
        owner = msg.sender;
        entryFee = _entryFee;
        startTime = block.timestamp;
        endTime = startTime + _duration;
    }

    function participate(uint256 _userScore) external {
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Quiz is not active");
        require(!hasParticipated[msg.sender], "Already participated");
        require(apeCoin.transferFrom(msg.sender, address(this), entryFee), "Failed to transfer entry fee");

        userScores[msg.sender] = _userScore;
        hasParticipated[msg.sender] = true;

        // Example logic for NFT assignment
        if (_userScore >= 1 && _userScore <= 10) {
            nftContract.mint(msg.sender, 1); // Assuming mint function takes user address and NFT version
        }
        // Add other conditions for different NFTs
    }

    // Function to distribute prize pool among winners, to be called after quiz ends
    function distributePrizes() external {
        require(block.timestamp > endTime, "Quiz is still active");
        // Add logic to distribute ApeCoin to winners
    }
}

