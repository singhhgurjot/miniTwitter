import React,{useState} from 'react'
import "./mainPageNav.css"
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Button } from '@mui/material';
import dp from "../../assets/dp.jpeg"
import { UserState } from '../../userContext.jsx';
import axios from '../../../axios.js';
import { useNavigate } from 'react-router-dom';
export default function mainPageNav(props){
    const navigate=useNavigate();
    const [selected, setSelected] = useState(0);

    const navItems = [
        { id: 0, icon: <HomeIcon className={`nav-icon ${selected === 0 ? 'icon-selected' : ''}`} />, label: 'Home',onClick:()=>{
            onHome();
        } },
        { id: 2, icon: <PersonIcon className={`nav-icon ${selected === 2 ? 'icon-selected' : ''}`} />, label: 'Profile', onClick: () => { onProfile() } } ,
        { id: 3, icon: <BookmarkIcon className={`nav-icon ${selected === 3 ? 'icon-selected' : ''}`} />, label: 'Bookmarks', onClick: () => { onBookmarks() }  },
        { id: 4, icon: <LogoutIcon className={`nav-icon ${selected === 4 ? 'icon-selected' : ''}`} />, label: 'Logout',onClick:()=>{
                onLogout()
        } },
    ];
        const onBookmarks=()=>{
            setSelected(3);
            props.setIsProfile(false);
            props.setProfileId(null);
            axios().get("http://localhost:3000/api/tweets/getbookmarks").then((res)=>{ 
                console.log("Bookmarks",res.data.bookmarks);
                props.setPosts(res.data.bookmarks);
            })
        }
        const onHome=()=>{
            setSelected(0);
            props.setIsProfile(false);
            props.setProfileId(null);
            props.setIs
            axios().get("http://localhost:3000/api/tweets/getFollowersTweets").then((res) => {
                console.log("POSTS LIST", res.data.tweets);
                props.setPosts(res.data.tweets);
            })
        }
     
        const onProfile=()=>{
          
            props.setIsProfile(true);
            props.setProfileId(props.user._id);
setSelected(2);
        }
        const onLogout=()=>{
            setSelected(4);
            localStorage.removeItem("token");
            navigate("/login");
            
        }

  return (
    <div style={{gap:'3%' ,paddingLeft:"5% "}}className='text-white mainNav font-epi text-xl flex flex-col justify-center '>
      
        
        
          {navItems.map((item) => (
              <div
                  key={item.id}
                  
                  style={{ gap: '5%', padding: "6px", width: "50%" }}
                  className={`flex items-center tabs ${selected === item.id ? 'selected' : ''}`}
                  onClick={item.onClick}
              >
                  <div>{item.icon}</div>
                  <div>
                      <p className={`mt-2 text-lg tab-name ${selected === item.id ? 'text-selected' : ''}`}>
                          {item.label}
                      </p>
                  </div>
              </div>
          ))}
       
        <div style={{width:"70%",marginTop:"20px"}} className='flex items-center'>
              <img src={props.user?.profilePic != "" ? props.user?.profilePic :"https://photosbull.com/wp-content/uploads/2024/05/no-dp_16.webp"} alt={""} className="imagee" />
                  <div style={{marginLeft:"5%"}}className='flex flex-col'>
                <p className="text-sm ">{props.user?.name}</p>
                  <p style={{ color:"grey"}}className='text-sm '>@{props.user?.username}</p>
              </div>
        </div>
    </div>
  )
}
