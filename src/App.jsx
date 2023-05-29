import { useState, useRef } from 'react'
import { Route, Routes } from "react-router-dom"
import Todos from './components/Todos'
import ChangeLog from './changelog'

export function App() {
  return (
    <div className="todos">
      <Routes>
        <Route path="/" element={<Todos />} />
        <Route path="/changelog" element={<ChangeLog />} />
      </Routes>
    </div>
  )
}

export default App
