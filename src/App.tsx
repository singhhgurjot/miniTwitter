import {Routes, Route} from 'react-router-dom'
import Login from './pages/login/login.js'
import Home from "./pages/mainPage/mainPage.jsx"
import Signup from './pages/signup/signup.js'
import Profile from "./pages/profilePage/profilePage.jsx"
function App() {
  return (
    <>
     <Routes>
        <Route path="/" Component={Login} />
      <Route path="/login" Component={Login} />
      <Route path="/signup" Component={Signup} />
      <Route path="/home" Component={Home}/>
      <Route path="/profile/:id" Component={Profile}/>
     </Routes>
    </>
  )
}

export default App
