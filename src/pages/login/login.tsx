import { WavyBackground } from "../../components/wavyBackground/wavyBackground"
import Form from "../../components/form/forms.tsx"
import Navbar from "../../components/navbar/navbar.tsx"
import { useState } from "react"
import  {ToastContainer ,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"
import axios from 'axios'
export default function login() {
    const navigate=useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(username, password);
        if(!username || !password || username.trim()==='' || password.trim()===''){
            return toast.error('Please fill all fields');
        }
        axios.post("http://localhost:3000/api/users/login", { username, password }, {
            validateStatus: function (status) {
                return status >= 200 && status < 500;
            }
        }).then((res)=>{
            console.log(res)
            if(res.status!==200){
                return toast.error(res.data.message);
            }
            else{
            localStorage.setItem('token',res.data.token);
                toast.success('Login Successful');
                navigate("/home");

            }
          
        }).catch((err)=>{
            console.log(err)
        
        }   )
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
