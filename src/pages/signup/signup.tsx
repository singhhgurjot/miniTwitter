import { WavyBackground } from "../../components/wavyBackground/wavyBackground"
import Form from "../../components/form/forms.tsx"
import Navbar from "../../components/navbar/navbar.tsx"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"

import { FlipWords } from "../../components/flipWords/flipWords.tsx";
export default function signup() {
    const navigate=useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [isLoading,setIsLoading]=useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();
        
        console.log(username, password , name, email);
        if (!username || !password || username.trim() === '' || password.trim() === '') {
            setIsLoading(false);
            return toast.error('Please fill all fields');
        }
        axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/register`, { username, password,name,email }, {
            validateStatus: function (status) {
                return status >= 200 && status < 500;
            }
        }).then((res) => {
            console.log(res)
            if (res.status !== 200) {
                setIsLoading(false);
                return toast.error(res.data.message);
            }
            else {
                localStorage.setItem('token', res.data.token);
                toast.success('Account created Successful');
                setTimeout(()=>{
                    navigate("/login");
            
                })
            }

        }).catch((err) => { 
            console.log(err)

        }).finally(()=>{
            setIsLoading(false);
        })
      
    };
    const words = ["Expressing", "Transforming", "Discovering"];
    return (
        <div >
            <WavyBackground className="font-epi">

                <Navbar />
                <div style={{ paddingLeft: "10%", paddingRight: "10% " }} className="flex w-screen items-center justify-between">
                    <div>
                        <div className="text-6xl mx-auto font-normal text-neutral-600 dark:text-neutral-400   ">
                            <span className="text-white">Start</span>
                            <FlipWords words={words} /> <br />
                            <span className="text-white">With Chirp</span>
                        </div>
                    </div>
                    <Form isLoading={isLoading} handleSubmit={handleSubmit} email={email} setEmail={setEmail} username={username} password={password} name={name} setName={setName} setUsername={setUsername} setPassword={setPassword} />
                </div>
            </WavyBackground>
            <ToastContainer />
        </div>
    )
}
