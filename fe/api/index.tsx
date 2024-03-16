import { Button, Frog, TextInput } from 'frog'
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
  // const { status } = c
  return c.res({
    action: '/ens',
    image: `/nouns.png`,
    imageAspectRatio: '1:1',
    intents: [
      <Button value="correct">[A]</Button>,
      <Button value="incorrect">[B]</Button>,
      <Button value="incorrect">[C]</Button>,
    ],
  })
})

app.frame('/ens', (c) => {
  // const { status } = c
  return c.res({
    action: '/chiliz',
    image: `/ens.png`,
    imageAspectRatio: '1:1',
    intents: [
      <Button value="correct">[A]</Button>,
      <Button value="incorrect">[B]</Button>,
      <Button value="incorrect">[C]</Button>,
    ],
  })
})

app.frame('/chiliz', (c) => {
  // const { status } = c
  return c.res({
    action: '/end',
    image: `/chiliz.png`,
    imageAspectRatio: '1:1',
    intents: [
      <Button value="correct">[A]</Button>,
      <Button value="incorrect">[B]</Button>,
      <Button value="incorrect">[C]</Button>,
    ],
  })
})

app.frame('/badluck', (c) => {
  // const { status } = c
  return c.res({
    image: `/badluck.png`,
    imageAspectRatio: '1:1',
    intents: [
      <Button value="correct">START OVER BRO!!!</Button>,
    ],
  })
})

app.frame('/end', (c) => {
  // const { status } = c
  return c.res({
    image: `/end.png`,
    imageAspectRatio: '1:1',
    intents: [
      <Button value="correct">MINT</Button>,
    ],
  })
})

export const GET = handle(app)
export const POST = handle(app)
