import { useState } from 'react'
import Todos from './components/Todos'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="todos">
      <Todos/>
    </div>
  )
}

export default App
