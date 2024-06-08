import { WavyBackground } from "../../components/wavyBackground/wavyBackground"
import Form from "../../components/form/forms.tsx"
import Navbar from "../../components/navbar/navbar.tsx"
import { useState } from "react"
import  {ToastContainer ,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
export default function login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.success('Login Successful')
        console.log(username, password);
    };
  return (
    <div >
       
      <WavyBackground className="max-w-4xl h-screen mx-auto pb-40 ">
              <Navbar />
        <Form login={true} handleSubmit={handleSubmit} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
      </WavyBackground>
      <ToastContainer/>
      </div>

  )
}
