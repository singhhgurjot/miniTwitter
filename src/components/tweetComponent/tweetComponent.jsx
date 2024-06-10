import React,{useState,useEffect} from 'react'
import "./tweetComponent.css"
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EditIcon from '@mui/icons-material/Edit';
import axios from "../../../axios";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify'
export default function tweetComponent(props) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "black",
      height: "50%",
      width: "50%"
    },
  };

  Modal.setAppElement('#root');

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {

    
  }

  function closeModal() {
    setIsOpen(false);
  }

  
    const [liked, setLiked] = useState(false);
    const [likeCount,setLikeCount]=useState(0);
    const [tweet,setTweet]=useState("");
    const [bookmarked,setBookmarked]=useState(false);
    
  useEffect(() => {
    setTweet(props.post.content);
    if (props.post?.likes?.includes(props.user._id)) {
      setLiked(true);
    }
    if(props.user.bookmarks?.includes(props.post?._id)){
        setBookmarked(true);
    }
  }, [props.post?.likes, props.user]);
  const openProfile = () => {
    props.setProfileId(props.post.userId._id);
    props.setIsProfile(true);
  }
  function handleUpdateTweet(){
  
    openModal();
    
  }
  function handleUpdateTweet2() {
    axios().patch(`${import.meta.env.VITE_API_BASE_URL}/tweets/update/${props.post._id}`,{text:tweet}).then((res)=>{
      if(res.status==200){
        toast.success("Tweet Updated",{position:"top-right"});
        closeModal();
        window.location.reload();
      }
      else{
        toast.success("Error Updating Tweet",{position:"top-right"});

      }
    })

  }
  function handleDeleteTweet(){
    console.log("in delete tweet");
    axios().delete(`${import.meta.env.VITE_API_BASE_URL}/tweets/delete/${props.post._id}`).then((res)=>{
      if(res.status==200){
        toast.success("Tweet Deleted",{position:"top-right"});
        
        closeModal();
        window.location.reload();
      }
      else{
        toast.success("Error Deleting Tweet",{position:"top-right"});

      }
    })

  } 
  return (
    <div className='tweet'>
      <div className='flex tweetTop'>
        
        <img onClick={() => {
          openProfile()
        }}  src={props.post?.userId?.profilePic != "" ? props.post?.userId?.profilePic :"https://photosbull.com/wp-content/uploads/2024/05/no-dp_16.webp"} style={{height:"50px" ,width:"50px" ,borderRadius:"50%",cursor:"pointer"}}></img>
      
          <div className='topTweet'>
          <div style={{cursor:"pointer"}}className='flex nameuser' onClick={() => {
            openProfile()
          }}>
          <p className='font-bold '>{props.post?.userId?.name} </p>
          <p  style={{color:"grey"}}className=''>@{props.post.userId?.username}</p>
                  </div>
          
          <p>{props.post.content}</p>
                  {props.post?.tweetType=='image'?<img style={{ height:"400px", width: "800px" ,marginTop:"10px" , borderRadius:"2%" }} src={props.post?.contentUrl}></img>:null}
            <div className='flex mt-5 justify-between bottomBar'>
                <div  style={{gap:"50px"}}className='flex '>
                    <div style={{gap:"8px"}}className='flex'>
                {liked ? <FavoriteIcon style={{color:"red"}} onClick={() => {
                                 setLiked(false);
                                 setLikeCount(0);
                                  props.unlikePost(props.post._id);
                }}></FavoriteIcon> : <FavoriteBorderIcon onClick={() => {
                                  setLikeCount(1);
                                setLiked(true);
                                  props.likePost(props.post._id);
                              }}></FavoriteBorderIcon>}
                           <p>{props.post?.likes?.length+likeCount}</p>
                          
                          </div>
                          <div className='flex' style={{ gap: "8px" }}>
            <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
            <p>{props.post?.comments?.length}</p>
                          </div>
                      </div>
                    <div style={{gap:"10px"}}className='flex items-center'>
                      {props.isEditable?<button style={{color:"white"}}onClick={()=>{}}><EditIcon onClick={()=>{
                        handleUpdateTweet();
                      }}/></button>:null}
                      {!bookmarked?
            <BookmarkBorderIcon onClick={()=>{

              axios().post(`${import.meta.env.VITE_API_BASE_URL}/tweets/bookmark/${props.post?._id}`).then((res)=>{
                console.log("Bookmarked");
                console.log(res.data);

              setBookmarked(true);
            })}}></BookmarkBorderIcon>:
              <BookmarkIcon style={{ color:"#1d9bf0"}} onClick={()=>{
                axios().post(`${import.meta.env.VITE_API_BASE_URL}/tweets/unbookmark/${props.post?._id}`).then((res)=>{
                  console.log("Unbookmarked");
                  console.log(res.data);
                  setBookmarked(false);
                })
                setBookmarked(false);
              }}></BookmarkIcon>

         
            }
              <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Edit Profile"
              >

              <div style={{height:"50%",width:"100%",backgroundColor:"grey"}}>
                <textarea value={tweet} placeholder='Edit your tweet' style={{height:"100%",width:"100%",color:"black"}} onChange={(e)=>{
                    setTweet(e.target.value); 
                }}></textarea>
                <div style={{width:"100%",gap:"10px"}} className='flex'>
                  <button style={{backgroundColor:"white",color:"black",padding:"2%",width:"100px" , borderRadius:"200px"}} onClick={()=>{
                    handleUpdateTweet2();
                  }}>Update</button>
                    <button style={{ backgroundColor: "white", color: "black", padding: "2%", width: "100px", borderRadius: "200px" }}
                    onClick={()=>{
                      handleDeleteTweet();
                    }}> Delete</button>
                </div>
              </div>

              </Modal>
            </div>
            </div>
              </div>
          </div>
          <ToastContainer/>
    </div>

  )
}
