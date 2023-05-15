import { useState, useRef } from 'react'
import Todos from './components/Todos'
import ChangeLog from './changelog'

function App() {

  return (
    <div className="todos">
      <Todos/>
      <ChangeLog/>
    </div>
  )
}

export default App
