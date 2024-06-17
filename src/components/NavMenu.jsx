"use client";
import { NavLinks } from "@/constants/Data"
import NavLink from "./NavLink"
import { useRouter } from "next/navigation";
import logout from "@/app/assets/images/NavLinksImages/logout.svg";
import Image from "next/image";
import axios from "axios";
import { useUser } from "@/app/context/UserContextProvider";
import { useEffect } from "react";

const NavMenu = () => {
  const router = useRouter();
  const {user,setUser} = useUser();

  // useEffect(() => {
  //   if (user == null || user?.lenght == 0) {
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

  const logOut = async () => {
    const response = await axios.get('/api/users/logout')
    if (response.data.success) {
      setUser(null)
      router.push('/login')
    }
  }

  return (
    <nav className="max-w-[300px] bg-dark-3 rounded-tr-xl rounded-br-xl min-w-[200px] w-[20%] h-screen flex flex-col justify-between p-2 px-5">
      <div id="logo" className="mt-3 mb-10">
        <p className="m-auto text-center text-[2.2rem] w-[100%] max-w-[11rem] font-bold font-mono italic rounded-md px-3">Sangama</p>
        <p className="text-center text-[.7rem] text-primary-500">A place where hearts connect</p>
      </div>
      <div id="navItems" className="flex flex-col mb-10">
        {NavLinks.map((navLink) => {
          return <NavLink key={navLink.linkNo} {...navLink} />;
        })}
      </div>
      <div id="logout" className="flex mb-1" onClick={async () => {await logOut()}}>
        <Image src={logout} alt="alt" width={24} height={24} className="h-[1.5rem] w-[1.5rem] mr-2"/>
        <button className="text-[1.2rem] font-bold">Logout</button>
      </div>
    </nav>
  );
}

export default NavMenu