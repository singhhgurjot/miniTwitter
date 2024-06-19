import React,{useEffect,useState} from 'react'
import "./mainPage.css"
import MainNav from "../../components/mainPageNav/mainPageNav"
import MainPageCenter from "../../components/mainPageCenter/mainPageCenter"
import MainPageRight from "../../components/mainPageRight/mainPageRight"
import axios from "../../../axios.js"
import axios2 from "axios"
import ProfilePage from '../profilePage/profilePage.jsx'
import { toast ,ToastContainer} from 'react-toastify';
export default function mainPage() {
    const [user,setUser]=useState(null);
    const [tweet,setTweet]=useState("");
    const [tweetImage,setTweetImage]=useState(null);
    const [tweetType,setTweetType]=useState("text");
    const [formReset, setFormReset] = useState(false);
    const [isProfile,setIsProfile]=useState(false);
    const [profileId,setProfileId]=useState(null);
    const [posts,setPosts]=useState([]);
    const handleSubmit=()=>{

        if(tweetImage!==null){
            console.log("TweetImage is",tweetImage)
            const data=new FormData();
            data.append("text",tweet);
            data.append("type","image");
            data.append("image",tweetImage);
            console.log("With Image");
          
            axios().post(`${import.meta.env.VITE_API_BASE_URL}/tweets/create`, data, {
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
            axios().post(`${import.meta.env.VITE_API_BASE_URL}/tweets/create`, { text: tweet, type: tweetType }, {
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
        axios().get(`${import.meta.env.VITE_API_BASE_URL}/tweets/getAllTweets`).then((res) => {
            
            setPosts(res.data.tweets);
        })
        axios().get(`${import.meta.env.VITE_API_BASE_URL}/users/getOwnProfile`).then((res)=>{
            setUser(res.data.user)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        }   )
    },[])
    const [selected, setSelected] = React.useState("home")
    useEffect(() => {
       
    })
    function likePost(id){
        axios().post(`${import.meta.env.VITE_API_BASE_URL}/tweets/like/${id}`).then((res) => {   
            console.log("Liked")
            if (res.status == 200) {
               
            }
            else {
                toast.error("Error Liking", { position: "top-right" })
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    function unlikePost(id) {
        axios().post(`${import.meta.env.VITE_API_BASE_URL}/tweets/unlike/${id}`).then((res) => {
            console.log("Unliked")
            if (res.status == 200) {
                
            }
            else {
                toast.error("Error unliking", { position: "top-right" })
            }
        }).catch((err) => {
            console.log(err)
        })
    }
    const [isLoading,setIsLoading]=useState(true);
  return (
    
    <div>
    <div className='min-h-screen min-v-screen bg flex justify-evenly'>
          
      <MainNav isProfile={isProfile} setIsProfile={setIsProfile} profileId={profileId} setProfileId={setProfileId}selected={selected} setSelected={setSelected} user={user} setUser={setUser} posts={posts} setPosts={setPosts}/>
        {!isProfile?<MainPageCenter profileId={profileId} setProfileId={setProfileId} isProfile={isProfile} setIsProfile={setIsProfile} likePost={likePost}posts={posts} setPosts={ setPosts} user={user} setUser={setUser} tweetType={tweetType} setTweetType={setTweetType}
        tweet={tweet}  unlikePost={unlikePost} handleSubmit={handleSubmit} setTweet={setTweet} tweetImage={tweetImage} setTweetImage={setTweetImage}/> :
              <ProfilePage likePost={likePost} unlikePost={unlikePost}  profileId={profileId} user={user} setUser={setUser} ></ProfilePage>}
        <MainPageRight user={user}/>

        <ToastContainer/>
          
        

    </div>
      </div>
    
  )
}
