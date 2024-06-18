"use client"
import { useUser } from '@/app/context/UserContextProvider'
import axios from 'axios'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import avatar from '@/app/assets/images/avatar.jpg'

const Chat = () => {
  const params = useParams()
  const userName = params.userName;
  const {user} = useUser();
  const [person, setPerson] = useState({})
  const [broken, setIsBroken] = useState(false)
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("")

  useEffect(() => {
    const fetchPerson = async () => {
      const response = await axios.post("/api/users/getUser", {userName})
      if (response.data.success) {
        if (response.data.user?.length == 0) {
          setIsBroken(true)
        } else {
          setPerson(response.data.user[0])
        }
      }
    }
    if (broken == false && !person?.userName) {
      fetchPerson()
    }
  }, [userName, user])
  
  useEffect(() => {
    const fetchChats = async () => {
      const response = await axios.post("/api/chats/getChat", {personOne: userName, personTwo: user?.userName})
      if (response.data.success) {
        if (response.data.chats?.length != 0) {
          setChats(response.data.chats?.messages)
          console.log("Hi",response.data.chats?.messages)
        } else {
          setChats([])
        }
      }
    }
    if (chats == [] && person?.userName && user?.userName) {
      fetchChats()
    }
    console.log("Chats", chats)
  }, [chats, person, user])

  const sendMessage = async () => {
    if(message != ""){
      
    }
  }

  return (
    <div className="h-screen ">
      {broken ? (
        <div className="mt-10 flex justify-around min-w-[500px] max-w-[55rem] w-[100%] m-auto px-4 mb-10">
          {" "}
          This link is broken.{" "}
        </div>
      ) : (
        <div className="mt-10 min-w-[500px] max-w-[55rem] w-[90%] m-auto px-4 mb-10">
          <div className='w-[100%] flex justify-between items-center bg-primary-500 px-2 py-1'>
            <Image src={person?.profilePhoto ? person?.profilePhoto : avatar} alt='profile' className='h-[2.5rem] w-[2.5rem] rounded-full' />
            <span className='text-white'>{person?.userName}</span>
          </div>
          <div>
          {
            chats.length == 0 ? (
              <div className='text-center h-[80vh]'>There are no chats between you. Start conversation now</div>
            ) : (
              <div>
                {
                  chats.length!= 0 && chats?.map()
                }
              </div>
            )
          }
          </div>
          <div className="w-[100%]">
            <input type="text" placeholder="Type your message" value={message} onChange={(e) => {setMessage(e.target.value)}} className='bg-light-4 px-2 py-1 rounded-md mr-2' />
            <button className='' onClick={() => {sendMessage()}}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat