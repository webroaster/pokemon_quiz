import Layout from "./components/Layout"
import Quiz from "./components/Quiz"

export default function Home() {
  return (
    <Layout>
      <div className='text-center'>
        <h1>ポケモンクイズ</h1>
      </div>

      <Quiz />
    </Layout>
  )
}
