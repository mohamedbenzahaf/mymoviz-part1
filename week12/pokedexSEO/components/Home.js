import { useEffect, useState } from 'react'
import Head from 'next/head'
import Pokemon from './Pokemon'
import styles from '../styles/Home.module.css'

function Home() {
	const [startIndex, setStartIndex] = useState(1)
	const [pokemonsNumber, setPokemonsNumber] = useState(15)
	const [pokemonsData, setPokemonsData] = useState([])

	const fetchPokemons = async () => {
		const newPokemons = []

		for (let i = startIndex; i <= pokemonsNumber; i++) {
			const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
			const data = await response.json()

			const newPokemon = {
				id: data.id,
				name: data.name[0].toUpperCase() + data.name.slice(1),
				type: data.types[0].type.name,
			}

			newPokemons.push(newPokemon)
		}

		setPokemonsData([...pokemonsData, ...newPokemons])
		setStartIndex(startIndex + pokemonsNumber)
		setPokemonsNumber(pokemonsNumber + pokemonsNumber)
	}

	useEffect(() => {
		fetchPokemons()
	}, [])

	const pokemons = pokemonsData.map(data => {
		return <Pokemon key={data.id} id={data.id} name={data.name} type={data.type} />
	})

	return (
		<div className={styles.container}>
			<Head>
	<title>Pokedex</title>
	<link rel="icon" href="/favicon.ico" />
	<meta name="description" content="pokedex description" />
	<meta name="viewport" content="initial-scale=1.0, width=device-width" />
</Head>
			<h1 className={styles.title}>Pokedex</h1>
			<div className={styles.pokemonContainer}>{pokemons}</div>
			<button type="button" onClick={() => fetchPokemons()} className={styles.next}>
				Next
			</button>
		</div>
	)
}

export default Home
