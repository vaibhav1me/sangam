"use client"
import { useUser } from '@/app/context/UserContextProvider'
import { socket } from '@/socket'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Chats = () => {
    const [chats, setChats] = useState([])
    const {user, setUser} = useUser();

    useEffect(() => {
        if (user?.userName) {
            socket.emit("joinRoom", {room: user?.userName})
            socket.on("joinedRoom", (data) => {
              console.log("Rooms", data);
            });
        }

        const fetchChats = async () => {
            const response = await axios.post("/api/chats/getAllChats", {
              userName: user?.userName,
            });
            if (response.data.success) {
                
            }
        }
        if (user?.userName) {
            fetchChats()
        }
    }, [user])

  return (
    <div>
      
    </div>
  )
}

export default Chats