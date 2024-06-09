import axios from '../../../axios';
import React, { useEffect ,useState} from 'react'

export default function userCard(props) {
    console.log("User Card" ,props.currentUser);

    const [isFollower,setIsFollower]=useState(false);
    const [user,setUser]=useState(null);
    useEffect(() => {
        if(props.user?.following.includes(props.currentUser._id)){
            console.log("Is Follower");
            setIsFollower(true);
        }
    },[])
  return (
    <div className='userCard mt-5'>
        <div  className='flex items-center justify-between '>
              <div style={{ gap: "10px" }}  className='flex items-center'>
          <img  style={{height:"40px" ,width:"40px" ,borderRadius:"50%"}}src="https://photosbull.com/wp-content/uploads/2024/05/no-dp_16.webp" alt="user" />
         <div className='flex flex-col '> 
          <p style={{fontSize:"15px"}} className='font-sm'>{props.currentUser?.name}</p> 
                  <p style={{ fontSize: "15px", color:"#9c958d"}}className='font-sm'>@{props.currentUser?.username}</p>
              </div>
              </div>
              { props.user?.following.includes(props.currentUser._id) && isFollower ?
              <button style={{backgroundColor:"", width:"20%", outline:"1px solid white", padding:"8px" ,borderRadius:"20px"}} onClick={()=>{
                setIsFollower(false);
                props.unfollowUser(props.currentUser._id);
                
              }}>Unfollow</button>:
                  <button style={{ backgroundColor: "", width: "20%", outline: "1px solid white", padding: "8px", borderRadius: "20px" }} onClick={ ()=>{
                        setIsFollower(true);
                      props.followUser(props.currentUser._id);
                  }}>Follow</button>
              }
          </div>
    </div>
  )
}
