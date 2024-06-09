import React,{useState,useEffect} from 'react'
import "./tweetComponent.css"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
export default function tweetComponent(props) {
    const [liked, setLiked] = useState(false);
    const [likeCount,setLikeCount]=useState(0);
    console.log("User is " ,props.user);
  useEffect(() => {
    if (props.post.likes.includes(props.user)) {
      setLiked(true);
    }
  }, [props.post.likes, props.user]);
  return (
    <div className='tweet'>
      <div className='flex tweetTop'>
          
          <img src={props.post.userId.profilePic} style={{height:"50px" ,width:"50px" ,borderRadius:"50%"}}></img>
          <div className='topTweet'>
                  <div className='flex nameuser'>
          <p className='font-bold '>{props.post.userId.name} </p>
          <p  style={{color:"grey"}}className=''>@{props.post.userId.username}</p>
                  </div>
          
          <p>{props.post.content}</p>
                  {props.post?.tweetType=='image'?<img style={{ height:"400px", width: "800px" ,marginTop:"10px" , borderRadius:"2%" }} src='https://cdn.pixabay.com/photo/2023/08/02/18/21/yoga-8165759_640.jpg'></img>:null}
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
                           <p>{props.post?.likes.length+likeCount}</p>
                          
                          </div>
                          <div className='flex' style={{ gap: "8px" }}>
            <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
            <p>{props.post?.comments.length}</p>
                          </div>
                      </div>
            <BookmarkBorderIcon></BookmarkBorderIcon>
            </div>
              </div>
          </div>
          
    </div>

  )
}
