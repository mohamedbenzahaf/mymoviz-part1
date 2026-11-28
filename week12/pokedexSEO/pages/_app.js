import '../styles/globals.css'
import Head from 'next/head'

function App({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Pokedex</title>
				<link rel="icon" href="/favicon.ico" />
				<meta name="description" content="pokedex description" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>
			<Component {...pageProps} />
		</>
	)
}

export default App
