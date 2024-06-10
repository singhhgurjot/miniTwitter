import React ,{useState} from 'react'
import "./mpRight.css"
import Search from '@mui/icons-material/Search'
import axios from "../../../axios"
import UserCard from "../userCard/userCard"
import ClearIcon from '@mui/icons-material/Clear';
import { toast,ToastContainer } from 'react-toastify'
export default function mainPageRight(props) {
  const [searchField,setSearchField]=useState("") ;
  const [searchResults,setSearchResults]=useState([]) ;
  const [discard,setDiscard]=useState(false) ;
  const handleSearch=()=>{

    if(searchField.trim()==="") return; 
    axios().post("http://localhost:3000/api/users/search",{query:searchField}).then((res)=>{
      setSearchResults(res.data.users);
      console.log("New users",res.data.users);
      setDiscard(!discard);
    }).catch((err)=>{
      console.log(err); 
    })
  }
  const followUser =(id)=>{
    axios().post(`http://localhost:3000/api/users/follow/${id}`).then((res)=>{
      toast.success("Followed User",{position:"top-right"})
      console.log(res.data);
    }).catch((err)=>{
      console.log(err);
    })
  }
  const unfollowUser = (id) => {
    axios().post(`http://localhost:3000/api/users/unfollow/${id}`).then((res) => {
      toast.success("Unfollowed User", { position: "top-right" })
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  }
  
  return (
    <div className='text-white mpRight p-2'> 
  <div className='flex items-center' style={{gap:"10px"}}>
   <input type=
        "text" placeholder="Search User" value={searchField}className='searchInput ' style={{ width: "90%", padding: "10px", borderRadius: "50px", backgroundColor:"#202327"}} onChange={(e)=>{
          setSearchField(e.target.value);
        }}/>
        {
          !discard?
        <Search style={{ cursor: "pointer" }} onClick={(e) => {
          handleSearch();
        }}></Search>:<ClearIcon style={{ cursor: "pointer" }} onClick={(e) => {
          setSearchField("");
          setSearchResults([]);
          setDiscard(!discard);
        }}> </ClearIcon>
      } 
      </div>{
      searchResults.map((user,key)=>{
        return (
        <UserCard unfollowUser={unfollowUser} followUser={followUser} user={props.user} currentUser={user} key={key}></UserCard>
        )
      })
      }
      
<ToastContainer/>
    </div>
  )
}
