import React, { useEffect ,useState} from 'react'
import MainNav from '../../components/mainPageNav/mainPageNav'
import MainPageCenter from '../../components/mainPageCenter/mainPageCenter'
import MainPageRight from '../../components/mainPageRight/mainPageRight'
import axios from '../../../axios.js'
import "./profilePage.css"
import Tweet from '../../components/tweetComponent/tweetComponent.jsx'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify'
export default function profilePage(props) {
    const [user,setUser]=useState(null);
    const [posts,setPosts]=useState([]);
const [name,setName]=useState("");
const [bio,setBio]=useState("");

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor:"black",
            height:"50%",
            width:"50%"
        },
    };

    Modal.setAppElement('#root');
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        axios().get(`http://localhost:3000/api/users/profile/${props.profileId}`).then((res) => {
  
            setUser(res.data.user);
            setPosts(res.data.user.tweets);
            setName(res.data.user.name);
            setBio(res.data.user.bio);
        }).catch((err) => { 
            console.log(err);
        })
        axios().get(`http://localhost:3000/api/tweets/getTweets/${props.profileId}`).then((res) => {
          console.log("Posts", res.data.tweets);
            setPosts(res.data.tweets);
        })
        

    },[])
    const handleUpdate=()=>{
        console.log(name, bio);
        axios().post(`http://localhost:3000/api/users/updateProfile`,{name:name,bio:bio}).then((res)=>{
            toast.success("Profile Updated",{position:"top-right"});
        })
        closeModal();
    }
  return (
    
      <div style={{padding:"1%"}}className='text-white mpCenter profilePageOuter'>
        <div style={{width:"100%"}}className=''>
            <div className='flex justify-between items-center'>
                  <img style={{ borderRadius: "50%", height: "100px", width: "100px", marginTop: "2%" }} src={user?.profilePic != "" ? user?.profilePic :"https://photosbull.com/wp-content/uploads/2024/05/no-dp_16.webp"} ></img>
                  {props.user?._id==props?.profileId?<button onClick={openModal} className='rounded-full ' style={{ backgroundColor: "#1d9bf0", paddingTop: "10px", paddingBottom: "10px", width: "100px" }} >Edit Profile</button>:null}
                  <Modal
                      isOpen={modalIsOpen}
                      onAfterOpen={afterOpenModal}
                      onRequestClose={closeModal}
                      style={customStyles}
                      contentLabel="Edit Profile"
                  >
                      <div style={{width:"50%"}}className="">
                          <form className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
                              <div className="mb-4">
                                  <label
                                      className="block text-gray-700 text-sm font-bold mb-2"
                                      htmlFor="username"
                                  >
                                      Name
                                  </label>
                                  <input
                                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                      id="username"
                                      type="text"
                                      placeholder="Update your name"
                                      value={name}
                                      onChange={(e)=>{
                                        setName(e.target.value);
                                      }}
                                  />
                              </div>
                              <div className="mb-6">
                                  <label
                                      className="block text-gray-700 text-sm font-bold mb-2"
                                      htmlFor="password"
                                      
                                  >
                                      Bio
                                  </label>
                                  <input
                                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                      id="password"
                                      type="text"
                                      placeholder="Update your bio"
                                      value={bio}
                                      onChange={(e)=>{
                                        setBio(e.target.value);
                                      }}    
                                  />
                            
                              </div>
                              <div className="flex items-center justify-between">
                                  <button style={{borderRadius:"20px" ,padding:"10px", marginTop:"10%"}}
                                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                      type="button"
                                      onClick={handleUpdate}
                                  >
                                      Update!
                                  </button>
                                
                    
                              </div>
                          </form>
                          
                      </div>

                      
                  </Modal>
              </div>
        <div style={{gap:"2%" ,marginLeft:"2%",marginTop:"2%"}} className='flex flex-col'>
        <p  className="text-2xl">{user?.name}</p>
                  <p style={{ color: "#929289" }} >@{user?.username}</p>
                  <div className='flex' style={{ color: "#929289" , gap:"10px"}}><p>Followers   {user?.followers.length}</p> 
                  <p>Following {user?.following.length}</p>
                  </div>
              </div>
          </div>
          <div style={{width:"100%",marginTop:"2%"
          }}>
          {posts.map((post,index)=>{
            console.log("Post is",post.userId);
                if(post.userId?._id==props.user?._id){
            
            return(
                
             <Tweet  isEditable={true} user={props.user} key={index} post={post} likePost={props.likePost} unlikePost={props.unlikePost}></Tweet>
            )
        }
        else{
                    return (
                    <Tweet user={props.user} key={index} post={post} likePost={props.likePost} unlikePost={props.unlikePost}></Tweet>)
        }
            })}
          </div>
          <ToastContainer/>
        </div>
  )
}
