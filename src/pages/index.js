import { useState } from "react"
import Quiz from "./components/Quiz"
import { Button } from "@mantine/core"

export default function Home() {
  const [generation, setGeneration] = useState(null)

  const selectGeneration = (gen) => {
    setGeneration(gen)
  }

  const goBackToGenerationSelect = () => {
    setGeneration(null)
  }

  return (
    <div>
      {!generation ? (
        <div className='text-center'>
          <h1>ポケモンクイズ</h1>
          <p>世代を選択してください</p>
          <div className='w-[100%] max-w-[500px] mx-auto pt-4 text-center'>
            <Button onClick={() => selectGeneration(1)} className='w-[100%] mb-2' size='md' color='cyan'>
              赤・緑
            </Button>
            <Button onClick={() => selectGeneration(2)} className='w-[100%] mb-2' size='md' color='cyan'>
              金・銀
            </Button>
            <Button onClick={() => selectGeneration(2.5)} className='w-[100%] mb-2' size='md' color='cyan'>
              赤緑 & 金銀
            </Button>
            <Button onClick={() => selectGeneration(3)} className='w-[100%] mb-2' size='md' color='cyan'>
              ルビー・サファイア・エメラルド
            </Button>
            <Button onClick={() => selectGeneration(4)} className='w-[100%] mb-2' size='md' color='cyan'>
              ダイヤモンドパール
            </Button>
            <Button onClick={() => selectGeneration(5)} className='w-[100%] mb-2' size='md' color='cyan'>
              ブラック・ホワイト
            </Button>
            <Button onClick={() => selectGeneration(6)} className='w-[100%] mb-2' size='md' color='cyan'>
              X・Y
            </Button>
            <Button onClick={() => selectGeneration(7)} className='w-[100%] mb-2' size='md' color='cyan'>
              サン・ムーン
            </Button>
            <Button onClick={() => selectGeneration(8)} className='w-[100%] mb-2' size='md' color='cyan'>
              ソード・シールド
            </Button>
            <Button onClick={() => selectGeneration(9)} className='w-[100%] mb-2' size='md' color='cyan'>
              スカーレッド・バイオレッド
            </Button>
            <Button onClick={() => selectGeneration("all")} className='w-[100%] mb-2' size='md' color='cyan'>
              全ての世代
            </Button>
          </div>
        </div>
      ) : (
        <Quiz generation={generation} onGoBack={goBackToGenerationSelect} />
      )}
    </div>
  )
}
