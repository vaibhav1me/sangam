"use client"
import { useUser } from '@/app/context/UserContextProvider';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import avatar from "@/app/assets/images/avatar.jpg"
import { useRouter } from 'next/navigation';

const Search = () => {
  const [message, setMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const source = axios.CancelToken.source()

    const searchUsers = async () => {
      if(searchValue!="") {
        setMessage("Searching for " + searchValue);
        const response = await axios.post("/api/users/search", {userName: searchValue});
        if (response.data.success) {
          if (response.data.users.length == 0) {
            setMessage("No users found with the name " + searchValue)
            setUsers([])
          } else {
            setUsers(response.data.users);
            setMessage("")
          }
        }
      }

    }
    searchUsers();

    return () =>{
      source.cancel("Previous request cancelled")
    }
  }, [searchValue])
  // const {user, setUser} = useUser();

    // useEffect(() => {
    //   if (user == null || user?.length == 0) {
    //     const verifyUser = async () => {
    //       const response = await axios.get("/api/users/verifyUser");
    //       if (response.data.success) {
    //         setUser(response.data.user);
    //       } else {
    //         router.push("/login");
    //       }
    //     };
    //     verifyUser();
    //   }
    // }, [user]);

  return (
    <div className="pt-20 w-[70%] max-w-[700px] min-w-[] m-auto">
      <div className='mb-5'>
        <input type="text" className='w-full bg-light-4 p-2 text-black rounded-md' value={searchValue} onChange={(e) => {setSearchValue(e.target.value)}} placeholder='Search for users'/>
      </div>
      <div className='text-center'>
        {message == "" && users.length == 0 ? "Try searching for users" : ""}
        {message}
      </div>
      {
        users.length != 0 && <div className='p-2'>
          {
            users.map((user) => {
              return (<>
                <div key={user._id} className='cursor-pointer flex items-center mb-2.5' onClick={() => {router.push(`/profile/${user.userName}`)}}>
                  <Image src={user?.profilePhoto != "" ? user.profilePhoto : avatar } alt='profilePhoto' width={16} height={16} className='h-[4rem] w-[4rem] rounded-full mr-5'/>
                  <span className='text-[1.6rem] text-primary-500'>{user.userName}</span>
                </div>
                  <div className='bg-primary-600 h-[1px] mb-2.5'></div>
                  </>
              )
            })
          }
          
        </div>
      }
    </div>
  )
}

export default Search