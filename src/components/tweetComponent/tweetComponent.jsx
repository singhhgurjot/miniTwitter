import React from 'react'
import "./tweetComponent.css"
export default function tweetComponent() {
  return (
    <div className='tweet'>
      <div className='flex tweetTop'>
          
          <img src="https://i.pinimg.com/236x/5d/02/f7/5d02f7a385be2e52c836bd25192029dd.jpg" style={{height:"50px" ,width:"50px" ,borderRadius:"50%"}}></img>
          <div className=' '>
                  <div className='flex nameuser'>
          <p className='font-bold '>Gurjot Singh   </p>
          <p  style={{color:"grey"}}className=''>@singhhgurjot</p>
                  </div>
          
          <p>Hello</p>
                  <img style={{ height: "70%", width: "100%" }} src='https://cdn.pixabay.com/photo/2023/08/02/18/21/yoga-8165759_640.jpg'></img>
                  
              </div>

              
          </div>
          
    </div>

  )
}
