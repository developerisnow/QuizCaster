import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window{
    ethereum?:MetaMaskInpageProvider
  }
}

interface ContractArtifact {
  abi: any;
  contractAddress: string;
}

const NFTQuizzArtifact: ContractArtifact = require('../../hardhat_contracts/contracts/artifacts/NFTQuizz.json');
const contractABI = NFTQuizzArtifact.abi;

const contractAddress = '0xA06B908f35e713a5E731BB9D1e50F3F347124e58'

export default function ConnectWalletAndMint() {
    const [isMinting, setIsMinting] = useState(false);
    const [error, setError] = useState('');
  
    useEffect(() => {
      console.log('Component mounted. Waiting for user to click the mint button.');
    }, []);

  const connectWalletHandler = async () => {
    console.log('Attempting to connect wallet...');
    if (typeof window.ethereum !== 'undefined') {
      console.log('Ethereum object found in window.');
      try {
        setIsMinting(true);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        console.log('Accounts found:', accounts);

        const web3Provider = new ethers.BrowserProvider(window.ethereum);
        console.log('Web3 provider initialized.');

        const signer = await web3Provider.getSigner();
        console.log('Signer obtained:', signer);

        const nftContract = new ethers.Contract(contractAddress, contractABI, signer)
        console.log('Contract object created:', nftContract);

        console.log('Calling safeMint with address 0x92fB257891a69FBb600Dc7e79EA4A4541254a200...');
        const tx = await nftContract.safeMint('0x92fB257891a69FBb600Dc7e79EA4A4541254a200')
        console.log('Minting transaction sent:', tx);

        console.log('Waiting for the transaction to be mined...');
        await tx.wait();
        console.log('Minted -- Transaction:', tx.hash);
      } catch (err) {
        console.error('Error during minting process:', err);
        setError(err.message);
      } finally {
        setIsMinting(false);
      }
    } else {
      console.log('Ethereum object does not exist! Make sure you have MetaMask installed.');
    }
  };

  return (
    <div>
      <div onClick={connectWalletHandler} disabled={isMinting}>
        {isMinting ? 'Minting...' : 'Connect Wallet & Mint'}
      </div>
      {/* {error && <p>Error: {error}</p>} */}
      <p>Connect your wallet to mint an NFT</p>
    </div>
  );
}

