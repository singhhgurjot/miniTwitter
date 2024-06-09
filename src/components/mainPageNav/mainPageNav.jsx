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
export default function mainPageNav(props){
    const [selected, setSelected] = useState(0);

  return (
    <div style={{gap:'3%' ,paddingLeft:"5% "}}className='text-white mainNav font-epi text-xl flex flex-col justify-center '>
          <div style={{ gap: '5%', padding: "6px", width: "50%" }} className='flex items-center tabs '>
            <div>
      <HomeIcon sx={{fontSize:35}}/>
              </div>
              <div>
                  <p className=' mt-2 text-lg tab-name'>Home</p>
              </div>
             
     
          </div>
          <div style={{ gap: '5%', padding:"6px", width:"50%"}} className='flex items-center tabs'>
              <div>
                  <SearchIcon sx={{ fontSize: 35 }} />
              </div>
              <div>
                  <p className=' mt-2 text-lg tab-name'>Explore</p>
              </div>


          </div>
          {/* <div style={{ gap: '5%' }} className='flex items-center'>
              <div>
                  <NotificationsIcon sx={{ fontSize: 35 }} />
              </div>
              <div>
                  <p className=' mt-2 text-lg'>Notifications</p>
              </div>


          </div> */}
          <div style={{ gap: '5%', padding: "6px", width: "50%" }} className='flex tabs items-center'>
              <div>
                  <PersonIcon sx={{ fontSize: 35 }} />
              </div>
              <div>
                  <p className=' mt-2 text-lg tab-name'>Profile</p>
              </div>


          </div>
          <div style={{ gap: '5%', padding: "6px", width: "60%" }} className='flex tabs items-center'>
              <div>
                  <BookmarkIcon sx={{ fontSize: 35 }} />
              </div>
              <div>
                  <p className=' mt-2 text-lg tab-name'>Bookmarks</p>
              </div>


          </div>
          <div style={{ gap: '5%', padding: "6px", width: "50%" }} className='flex tabs items-center'>
              <div>
                  <LogoutIcon sx={{ fontSize: 35 }} />
              </div>
              <div>
                  <p className=' mt-2 text-lg tab-name'>Logout</p>
              </div>
          </div>
        <div>
              <button style={{ backgroundColor:"#1d9bf0" ,paddingLeft:"30%" ,paddingRight:"30%" ,borderRadius:"30px",paddingTop:"15px",paddingBottom:"15px"}} className=' navButton'><p className="tab-name">Post</p></button>

        </div>
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
