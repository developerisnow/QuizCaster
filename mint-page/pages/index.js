import { useState, useEffect } from "react";
import { mintNFT } from "../utils/sign"; // Ensure this is the updated function
import Link from "next/link";
import Metamask from "../component/metamask";

const Index = () => {
  const [haveMetamask, sethaveMetamask] = useState(true);
  const [client, setclient] = useState({ isConnected: false });

  const checkConnection = async () => {
    const { ethereum } = window;
    if (ethereum) {
      console.log("Checking MetaMask connection...");
      sethaveMetamask(true);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("Accounts found:", accounts);
      if (accounts.length > 0) {
        setclient({
          isConnected: true,
          address: accounts[0],
        });
        console.log(`Connected with address: ${accounts[0]}`);
      } else {
        setclient({
          isConnected: false,
        });
        console.log("No accounts connected.");
      }
    } else {
      sethaveMetamask(false);
      console.log("MetaMask is not installed.");
    }
  };

  const connectWeb3 = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }

      console.log("Requesting account access...");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Accounts received:", accounts);

      setclient({
        isConnected: true,
        address: accounts[0],
      });
      console.log(`Connected with address: ${accounts[0]}`);
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  useEffect(() => {
    checkConnection();
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="fren-nav d-flex">
        {/* <div>
          <h3>MENU_</h3>
        </div> */}
        <div className="d-flex" style={{ marginLeft: "auto" }}>
          <div>
            <button className="btn connect-btn" onClick={connectWeb3}>
              {client.isConnected ? (
                <>
                  {client.address.slice(0, 4)}...
                  {client.address.slice(38, 42)}
                </>
              ) : (
                <>Connect Wallet</>
              )}
            </button>
          </div>
          <div>
            <Link href="https://twitter.com/asaolu_elijah">
              <button className="btn tw-btn">TW</button>
            </Link>
          </div>
        </div>
      </nav>
      {/* Navbar end */}

      <section className="container d-flex">
        <main>
          <h1 className="main-title">QuizCaster 🚀</h1>

          <p className="main-desc">
          Introducing Web3 Blockchain Education within Farcaster frames!  <br /> 🎓 Dive into the blockchain, directly engage with your audience, and learn effortlessly. 
          </p>

          <div>
            {!haveMetamask ? (
              <Metamask />
            ) : client.isConnected ? (
              <>
                <button
                  onClick={() => mintNFT(client.address)}
                  type="button"
                  className="btn sign-btn"
                  style={{ fontSize: '20px', padding: '10px 20px', margin: '10px 0' }} // Enhanced styling for prominence
                >
                  Mint NFT
                </button>
                <h2>You're connected ✅</h2>
                {/* <div>
                  <h3>Learn About Blockchain & NFTs</h3>
                  Introducing Web3 Blockchain Education within Farcaster frames! 🎓 Dive into the blockchain, directly engage with your audience, and learn effortlessly. 

                  Our project, at its core, is an innovative platform that seamlessly integrates Web3 Blockchain Education into the Farcaster ecosystem. This initiative is designed to break down the complexities of blockchain technology, making it accessible, understandable, and engaging for a wide audience, directly within the context of their Farcaster experiences the hottest place in Web3's galaxy!!!

                  This is only the beginning!!!

                  Why It Matters:

                  Blockchain technology is rapidly becoming a foundational element in the digital economy, with applications ranging from finance and supply chain to art and entertainment. However, the complexity of the technology and its underpinning concepts can be a barrier to entry for many. By integrating Web3 Blockchain Education directly into Farcaster frames, we are not just simplifying these concepts but also making learning about blockchain accessible, engaging and safer by directly targeting user interests and activities on Farcaster.

                  Our project is more than just an educational platform; it's a bridge connecting education directly into the digital space they are socially growing to love and trust. Through this initiative, we aim to empower individuals and upskill them with the crucial knowledge and skills to participate confidently in the Web3 revolution.

                  What It Does:

                  Direct Integration into Farcaster Frames: By embedding our educational content directly into Farcaster frames, we make learning about blockchain technology an integrated and integral part of the user experience. This means users can engage with educational content without needing to navigate away from their current activity, ensuring a smooth and integrated learning journey.

                  Targeted Audience Engagement: By understanding the interests and engagement patterns of the Farcaster community, we can tailor educational content to match the needs and curiosity levels of different user segments. This personalized approach helps demystify blockchain for enthusiasts, beginners, and skeptics alike, fostering a more informed and engaged community.

                  Comprehensive Blockchain Curriculum: From the basics of blockchain technology and cryptocurrency to advanced concepts like smart contracts, decentralized finance (DeFi), and non-fungible tokens (NFTs), frames is versatile to adapt.

                  Community-Driven Learning: At the heart of our project is a strong emphasis on community. Users can contribute content, share insights, and engage in discussions, creating a vibrant ecosystem of learners, educators, and enthusiasts. This collaborative approach not only enriches the learning experience but also fosters a sense of belonging and community among users and in our roadmap we have ideas about supporting bounties and mechanics that reward quality engagement ranging from fastest, between friends, sponsored giveaways etc.

                  Real-World Applications: Understanding that the best learning comes from doing, our platform emphasizes real-world applications of blockchain technology and takes it to the people. Today users can participate in quizzes and this is just the beginning!!!

                  Farcaster & Warpcast: Utilized for powerful content delivery and engagement capabilities. 
                  OG: Protocol: Leveraged to optimize content sharing and visibility on with its Farcast support.
                  Solidity: Essential for developing and deploying smart contracts.
                  Frog & Farcaster Auth UI: Frog was instrumental in creating dynamic, user-friendly interfaces, while Farcaster Auth UI facilitated secure user authentication and access management, ensuring a safe and personalized learning environment although we POC'd this and didn't need to use it.
                  Hardhat: Played a crucial role in our development workflow for compiling, deploying, testing, and debugging Ethereum software, offering a robust environment for our Solidity development.
                  React & Next.js: These were the core technologies for building our web application. React's component-based architecture allowed for a dynamic and responsive UI. 
                  IPFS: IPFS was used for decentralized storage, ensuring that our educational content is accessible, resilient, and censorship-resistant.
                </div> */}
              </>
            ) : (
              <>
                <button className="btn connect-btn" onClick={connectWeb3}>
                  Connect Wallet
                </button>
              </>
            )}
          </div>
        </main>
      </section>
    </>
  );
};

export default Index;
