import '../styles/global.css'
import { SessionProvider } from 'next-auth/react'

export default function App({ Component, pageProps: {session, ...pageProps} }) {
    return <SessionProvider session={session}>
        <Component {...pageProps}/>
        <script src="https://developer.edamam.com/attribution/badge.js"></script>
        </SessionProvider>    
   }    