import Head from 'next/head';
import { ChallengesProvider } from '../hooks/challenges';

import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Component {...pageProps} />
    </ChallengesProvider>
  )
}

export default MyApp
