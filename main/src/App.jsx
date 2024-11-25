import { useState } from 'react'
import './App.css'
import Query from './assets/components/Query'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Query />
        </div>
    </>
  )
}

export default App
