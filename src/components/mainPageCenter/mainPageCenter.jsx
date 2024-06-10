import React from 'react'
import "./mainPageCenter.css"
import { TracingBeam } from '../tracingBeam/tracingBeam'
import CreateTweet
 from '../createTweet/createTweet'
 import Tweet from "../tweetComponent/tweetComponent"
 import { useState } from 'react'
 import axios from '../../../axios.js'
export default function mainPageCenter(props) {
  const [activeTab, setActiveTab] = useState('forYou');

  return (
     
    <div className='text-white mpCenter '>
      <div className="tabs-container">
        <div className="tabss">
          <div
            className={`tab ${activeTab === 'forYou' ? 'active' : ''}`}
            onClick={() => {
              axios().get("http://localhost:3000/api/tweets/getAllTweets").then((res) => {
                props.setPosts(res.data.tweets);
              })
              setActiveTab('forYou')}}
          >
            For You
          </div>
          <div
            className={`tab ${activeTab === 'following' ? 'active' : ''}`}
            onClick={() => {
              axios().get("http://localhost:3000/api/tweets/getFollowersTweets").then((res) => {
                props.setPosts(res.data.tweets);
              })
              setActiveTab('following')}
          }

          >
            Following
          </div>
          
        </div>
        
      </div>
       <CreateTweet tweet={props.tweet} setTweet={props.setTweet} tweetImage={props.tweetImage}
        setTweetImage={props.setTweetImage}
       tweetType={props.tweetType} setTweetType={props.setTweetType} user={props.user} handleSubmit={props.handleSubmit}/>
      {props.posts?.map((post,index)=>{
        return <Tweet profileId={props.profileId} setProfileId={props.setProfileId} isProfile={props.isProfile} setIsProfile={props.setIsProfile}  user={props.user} key={index} post={post} likePost={props.likePost} unlikePost={props.unlikePost}></Tweet>
      } )}
      
    </div>
   
  )
}
