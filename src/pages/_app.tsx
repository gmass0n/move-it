import Head from 'next/head';
import { AuthProvider } from '../hooks/auth';
import { ChallengesProvider } from '../hooks/challenges';

import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChallengesProvider>
      <AuthProvider>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Component {...pageProps} />  
      </AuthProvider>
    </ChallengesProvider>
  )
}

export default MyApp
