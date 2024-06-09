import React from 'react'
import "./mainPageCenter.css"
import { TracingBeam } from '../tracingBeam/tracingBeam'
import CreateTweet
 from '../createTweet/createTweet'
 import Tweet from "../tweetComponent/tweetComponent"
export default function mainPageCenter(props) {
    
  return (
     
    <div className='text-white mpCenter '>
       <CreateTweet tweet={props.tweet} setTweet={props.setTweet} tweetImage={props.tweetImage}
        setTweetImage={props.setTweetImage}
       tweetType={props.tweetType} setTweetType={props.setTweetType} user={props.user} handleSubmit={props.handleSubmit}/>
      <Tweet></Tweet>
    </div>
   
  )
}
