import { WavyBackground } from "../../components/wavyBackground/wavyBackground"
import Form from "../../components/form/forms.tsx"
import Navbar from "../../components/navbar/navbar.tsx"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
export default function signup() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast.success('Signup Successful')
        console.log(username, password,name,email);
    }
    return (
        <WavyBackground className="max-w-4xl h-screen mx-auto pb-40 ">
            <Navbar />
            <Form handleSubmit={handleSubmit} email={email} setEmail={setEmail} username={username} password={password} name={name} setName={setName} setUsername={setUsername} setPassword={setPassword} />
        <ToastContainer/>
        </WavyBackground>
    )
}
