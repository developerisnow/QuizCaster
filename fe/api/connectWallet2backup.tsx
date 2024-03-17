import { Button, Frog } from 'frog'
import { handle } from 'frog/vercel'
import NFTQuizzArtifact from '../../hardhat_contracts/contracts/artifacts/NFTQuizz.json'

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
})

const NFTQuizzAbi = NFTQuizzArtifact.abi

app.frame('/connectWallet', (c) => {
  return c.res({
    action: '/mintNFT',
    image: `/connectWallet.png`,
    imageAspectRatio: '1:1',
    intents: [
      <Button>Connect Wallet</Button>,
    ],
  })
})

app.transaction('/mintNFT', (c) => {
  return c.contract({
    abi: NFTQuizzAbi,
    chainId: "eip155:10", // Assuming Base Sepolia 84532
    functionName: 'safeMint',
    to: '0xA06B908f35e713a5E731BB9D1e50F3F347124e58',
    args: ['0x92fB257891a69FBb600Dc7e79EA4A4541254a200']
  })
})

export const GET = handle(app)
export const POST = handle(app)