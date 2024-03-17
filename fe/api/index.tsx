import { Button, Frog } from 'frog'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.frame('/', (c) => {
  return c.res({
    action: '/apecoin',
    image: `/start.png`,
    imageAspectRatio: '1:1',
    intents: [
      <Button>DEGEN QUIZ - FOMO IN</Button>,
    ],
  })
})

app.frame('/apecoin', (c) => {
  return c.res({
    action: '/nouns',
    image: `/apecoin.png`,
    imageAspectRatio: '1:1',
    intents: [
      <Button value="correct">🤝 [A] 🌐</Button>,
      <Button value="incorrect">🍌 [B] 🍌</Button>,
      <Button value="incorrect">🏦 [C] 💰</Button>,
    ],
  })
})

app.frame('/nouns', (c) => {
  const { buttonValue } = c
  
  if (buttonValue !== 'correct') {
    return c.res({
      image: `/badluck.png`,
      imageAspectRatio: '1:1',
      intents: [
        <Button.Reset>START OVER BRO!!!</Button.Reset>,
      ],
    })
  }

  return c.res({
    action: '/ens',
    image: `/nouns.png`,
    imageAspectRatio: '1:1',
    intents: [
      <Button value="incorrect">[A]</Button>,
      <Button value="correct">[B]</Button>,
      <Button value="incorrect">[C]</Button>,
    ],
  })
})

app.frame('/ens', (c) => {
  const { buttonValue } = c
  
  if (buttonValue !== 'correct') {
    return c.res({
      image: `/badluck.png`,
      imageAspectRatio: '1:1',
      intents: [
        <Button.Reset>START OVER BRO!!!</Button.Reset>,
      ],
    })
  }

  return c.res({
    action: '/chiliz',
    image: `/ens.png`,
    imageAspectRatio: '1:1',
    intents: [
      <Button value="incorrect">[A]</Button>,
      <Button value="incorrect">[B]</Button>,
      <Button value="correct">[C]</Button>,
    ],
  })
})

app.frame('/chiliz', (c) => {
  const { buttonValue } = c
  
  if (buttonValue !== 'correct') {
    return c.res({
      image: `/badluck.png`,
      imageAspectRatio: '1:1',
      intents: [
        <Button.Reset>START OVER BRO!!!</Button.Reset>,
      ],
    })
  }

  return c.res({
    action: '/end',
    image: `/chiliz.png`,
    imageAspectRatio: '1:1',
    intents: [
      <Button value="incorrect">[A]</Button>,
      <Button value="correct">[B]</Button>,
      <Button value="incorrect">[C]</Button>,
    ],
  })
})

app.frame('/end', (c) => {
  const { buttonValue } = c
  
  if (buttonValue !== 'correct') {
    return c.res({
      image: `/badluck.png`,
      imageAspectRatio: '1:1',
      intents: [
        <Button.Reset>START OVER BRO!!!</Button.Reset>,
      ],
    })
  }

  return c.res({
    image: `/end.png`,
    imageAspectRatio: '1:1',
    intents: [
      // <Button value="correct">MINT</Button>,
      <Button.Mint
        target="eip155:84532:0xA06B908f35e713a5E731BB9D1e50F3F347124e58">
        {/* target="eip155:84532:0xA06B908f35e713a5E731BB9D1e50F3F347124e58:<token-id-optional>" */}
        MINT NFT - HODL
      </Button.Mint>
    ],
  })
})

export const GET = handle(app)
export const POST = handle(app)
