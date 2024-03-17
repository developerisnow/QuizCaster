import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function App() {
  const [account, setAccount] = useState('');

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed, get the account
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("You need to allow MetaMask.");
      }
    } else {
      alert('You need to install MetaMask!');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Your account: {account}
        </p>
      </header>
    </div>
  );
}

export default App;
