"use client"
import { useUser } from '@/app/context/UserContextProvider';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import avatar from "@/app/assets/images/avatar.jpg"

const EditProfile = () => {
    const [details, setDetails] = useState("")
    const {user} = useUser();

    useEffect(() => {
        setDetails(user)
    }, [user])

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
    <div className='border-2 pt-20 w-[70%] max-w-[700px] min-w-[] m-auto'>
        <h1 className='font-bold text-[1.5rem] mb-10'>Edit Profile</h1>
        <div>
            <div className='flex px-10 justify-between bg-dark-4 py-4 rounded-2xl items-center mb-10'>
                <Image src={user?.profilePhoto ? user.profilePhoto : avatar} alt='avatar' height={16} width={16} className='h-[5rem] w-[5rem] rounded-full'/>
                <label className='bg-primary-600 p-2 font-semibold rounded-lg' htmlFor='profilePhoto'>
                    Change Photo
                </label>
                <input type="file" className='hidden' id='profilePhoto' name='profilePhoto' accept="image/png, image/jpg, image/jpeg"/>
            </div>
            <div className='flex flex-col mb-[30px]'>
                <label htmlFor="email" className='mb-1'>Email</label>
                <input type="text" name='email' id='email' className='hover:cursor-not-allowed bg-dark-4 p-2 rounded-lg' value={user?.email} readOnly/>
            </div>
            <div className='flex flex-col mb-[30px]'>
                <label htmlFor="userName" className='mb-1'>Username</label>
                <input type="text" name='userName' id='userName' className='hover:cursor-not-allowed bg-dark-4 p-2 rounded-lg' value={user?.userName}/>
            </div>
            <div className='flex flex-col mb-[30px]'>
                <label htmlFor="bio" className='mb-1'>Bio</label>
                <input type="text" name='bio' className=' bg-dark-4 p-2 rounded-lg' id='bio' value={details?.bio} onChange={(e) => {setDetails({...details, bio: e.target.value})}}/>
            </div>
        </div>
    </div>
  )
}

export default EditProfile