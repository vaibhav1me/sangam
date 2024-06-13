"use client"
import { useEffect } from "react";
import React from "react";
// import { socket } from "../socket";
import { useUser } from "../../context/UserContextProvider";
import { useRouter } from "next/navigation";

export default function Home() {
  // const socket = useSocket();
  const {user} = useUser()
  const router = useRouter()

  useEffect(()=>{
    if (user == null) {
      router.push("/login")
    }
    // if (socket.connected) {
    //   console.log('connected to socket' + socket.id)
    //   }
    // socket.emit("checking", { data: "Hello" });
  }, [user])

  return (
    <div>

    </div>
  );
}
