import { useState } from 'react'
import './index.css'
import Query from './assets/components/Query'
import Output from "./assets/components/Output"
import Table from './assets/components/Table'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Query />
        <Output />
        <Table />
        </div>
    </>
  )
}

export default App
