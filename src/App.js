import React from 'react'
import Navbar from './Components/NavBar/NavBar'
import {BrowserRouter} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </div>
  )
}

export default App
