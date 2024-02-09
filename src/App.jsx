import Home from './components/Home'
import { Route, Routes } from 'react-router'
import DisplayEmployee from './components/DisplayEmployee'



function App() {
  return (
    <>
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/data' element={<DisplayEmployee />} />
      </Routes>

      
      
    </>
  )
}

export default App
