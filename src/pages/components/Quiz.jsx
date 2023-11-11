import { useEffect, useState } from "react"
import { Button, Image } from "@mantine/core"

const Quiz = () => {
  const [start, setStart] = useState(false)
  const [pokemon, setPokemon] = useState({})
  const [nextPokemon, setNextPokemon] = useState({})
  const [nameJa, setNameJa] = useState()
  const [nextNameJa, setNextNameJa] = useState()
  const [showName, setShowName] = useState(false)

  // あらかじめ取得しておくポケモン
  const getNextPokemon = async () => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1118")
      .then((res) => res.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.results.length)
        const randomPokemon = data.results[randomIndex]
        return fetch(randomPokemon.url)
      })
      .then((res) => res.json())
      .then((data) => {
        setNextPokemon(data)
        return fetch(data.species.url)
      })
      .then((res) => res.json())
      .then((data) => {
        setNextNameJa(data.names[0].name)
      })
  }

  useEffect(async () => {
    await getNextPokemon()
  }, [])

  const startQuiz = () => {
    setPokemon(nextPokemon)
    setNameJa(nextNameJa)
    setStart(true)
  }

  const answer = async () => {
    setNameJa(nextNameJa)
    setShowName(true)
    await getNextPokemon()
  }

  const nextGame = () => {
    setPokemon(nextPokemon)
    setShowName(false)
  }

  return (
    <div className='w-[100%] max-w-[700px] mx-auto pt-4'>
      {start ? (
        <div>
          <div className='w-[50%] mx-auto'>
            {pokemon && <Image src={pokemon.sprites.front_default} alt={pokemon.name} />}
            {showName ? (
              <h3 className='text-center text-[24px] m-0'>{nameJa}</h3>
            ) : (
              <h3 className='text-center text-[24px] m-0'>???</h3>
            )}
          </div>
          <div className='flex gap-2 mt-4'>
            {!showName ? (
              <Button color='red' onClick={() => answer()} className='w-[100%] mb-3' size='md'>
                答え
              </Button>
            ) : (
              <Button color='cyan' onClick={() => nextGame()} className='w-[100%]' size='md'>
                問題
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Button color='cyan' onClick={() => startQuiz()} className='w-[100%]' size='md'>
          問題
        </Button>
      )}
    </div>
  )
}

export default Quiz
