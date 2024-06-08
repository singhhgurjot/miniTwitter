import {Routes, Route} from 'react-router-dom'
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
function App() {


  return (
    <>
     <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/signup" Component={Signup} />
      
     </Routes>
    </>
  )
}

export default App
