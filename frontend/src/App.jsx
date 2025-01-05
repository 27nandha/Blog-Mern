import './App.css'
import AddBlog from './pages/AddBlog.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/register' element={<Signup/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/addblog' element={<AddBlog/>}></Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
