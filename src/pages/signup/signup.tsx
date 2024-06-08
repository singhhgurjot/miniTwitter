import { WavyBackground } from "../../components/wavyBackground/wavyBackground"
import Form from "../../components/form/forms.tsx"
import Navbar from "../../components/navbar/navbar.tsx"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import axios from "axios"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom"
export default function signup() {
    const navigate=useNavigate();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(username, password , name, email);
        if (!username || !password || username.trim() === '' || password.trim() === '') {
            return toast.error('Please fill all fields');
        }
        axios.post("http://localhost:3000/api/users/register", { username, password,name,email }, {
            validateStatus: function (status) {
                return status >= 200 && status < 500;
            }
        }).then((res) => {
            console.log(res)
            if (res.status !== 200) {
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

        })
    };
    return (
        <WavyBackground className="max-w-4xl h-screen mx-auto pb-40 ">
            <Navbar />
            <Form handleSubmit={handleSubmit} email={email} setEmail={setEmail} username={username} password={password} name={name} setName={setName} setUsername={setUsername} setPassword={setPassword} />
        <ToastContainer/>
        </WavyBackground>
    )
}
