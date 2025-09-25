import React from 'react'
import Navbar from './Components/NavBar/NavBar'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Footer from './Components/Footer/Footer'
import routes from './routes'
function App() {
  return (
    <div
      className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <BrowserRouter>
        <Navbar />
        <main style={{flex: 1}}>
          <Routes>
            {routes.map(({path, element}, index) => (
              <Route key={index} path={path} element={element} />
            ))}
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
