import React from 'react'
import "./createTweet.css"
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
export default function createTweet(props) {
    const [selectedImage, setSelectedImage] = React.useState(null);
    
  return (
    <div className='text-white createTweet '>
          <div className="flex firstCt" >
      <img src={props.user?.profilePic} className='createTweetPic'></img>
          
        <textarea placeholder="What's happening?" className='createTweetInput' onChange={(e)=>{
            props.setTweet(e.target.value);
            
        }}></textarea>
       </div>
          { selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: "100%", maxHeight: "200px", objectFit: "contain", marginTop: "10px" }} />}

       <div className="secondCt flex justify-between items-center"> 
<div>

              <input
                  type="file"
                  style={{ position: 'absolute', left: '-9999px' }}
                  id='file-input'  
                  onChange={(e)=>{
props.setTweetImage(e.target.files[0]);
const file=e.target.files[0];
                      if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                              setSelectedImage(reader.result);
                        
                          };
                          reader.readAsDataURL(file);
                      }    
                  }} 
              />
              <label htmlFor="file-input" className='fileInput'>
                      <ImageOutlinedIcon style={{ color:"#1d9bf0"}}sx={{ fontSize: 20  }} />
              </label>
              {   props.tweetImage &&(  
                      <HideImageOutlinedIcon style={{ color: "red",cursor:"pointer",marginLeft:"10px" }} sx={{ fontSize: 20 }} onClick={()=>{
                            props.setTweetImage(null);
                            setSelectedImage(null);
                      }} />
                      
              )
              }
              </div>
              <button className='rounded-full font-bold ' style={{ backgroundColor:"#1d9bf0",paddingTop:"10px", paddingBottom:"10px",width:"100px"}} onClick={()=>{
                    console.log(props.tweetImage)
                    props.handleSubmit();
                }}>Tweet</button>

       </div>
    </div>
  )
}
