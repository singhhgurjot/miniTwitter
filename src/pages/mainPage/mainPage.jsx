import {useState} from 'react'
import axios from 'axios';
export default function mainPage() {
        const [text, setText] = useState('Sample text222');
        const [image, setImage] = useState("");
        const submitImage = () => {
const data= new FormData();
data.append('image', image);
data.append('userId',"66640dc530f3062c73b01c06")

            axios.post("http://localhost:3000/api/users/uploadProfilePicture",data).then((res)=>{   
                    console.log(res.data);
             }).catch((err)=>{   
                    console.log(err);
             });
            }
        return (
        <div>
            <input type="file" onChange={(e)=>{
                if(e.target.files != null && e.target.files[0]!=null) {setImage(e.target.files[0])};
            }}></input>
            <button onClick={()=>{
                console.log(image);
                submitImage();
            }}>Click me</button>
        </div>
        
    )

}
