import { useEffect, useState } from "react"
import { Button, Image, Loader } from "@mantine/core"

const Quiz = ({ generation, onGoBack }) => {
  const [start, setStart] = useState(false)
  const [loading, setLoading] = useState(true)
  const [pokemon, setPokemon] = useState({})
  const [nextPokemon, setNextPokemon] = useState({})
  const [nameJa, setNameJa] = useState("")
  const [nextNameJa, setNextNameJa] = useState("")
  const [showName, setShowName] = useState(false)

  const generationOffsets = {
    1: { offset: 0, limit: 151 },
    2: { offset: 151, limit: 100 },
    2.5: { offset: 0, limit: 251 },
    3: { offset: 251, limit: 135 },
    4: { offset: 386, limit: 107 },
    5: { offset: 493, limit: 156 },
    6: { offset: 649, limit: 72 },
    7: { offset: 721, limit: 88 },
    8: { offset: 809, limit: 96 },
    9: { offset: 905, limit: 105 },
    all: { offset: 0, limit: 1118 }, // ポケモンの最新データに合わせる
  }

  const getNextPokemon = async () => {
    setLoading(true)
    const { offset, limit } = generationOffsets[generation]
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      const data = await res.json()
      const randomIndex = Math.floor(Math.random() * data.results.length)
      const randomPokemon = data.results[randomIndex]

      const pokemonRes = await fetch(randomPokemon.url)
      const pokemonData = await pokemonRes.json()
      setNextPokemon(pokemonData)

      const speciesRes = await fetch(pokemonData.species.url)
      const speciesData = await speciesRes.json()
      setNextNameJa(speciesData.names[0].name)
    } catch (error) {
      console.error("Failed to fetch Pokémon:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getNextPokemon()
  }, [generation])

  const startQuiz = () => {
    setPokemon(nextPokemon)
    setNameJa(nextNameJa)
    setStart(true)
    getNextPokemon() // 次の問題を準備
  }

  const answer = () => {
    setShowName(true)
  }

  const nextGame = async () => {
    setShowName(false)
    setPokemon(nextPokemon) // 次のポケモンに更新
    setNameJa(nextNameJa) // 次の名前に更新
    await getNextPokemon() // 新しいポケモンを取得
  }

  return (
    <div className='w-[100%] max-w-[700px] mx-auto pt-4'>
      <Button color='gray' onClick={onGoBack} className='w-[100%] mb-4' size='md'>
        世代選択に戻る
      </Button>
      {start ? (
        <div>
          <div className='w-[50%] mx-auto'>
            <Image src={pokemon.sprites.front_default} alt={pokemon.name} />
            {showName ? <h3 className='text-center text-[24px] m-0'>{nameJa}</h3> : <h3 className='text-center text-[24px] m-0'>???</h3>}
          </div>
          <div className='flex gap-2 mt-4'>
            {!showName ? (
              <Button color='red' onClick={() => answer()} className='w-[100%] mb-3' size='md' disabled={loading}>
                答え
              </Button>
            ) : (
              <Button
                color='cyan'
                onClick={() => nextGame()}
                className='w-[100%]'
                size='md'
                disabled={loading} // ポケモンを取得中はボタンを無効化
              >
                次の問題
              </Button>
            )}
          </div>
        </div>
      ) : (
        <Button color='cyan' onClick={() => startQuiz()} className='w-[100%]' size='md' disabled={loading}>
          クイズを開始
        </Button>
      )}
    </div>
  )
}

export default Quiz
