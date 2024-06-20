"use client"
import { useUser } from "@/app/context/UserContextProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios"
import Image from "next/image";
import liked from "@/app/assets/images/liked.svg"
import like from "@/app/assets/images/like.svg"
// import { socket } from "../socket";


export default function Home() {
  const {user, setUser} = useUser();
  const router = useRouter()
  const [message, setMessage] = useState("Hold on. Getting you feed ready.")
  const [posts, setPosts] = useState([])
  const [commentsArray, setCommentsArray] = useState([])
  const [comment, setComment] = useState("")
  // const socket = useSocket();

  // useEffect(() => {
  //   if (user == null || user?.length == 0) {
  //     const verifyUser = async () => {
  //       const response = await axios.get("/api/users/verifyUser");
  //       if (response.data.success) {
  //         setUser(response.data.user);
  //       } else {
  //         router.push("/login")
  //       }
  //     };
  //     verifyUser();
  //   }
  // }, [user]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/api/posts/getPosts")
      if (response.data.success) {
        setPosts(response.data.posts)
        setMessage("")
      }
    }
    if (posts.length == 0) {
      fetchPosts()
    }
    for (let index = 0; index < posts.length; index++) {
       setCommentsArray([...commentsArray, false])      
    }
  }, [posts])

  const showComments = (index) => {
    let updatedCommentsArray = [];
    for (let i = 0; i < commentsArray.length; i++) {
      updatedCommentsArray[i] = commentsArray[i];
    }
    updatedCommentsArray[index] = true;
    setCommentsArray(updatedCommentsArray)
  }

  useEffect(() => {
    console.log(commentsArray)
  },[commentsArray])

  const handleLike = async (postId) => {
    const response = await axios.post("/api/posts/likePost", {postId, userName: user?.userName})
    if (response.data.success) {
      const updatedPosts = posts.map((post) => {
        if (post._id === postId) {
          if (post.likedBy.includes(user?.userName)) {
            post.likes -= 1
            post.likedBy = post.likedBy.filter((userName) => userName !== user?.userName)
          } else {
            post.likes += 1
            post.likedBy.push(user?.userName)
          }
        }
        return post
      })
      setPosts(updatedPosts)
    }
  }

  const createComment = async (index,postId) => {
    let newPosts = [...posts];
    let updatedComments = newPosts[index].comments;
    updatedComments.push({createdBy: user?.userName, message: comment, createdAt: new Date()})
    const response = await axios.post("/api/posts/addComment", {postId, userName: user?.userName, comment})
    if (response.data.success) {
      newPosts[index] = {...(newPosts[index]), comments: updatedComments}
      setPosts(newPosts);
      setComment("")
    }
  }

  return (
    <div>
      {message}
      <div>
        {
          posts.length != 0 && (posts.map((post, index) => {
            return (
              <div key={post._id}>
                  <div>{post.title}</div>
                  <div><Image src={post.file} alt="alt" width={64} height={64} /></div>
                  <div>{post.description}</div>
                  <div>createdBy {post.createdBy}</div>
                  <div>
                  {
                    post.tags.map((tag) => {
                      return (
                        <div key={tag}>#{tag}</div>
                      )
                    })
                  }
                  </div>
                  <div>
                    <Image  onClick={() => {handleLike(post._id)}} src={post.likedBy.includes(user?.userName) ? liked : like} alt="alt" width={16} height={16} />
                    {/* {post.likes} */}
                    <span onClick={() => {console.log(2);console.log(index);showComments(index)}}>Comments</span>
                  </div>
                  <div id="comments" className={`${commentsArray[index] == false ? "hidden" : "block"} py-2 `}>
                    <div>
                      <input type="text" className="text-primary-500" placeholder="Comment" value={comment} onChange={(e) => {setComment(e.target.value)}}/>
                      <button onClick={() => {createComment(index, post._id)}}>Done</button>
                    </div>
                    <div>
                      {
                        post.comments?.length != 0 && (post.comments?.map((comment, index) => {
                          return (
                            <div key={index}>
                              <span>{comment.message}</span>
                              <span>created By {comment.createdBy}</span>
                            </div>
                          )
                        }))
                      }
                    </div>
                  </div>
              </div>
            )
          }))
        }
      </div>
    </div>
  );
}
