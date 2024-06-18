"use client";
import { useUser } from "@/app/context/UserContextProvider";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import avatar from "@/app/assets/images/avatar.jpg";
import Image from "next/image";
import axios from "axios";

const Profile = () => {
  // const [editable, setEditable] = React.useState(false);
  const [message, setMessage] = useState("")
  const { user, setUser } = useUser();
  const [profile, setProfile] = useState({})
  const params = useParams();
  const userName = params.userName;
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      setMessage("Loading...")
      if (user?.userName != userName) {
        const response = await axios.post("/api/users/getUser", {userName});
        if (response.data.success) {
          if (response.data.user.length == 0) {
            setProfile({})
            setMessage("This link is broken.")
          } else {
            setProfile(response.data.user[0])
            setMessage("")
          }
        }
      } else {
        setProfile(user)
        setMessage("")
      }
    };
    getUser();
  }, [userName, user]);

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
  //     console.log(user?.profilePhoto)
  //   }
  // }, [user]);

  // useEffect(() => {
  //   console.log(userName);
  // }, [userName]);

  // useEffect(() => {
  //   if (user?.email && user.userName == userName) {
  //   }
  // }, [user]);

  return (
    // {/* Posts, Liked Posts, Saved Posts */}
    <>
      {!profile?.userName ? (
        <div className="mt-10 flex justify-around min-w-[500px] max-w-[55rem] w-[100%] m-auto px-4 mb-10">
          {message}
        </div>
      ) : (
        <div>
          <div
            id="profile"
            className="mt-10 flex justify-around min-w-[500px] max-w-[55rem] w-[100%] m-auto px-4 mb-10"
          >
            <div className="mr-5 min-w-[8rem]">
              <Image
                src={profile?.profilePhoto ? profile.profilePhoto : avatar}
                alt="profile"
                height={16}
                width={16}
                className="h-[8rem] w-[8rem] rounded-full border-[2px] border-primary-600"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex justify-between items-center my-2">
                <h1 className="mx-[30px] font-extrabold font-mono">
                  {profile?.userName}
                </h1>
                {user?.userName == userName ? (
                  <button
                    onClick={() => {
                      router.push("/editProfile");
                    }}
                    className="bg-primary-500 px-2 py-1 rounded-md font-bold mx-[30px]"
                  >
                    EditProfile
                  </button>
                ) : (
                  <button className="bg-primary-500 px-2 py-1 rounded-md font-bold mx-[30px]" onClick={() => {router.push(`/chats/${profile?.userName}`)}}>
                    Chat
                  </button>
                )}
              </div>
              <div className="flex justify-between items-center my-2 px-2">
                <span>{profile?.followers?.length} followers</span>
                <span>{profile?.following?.length} following</span>
              </div>
            </div>
          </div>
          <div
            id="line"
            className="h-[1px] bg-primary-500 min-w-[500px] max-w-[50rem] m-auto w-[96%]"
          ></div>
          <div></div>
        </div>
      )}
    </>
  );
};

export default Profile;
