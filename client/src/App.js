import './App.css'
import Login from './pages/Login.js'
import Register from './pages/Register.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* <Route exact path="/"> Olá </Route> */}
          <Route exact path="/" element={<Login></Login>}></Route>
          <Route path="/register" element={<Register></Register>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App
