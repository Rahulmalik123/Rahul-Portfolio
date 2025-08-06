
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Projects from './components/Projects'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
    </Routes>
  )
}

export default App
