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
    action: '/nouns',
    image: `/1PurposeOfApecoin.png`,
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
    image: `/nouns.png`,
    imageAspectRatio: '1:1',
    intents: [
      <Button value="correct">[A]</Button>,
      <Button value="incorrect">[B]</Button>,
      <Button value="incorrect">[C]</Button>,
    ],
  })
})

export const GET = handle(app)
export const POST = handle(app)
