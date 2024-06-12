"use client";
import { WavyBackground } from "../../components/wavyBackground/wavyBackground"
import Form from "../../components/form/forms.tsx"
import Navbar from "../../components/navbar/navbar.tsx"
import { useState } from "react"
import  {ToastContainer ,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"
import { FlipWords } from "../../components/flipWords/flipWords.tsx";
import axios2 from '../../../axios.js'
import axios from "axios";


export default function login() {
    console.log("Inside Login",import.meta.env.VITE_API_BASE_URL);
    const navigate=useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading,setIsLoading]=useState(false);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
    
        if(!username || !password || username.trim()==='' || password.trim()===''){
            setIsLoading(false);
            return toast.error('Please fill all fields');
           
        }
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/login`, { username, password },
            {
                validateStatus: function (status) {
                    return status >= 200 && status < 500;
                }
            } 
          ).then((res)=>{
            console.log(res)
            if(res.status==200)
               { 
                console.log("Login Succesfull");
                console.log(res);
            localStorage.setItem('token',res.data.token);
            console.log(res.data.token);
                axios2().get(`${import.meta.env.VITE_API_BASE_URL}/users/getOwnProfile`).then((res) => {
                    
                    console.log(res.data.user);
                }).catch((err) => {
                    console.log(err);
                }).finally(()=>{
                    setIsLoading(false);
                })
                toast.success('Login Successful');
                navigate("/home");

            
          
        }
        else{
            setIsLoading(false);
            return toast.error(res.data.message);

        }
        }
    ).catch((err)=>{
            console.log(err)
        
        }   )
    };
    const words = ["Expressing", "Transforming", "Discovering"];
  return (
    <div >

       <WavyBackground className="font-epi">
        
              <Navbar />
              <div style={{paddingLeft:"10%", paddingRight:"10% "}}className="flex w-screen items-center justify-between">
                 <div>
                      <div className="text-6xl mx-auto font-normal text-neutral-600 dark:text-neutral-400   ">
                          <span className="text-white">Start</span>
                          <FlipWords words={words} /> <br />
                          <span className="text-white">With Chirp</span>
                      </div>
                 </div>
        <Form isLoading={isLoading} login={true} handleSubmit={handleSubmit} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
              </div>
          </WavyBackground>
      <ToastContainer/>
      </div>

  )
}
