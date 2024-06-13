"use client";
import { useUser } from '@/app/context/UserContextProvider';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import avatar from "@/app/assets/images/avatar.jpg"
import Image from 'next/image';

const Profile = () => {
  const [editable, setEditable] = React.useState(false);
  const { user } = useUser();
  const params = useParams();
  const userName = params.userName;

  useEffect(() => {
    console.log(userName);
  }, [userName]);

  useEffect(() => {
    if (user?.email && user.userName == userName) {
    }
  }, [user]);

  /*  Function to convert into base64 value
    From input tag, accepted ={.jpg, .jpeg, .png, .gif} etcc, the file value that will be passed is const file = e.target.files[0]
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
    */

  return (
    // {/* Posts, Liked Posts, Saved Posts */}
    <div>
      <div id='profile' className='mt-10 flex justify-around min-w-[500px] max-w-[55rem] w-[100%] m-auto px-4 mb-10'>
        <div className='mr-5 min-w-[8rem]'>
        <Image src={avatar} alt='profile' height={16} width={16} className='h-[8rem] w-[8rem] rounded-full'/>
        </div>
        <div className='flex flex-col justify-center'>
            <div className='flex justify-between items-center my-2'>
                <h1 className='mx-[30px] font-extrabold font-mono'>vaibhavbansal2025</h1>
                <button className='bg-primary-500 px-2 py-1 rounded-md font-bold mx-[30px]'>
                    Follow/EditProfile
                </button>
            </div>
            <div className='flex justify-between items-center my-2 px-2'>
                <span>0 posts</span>
                <span>159 followers</span>
                <span>150 following</span>
            </div>
        </div>
      </div>
        <div id="line" className='h-[1px] bg-primary-500 min-w-[500px] max-w-[50rem] m-auto w-[96%]'>

        </div>
      <div>

      </div>

      
    </div>
  );
}

export default Profile