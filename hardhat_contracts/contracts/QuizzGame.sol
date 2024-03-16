// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./NFTQuizz.sol"; // Assume this is your NFT contract

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract QuizGame {
    IERC20 public apeCoin;
    NFTQuizz public nftContract;
    address public owner;
    uint256 public startTime;
    uint256 public endTime;
    uint256 public entryFee;
    mapping(address => uint256) public userScores;
    address [] public fullScoresAdresses; // user's adresses who made 100% good answers =  50/50 ok 

    mapping(address => bool) public hasParticipated;
    mapping(address => bool) public hasContributed;


    constructor(address _apeCoinAddress, address _nftContractAddress, uint256 _entryFee, uint256 _duration) {
        apeCoin = IERC20(_apeCoinAddress);
        nftContract = NFTQuizz(_nftContractAddress);
        owner = msg.sender;
        entryFee = _entryFee;
        startTime = block.timestamp;
        endTime = startTime + _duration;
    }

    function rewardParticipationWithNFT(uint256 _userScore) external {
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Quiz is not active");
        require(!hasParticipated[msg.sender], "Already participated");
        require(hasContributed[msg.sender], "No Contribution to Pool Prize");

        userScores[msg.sender] = _userScore;

        if( _userScore == 50)
        {
            fullScoresAdresses.push(msg.sender); 

        }
        hasParticipated[msg.sender] = true;

        // It will generate NFT according to the score of the user
        nftContract.safeMint(msg.sender, _userScore);
    }

    function contributeToPoolPrize()   external{
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Quiz is not active");
        require(apeCoin.transferFrom(msg.sender, address(this), entryFee), "Failed to transfer entry fee");
        hasContributed[msg.sender] = true;
    }

    function distributePrizes() external {
    require(block.timestamp > endTime, "Quiz is still active");
    require(msg.sender == owner, "Only the owner can distribute prizes");

    uint256 numberOfWinners = fullScoresAdresses.length;
    require(numberOfWinners > 0, "No winners to distribute prizes to");

    uint256 totalPrize = apeCoin.balanceOf(address(this));
    uint256 prizePerWinner = totalPrize / numberOfWinners;

    // TODO : need toi handle gaz fees , deduce them from the prize sent to the winners 
    for (uint i = 0; i < numberOfWinners; i++) {
        require(apeCoin.transfer(fullScoresAdresses[i], prizePerWinner), "Failed to transfer prize");
    }
}

}
