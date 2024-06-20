"use client"
import { useUser } from '@/app/context/UserContextProvider';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const CreatePost = () => {
    const {user} = useUser();
    const [message, setMessage] = useState("Please make sure the file size is less than 1 Mb.")
    const [post, setPost] = useState({title: "", description: "", createdBy: user?.userName, tags: [], file: "" })

    useEffect(() => {
        setPost({...post, createdBy: user?.userName})
    }, [user])

    const convertToBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          resolve(fileReader.result);
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };

    const createPost = async () => {
      setMessage("Creating Post...")
      const response = await axios.post("/api/posts/createPost",post);
      if(response.data.success){
        setMessage("Post created successfully.")
      } else {
        setMessage("Error while creating Post. Try again")
      }
    }

  return (
    <div className="pt-20 w-[70%] max-w-[700px] min-w-[] m-auto mb-10">
      <h1 className="font-bold text-[1.5rem] mb-10">Add a Post</h1>
      <div>
        <div className="flex flex-col mb-[30px]">
          <label
            htmlFor="title"
            className="mb-1 font-semibold text-primary-500"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title for your post"
            className="bg-dark-4 p-2 rounded-lg focus:outline-primary-500"
            value={post?.title}
            onChange={(e) => {
              setPost({ ...post, title: e.target.value });
            }}
          />
        </div>
        <div className="flex flex-col mb-[30px]">
          <label
            htmlFor="description"
            className="mb-1 font-semibold text-primary-500"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            className="bg-dark-4 p-2 rounded-lg focus:outline-primary-500"
            value={post?.description}
            onChange={(e) => {
              setPost({ ...post, description: e.target.value });
            }}
          ></textarea>
        </div>
        <div className="flex flex-col mb-[30px]">
          <label htmlFor="tags" className="mb-1 font-semibold text-primary-500">
            Tags (Separate Tags by comma)
          </label>
          <input
            type="text"
            name="tags"
            id="tags"
            placeholder="Tags for your post"
            className="bg-dark-4 p-2 rounded-lg focus:outline-primary-500"
            value={post?.tags.join(",")}
            onChange={(e) => {
              setPost({ ...post, tags: e.target.value.split(",") });
            }}
          />
        </div>
        <div className="flex flex-col mb-[30px]">
            <span className='mb-2'>
          <label htmlFor="file" className="font-semibold text-white p-1 bg-primary-500 cursor-pointer">
              Choose an image
          </label>
            </span>
          <Image
            alt="postImage"
            src={post?.file}
            height={16}
            width={16}
            className="h-[10rem] w-[10rem]"
          />
          <input
            type="file"
            name="file"
            id="file"
            className="hidden"
            onChange={async (e) => {
              const result = await convertToBase64(e.target.files[0]);
              setPost({ ...post, file: result });
            }}
          />
        </div>
        <button
          className="bg-primary-500 p-2 font-bold rounded-md mb-3"
          onClick={createPost}
        >
          Create Post
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default CreatePost