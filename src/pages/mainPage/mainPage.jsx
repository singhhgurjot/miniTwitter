import React,{useEffect,useState} from 'react'
import "./mainPage.css"
import MainNav from "../../components/mainPageNav/mainPageNav"
import MainPageCenter from "../../components/mainPageCenter/mainPageCenter"
import MainPageRight from "../../components/mainPageRight/mainPageRight"
import axios from "../../../axios.js"
import axios2 from "axios"
import { toast ,ToastContainer} from 'react-toastify';
export default function mainPage() {
    const [user,setUser]=useState(null);
    const [tweet,setTweet]=useState("");
    const [tweetImage,setTweetImage]=useState(null);
    const [tweetType,setTweetType]=useState("text");
    const [formReset, setFormReset] = useState(false);
    const handleSubmit=()=>{

        if(tweetImage!==null){
            console.log("TweetImage is",tweetImage)
            const data=new FormData();
            data.append("text",tweet);
            data.append("type","image");
            data.append("image",tweetImage);
            console.log("With Image");
            axios().post("http://localhost:3000/api/tweets/create", data, {
                validateStatus: function (status) {
                    return status >= 200 && status < 500;
                }
            }).then((res)=>{
                console.log(res.data)
                if(res.status===200){
                    
                    toast.success("Tweeted Successfully", { position: "top-right" })
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000)
                }
                else{
                    toast.error("Error Tweeting", { position: "top-right" })
                }
                
            }).catch((err)=>{
                
                console.log(err)
            })
        }
        else{
            if(tweet.trim()==="") return toast.error("Tweet cannot be empty",{position:"top-right"});
            else{
            axios().post("http://localhost:3000/api/tweets/create", { text: tweet, type: tweetType }, {
                validateStatus: function (status) {
                    return status >= 200 && status < 500;
                }
            }).then((res)=>{
                if(res.status==200){
                    
                    toast.success("Tweeted Successfully",{position:"top-right"})
                    setTimeout(()=>{
                        window.location.reload();
                    },1000)
                }
                else {
                    toast.error("Error Tweeting", { position: "top-right" })
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
        }
    }
    useEffect(() => {
        axios().get("http://localhost:3000/api/users/getOwnProfile").then((res)=>{
            setUser(res.data.user)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        }   )
    },[])
    const [selected, setSelected] = React.useState("home")
    useEffect(() => {
       
    })
  return (
    <div className='min-h-screen min-v-screen bg flex justify-evenly'>

      <MainNav selected={selected} setSelected={setSelected} user={user} setUser={setUser}/>
        <MainPageCenter user={user} setUser={setUser} tweetType={tweetType} setTweetType={setTweetType}
        tweet={tweet} handleSubmit={handleSubmit} setTweet={setTweet} tweetImage={tweetImage} setTweetImage={setTweetImage}/>
        <MainPageRight/>
        <ToastContainer/>
    </div>
  )
}
