import {Routes, Route} from 'react-router-dom'
import Login from './pages/login/login'
function App() {


  return (
    <>
     <Routes>
      <Route path="/login" Component={Login} />
     </Routes>
    </>
  )
}

export default App
