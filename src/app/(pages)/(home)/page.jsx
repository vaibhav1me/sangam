"use client"
import { useUser } from "@/app/context/UserContextProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios"
import Image from "next/image";
import liked from "@/app/assets/images/liked.svg"
import like from "@/app/assets/images/like.svg"
import Link from "next/link";
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
    if (updatedCommentsArray[index] == true) {
      updatedCommentsArray[index] = false;
      setCommentsArray(updatedCommentsArray)
      return
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
    if (comment != "") {
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

  }

  return (
    <div className="mt-10 flex items-center min-w-[450px] max-w-[55rem] w-[100%] m-auto px-4 mb-10">
      <div className="text-center">{message}</div>
      <div className="flex flex-col m-auto">
        {posts.length != 0 &&
          posts.map((post, index) => {
            return (
              <div key={post._id} className="rounded-2xl flex flex-col w-[400px] m-auto mb-10 bg-dark-4 p-5">
                <div className="text-[1.3rem] text-primary-500 font-bold mb-1">{post.title}</div>
                <div className="text-left text-[0.8rem] mb-5 text-secondary-500">posted By {post.createdBy}</div>
                <div >
                  <Image src={post.file} alt="alt" width={64} height={64} className="h-[15rem] w-[15rem] mb-4 m-auto" />
                </div>
                <div className="text-[0.9rem] mb-3">{post.description}</div>
                <div>
                  {post.links?.map((link) => {
                    return <Link className="text-secondary-500 mr-1 text-[.7rem] cursor-pointer mb-3 inline-block" href={link} target="_blank" key={link}>{link}</Link>;
                  })}
                </div>
                <div>
                  {post.tags.map((tag) => {
                    return <span className="text-secondary-500 mr-1 text-[.7rem]" key={tag}>#{tag.trim()}</span>;
                  })}
                </div>
                <div className="flex items-center justify-between">
                  <Image
                    onClick={() => {
                      handleLike(post._id);
                    }}
                    src={post.likedBy.includes(user?.userName) ? liked : like}
                    alt="alt"
                    width={16}
                    height={16}
                    className="h-[1.5rem] w-[1.5rem] my-2 cursor-pointer"
                  />
                  {/* {post.likes} */}
                  <span
                    onClick={() => {
                      console.log(2);
                      console.log(index);
                      showComments(index);
                    }}
                    className="cursor-pointer"
                  >
                    Comments
                  </span>
                </div>
                <div
                  id="comments"
                  className={`${
                    commentsArray[index] == false ? "hidden" : "block"
                  } py-2 `}
                >
                  <div className="flex justify-between mb-3">
                    <input
                      type="text"
                      className="outline-none mr-1 py-1 px-2 w-[80%] rounded-md bg-secondary-500 text-black font-semibold"
                      placeholder="Comment"
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    />
                    <button
                      onClick={() => {
                        createComment(index, post._id);
                      }}
                      className="bg-primary-600 py-1 px-2 rounded-md font-bold"
                    >
                      Done
                    </button>
                  </div>
                  <div>
                    {post.comments?.length != 0 &&
                      post.comments?.map((comment, index) => {
                        return (
                          <div key={index} className="bg-light-4 mb-1 px-4 rounded-md">
                            <div className="text-[.5rem]">created By {comment.createdBy}</div>
                            <div className="font-bold">{comment.message}</div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
