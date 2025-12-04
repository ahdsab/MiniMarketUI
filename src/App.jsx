import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <header style={{ background: "#3632a8", padding: "10px", color: "red" }}>
        <h1>Mini Market</h1>
        <h3>hi</h3>
      </header>
    </div>
  )
}

export default App
