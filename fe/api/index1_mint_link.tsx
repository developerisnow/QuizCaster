// import { Button, Frog } from 'frog'
// import { handle } from 'frog/vercel'

// export const app = new Frog({
//   assetsPath: '/',
//   basePath: '/api',
// })

// // Assuming you have the contract ABI
// const zoraMintAbi = [
//   // Your contract ABI for minting
// ]

// app.transaction('/mint', (c) => {
//   // Assuming the mint function does not require arguments or ETH value
//   return c.contract({
//     abi: zoraMintAbi,
//     chainId: 'eip155:1', // Assuming Ethereum Mainnet
//     functionName: 'mint',
//     to: '0x275F572BBbD51c588b420569bCf0C582Eca4fF15',
//   })
// })

// app.frame('/', (c) => {
//   return c.res({
//     action: '/nouns',
//     image: `/1PurposeOfApecoin.png`,
//     imageAspectRatio: '1:1',
//     intents: [
//       <Button.Link href="https://zora.co/collect/zora:0x275f572bbbd51c588b420569bcf0c582eca4ff15">Mint on Zora</Button.Link>,
//       <Button value="correct">🍌 [A] 🍌</Button>,
//       <Button value="incorrect">🍌 [B] 🍌</Button>,
//       <Button value="incorrect">🏦 [C] 💰</Button>,
//     ],
//   })
// })

// app.frame('/nouns', (c) => {
//   // const { status } = c
//   return c.res({
//     image: `/nouns.png`,
//     imageAspectRatio: '1:1',
//     intents: [
//       <Button value="correct">[A]</Button>,
//       <Button value="incorrect">[B]</Button>,
//       <Button value="incorrect">[C]</Button>,
//     ],
//   })
// })

// export const GET = handle(app)
// export const POST = handle(app)
