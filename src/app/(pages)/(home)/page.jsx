"use client"
import { useUser } from "@/app/context/UserContextProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import React from "react";
import axios from "axios"
// import { socket } from "../socket";


export default function Home() {
  const {user, setUser} = useUser();
  const router = useRouter()
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

  return (
    <div>
      
    </div>
  );
}
