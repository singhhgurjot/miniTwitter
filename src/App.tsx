import {Routes, Route} from 'react-router-dom'
import Login from './pages/login/login.js'
import Home from "./pages/mainPage/mainPage.jsx"
import Signup from './pages/signup/signup.js'
function App() {
  return (
    <>
     <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/signup" Component={Signup} />
      <Route path="/home" Component={Home}/>
     </Routes>
    </>
  )
}

export default App
