import { ethers } from "ethers";
import NFTQuizz from '../../hardhat_contracts/contracts/artifacts/NFTQuizz.json'; // Adjust the path as necessary

const contractABI = NFTQuizz.abi;
const contractAddress = '0xA06B908f35e713a5E731BB9D1e50F3F347124e58'; // Replace with actual contract address

export const mintNFT = async (address) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    // Force provider to use Sepolia network
    await provider.send("wallet_switchEthereumChain", [{ chainId: ethers.utils.hexlify(11155111) }]); // Sepolia's chainId in hex

    const signer = provider.getSigner();
    const nftContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log(`Network: ${provider.network}`);
    // console.log(`nftContract: ${JSON.stringify(nftContract, null, 2)}`);
    console.log(`ChainID: ${provider.chainId}`);
    console.log('Connecting to contract for minting on Sepolia network...');
    console.log(`Using contract address: ${contractAddress}`);
    console.log(`Minting NFT to address: ${address}`);


    const tx = await nftContract.safeMint(address);
    console.log(`From: ${tx.from}`);
    console.log(`Minting transaction sent: ${tx.hash}`);
    console.log('Transaction details:', tx);

    await tx.wait();
    console.log('NFT minted successfully. Transaction hash:', tx.hash);
  } catch (error) {
    console.error('Error during minting process:', error);
  }
};
