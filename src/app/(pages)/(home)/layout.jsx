"use client";
import { useUser } from "@/app/context/UserContextProvider";
import NavMenu from "@/components/NavMenu";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { socket } from "@/socket";

export default function HomeLayout({ children }) {
    const { user, setUser } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (socket.connected) {
        console.log("connected to socket" + socket.id);
      }
      // socket.emit("checking", { msg: "hello" });
    }, []);
    

    useEffect(() => {
      if (user == null || user?.length == 0) {
      const verifyUser = async () => {
        const response = await axios.get("/api/users/verifyUser")
        if (response.data.success) {
          setUser(response.data.user)
        } else {
          router.push("/login")
        }
      }
      verifyUser()
    }
    }, [user])

  return (
    <div className="flex min-w-[630px]">
      <NavMenu />
      <div className="w-[100%] h-screen overflow-y-scroll">{children}</div>
    </div>
  );
}
