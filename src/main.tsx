
import ReactDOM from 'react-dom/client'
import App from './App.js'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import  UserProvider  from './userContext.jsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <UserProvider>
    <App />
    </UserProvider>
  </BrowserRouter>
)
