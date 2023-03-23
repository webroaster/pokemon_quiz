import { useEffect, useState } from "react"
import { Button, Image } from "@mantine/core"

const Quiz = () => {
  const [pokemon, setPokemon] = useState({})
  const [nameJa, setNameJa] = useState()
  const [show, setShow] = useState(true)

  const getPokemon = async () => {
    setShow(false)
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118")
      .then((res) => res.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.results.length)
        const randomPokemon = data.results[randomIndex]
        return fetch(randomPokemon.url)
      })
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data)
        return fetch(data.species.url)
      })
      .then((res) => res.json())
      .then((data) => {
        setNameJa(data.names[0].name)
      })
  }

  return (
    <div className='w-[100%] max-w-[700px] mx-auto pt-4'>
      {pokemon.name && (
        <div className='w-[50%] mx-auto'>
          <Image src={pokemon.sprites.front_default} alt={pokemon.name} />
          {show ? (
            <h3 className='text-center text-[24px] m-0'>{nameJa}</h3>
          ) : (
            <h3 className='text-center text-[24px] m-0'>???</h3>
          )}
        </div>
      )}
      <div className='flex gap-2 mt-4'>
        <Button
          color='cyan'
          onClick={getPokemon}
          className='w-[100%]'
          size='md'
        >
          Quiz!!
        </Button>
        {!show && (
          <Button
            color='red'
            onClick={() => setShow(true)}
            className='w-[100%] mb-3'
            size='md'
          >
            答え
          </Button>
        )}
      </div>
    </div>
  )
}

export default Quiz
