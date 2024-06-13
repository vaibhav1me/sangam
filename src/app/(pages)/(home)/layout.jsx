"use client";
import NavMenu from "@/components/NavMenu";
import { useUser } from "../../context/UserContextProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomeLayout({ children }) {
    const { user } = useUser();
    const router = useRouter();
    useEffect(() => {
      if (user == null) {
        router.push("/login");
      }
      // if (socket.connected) {
      //   console.log('connected to socket' + socket.id)
      //   }
      // socket.emit("checking", { data: "Hello" });
    }, [user]);
    
  return (
    <div className="flex">
      <NavMenu />
      <div className="w-[100%] h-screen overflow-y-scroll">{children}</div>
    </div>
  );
}
