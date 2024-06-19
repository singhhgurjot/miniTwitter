import React, { useState, useEffect } from 'react';
import "./tweetComponent.css";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EditIcon from '@mui/icons-material/Edit';
import axios from "../../../axios";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';

export default function TweetComponent(props) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "black",
      height: "50%",
      width: "50%"
    },
  };

  Modal.setAppElement('#root');

  const [modalIsOpen, setIsOpen] = useState(false);
  const [tweet, setTweet] = useState(props.post?.content || "");
  const [likes, setLikes] = useState(props.post?.likes || []);
  const [bookmarked, setBookmarked] = useState(props.user?.bookmarks?.includes(props.post?._id) || false);

  useEffect(() => {
    setLikes(props.post?.likes || []);
    setBookmarked(props.user?.bookmarks?.includes(props.post?._id) || false);
  }, [props.post?.likes, props.user]);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleLike = async () => {
    const isLiked = likes.includes(props.user?._id);
    const updatedLikes = isLiked
      ? likes.filter(id => id !== props.user._id)
      : [...likes, props.user._id];

    setLikes(updatedLikes);

    try {
      if (isLiked) {
        await axios().post(`${import.meta.env.VITE_API_BASE_URL}/tweets/unlike/${props.post._id}`);
      } else {
        await axios().post(`${import.meta.env.VITE_API_BASE_URL}/tweets/like/${props.post._id}`);
      }
    } catch (error) {
      // Revert state in case of error
      setLikes(likes);
      toast.error("Error updating like status", { position: "top-right" });
    }
  };

  const handleBookmark = async () => {
    const currentBookmarked = bookmarked;
    setBookmarked(!currentBookmarked);
    console.log("User when bookmarked",props.user);

    try {
      let updatedUser;
      if (currentBookmarked) {
        await axios().post(`${import.meta.env.VITE_API_BASE_URL}/tweets/unbookmark/${props.post._id}`);
        updatedUser = {
          ...props.user,
          bookmarks: props.user.bookmarks.filter(bookmark => bookmark !== props.post._id),
        };
        
      } else {
        await axios().post(`${import.meta.env.VITE_API_BASE_URL}/tweets/bookmark/${props.post._id}`);
        updatedUser = {
          ...props.user,
          bookmarks: [...props.user.bookmarks, props.post._id],
        };
      }
      props.setUser(updatedUser);
    } catch (error) {
      console.log(error);
      setBookmarked(currentBookmarked); // Revert state in case of error
      toast.error("Error updating bookmark status", { position: "top-right" });
    }
  };

  const handleUpdateTweet = async () => {
    try {
      const response = await axios().patch(`${import.meta.env.VITE_API_BASE_URL}/tweets/update/${props.post._id}`, { text: tweet });
      if (response.status === 200) {
        toast.success("Tweet Updated", { position: "top-right" });
        closeModal();
      } else {
        toast.error("Error Updating Tweet", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Error Updating Tweet", { position: "top-right" });
    }
  };

  const handleDeleteTweet = async () => {
    try {
      const response = await axios().delete(`${import.meta.env.VITE_API_BASE_URL}/tweets/delete/${props.post._id}`);
      if (response.status === 200) {
        toast.success("Tweet Deleted", { position: "top-right" });
        closeModal();
      } else {
        toast.error("Error Deleting Tweet", { position: "top-right" });
      }
    } catch (error) {
      toast.error("Error Deleting Tweet", { position: "top-right" });
    }
  };

  return (
    <div className='tweet'>
      <div className='flex tweetTop'>
        <img
          onClick={() => props.setProfileId(props.post?.userId?._id)}
          src={props.post?.userId?.profilePic || "https://photosbull.com/wp-content/uploads/2024/05/no-dp_16.webp"}
          style={{ height: "50px", width: "50px", borderRadius: "50%", cursor: "pointer" }}
        />
        <div className='topTweet'>
          <div className='flex nameuser' style={{ cursor: "pointer" }} onClick={() => props.setProfileId(props.post?.userId?._id)}>
            <p className='font-bold'>{props.post?.userId?.name}</p>
            <p style={{ color: "grey" }}>@{props.post.userId?.username}</p>
          </div>
          <p>{props.post.content}</p>
          {props.post?.tweetType === 'image' && (
            <img
              style={{ height: "400px", width: "800px", marginTop: "10px", borderRadius: "2%" }}
              src={props.post?.contentUrl}
              alt="Tweet content"
            />
          )}
          <div className='flex mt-5 justify-between bottomBar'>
            <div className='flex' style={{ gap: "50px" }}>
              <div className='flex' style={{ gap: "8px" }}>
                {likes.includes(props.user?._id)
                  ? <FavoriteIcon style={{ color: "red" }} onClick={handleLike} />
                  : <FavoriteBorderIcon onClick={handleLike} />}
                <p>{likes.length}</p>
              </div>
              <div className='flex' style={{ gap: "8px" }}>
                <ChatBubbleOutlineIcon />
                <p>{props.post?.comments?.length}</p>
              </div>
            </div>
            <div className='flex items-center' style={{ gap: "10px" }}>
              {props.isEditable && (
                <button style={{ color: "white" }} onClick={openModal}>
                  <EditIcon />
                </button>
              )}
              {bookmarked
                ? <BookmarkIcon style={{ color: "#1d9bf0" }} onClick={handleBookmark} />
                : <BookmarkBorderIcon onClick={handleBookmark} />}
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Edit Tweet"
              >
                <div style={{ height: "50%", width: "100%", backgroundColor: "grey" }}>
                  <textarea
                    value={tweet}
                    placeholder='Edit your tweet'
                    style={{ height: "100%", width: "100%", color: "black" }}
                    onChange={(e) => setTweet(e.target.value)}
                  />
                  <div className='flex' style={{ width: "100%", gap: "10px" }}>
                    <button
                      style={{ backgroundColor: "white", color: "black", padding: "2%", width: "100px", borderRadius: "200px" }}
                      onClick={handleUpdateTweet}
                    >
                      Update
                    </button>
                    <button
                      style={{ backgroundColor: "white", color: "black", padding: "2%", width: "100px", borderRadius: "200px" }}
                      onClick={handleDeleteTweet}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
