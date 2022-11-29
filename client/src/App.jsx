import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Home } from './routes/Home/Home'
import { Sigin } from './routes/registrarse/sigin'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Sigin/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
