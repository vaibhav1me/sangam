"use client"
import React, { useState } from 'react'

const CreatePost = () => {
    const [post, setPost] = useState({})

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

  return (
  <div className="pt-20 w-[70%] max-w-[700px] min-w-[] m-auto">
    <h1 className='text-[1.2rem] font-bold'>Add a Post</h1>
    <div>
        
    </div>
  </div>
  );
}

export default CreatePost