"use client";
import { useUser } from "@/app/context/UserContextProvider";
import { socket } from "@/socket";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatar from "@/app/assets/images/avatar.jpg";
import { useRouter } from "next/navigation";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { user, setUser } = useUser();
  const [message, setMessage] = useState("");
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (user?.userName) {
      socket.emit("joinRoom", { room: user?.userName });
      socket.on("joinedRoom", (data) => {
        console.log("Rooms", data);
      });
    }

    const fetchChats = async () => {
      setMessage("Loading your chats...");
      const response = await axios.post("/api/chats/getAllChats", {
        userName: user?.userName,
      });
      if (response.data.success) {
        setChats(response.data.chats);
      }
      setMessage("");
    };
    if (user?.userName) {
      fetchChats();
    }
  }, [user]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetailsMap = {};
      for (const chat of chats) {
        let person =
          chat.personOne === user?.userName ? chat.personTwo : chat.personOne;
        if (!userDetailsMap[person]) {
          const response = await axios.post("api/users/getUser", {
            userName: person,
          });
          userDetailsMap[person] = response.data.user[0];
        }
      }
      setUserDetails(userDetailsMap);
    };

    fetchUserDetails();
  }, [chats, user]);

  return (
    <div className="pt-20 min-w-[450px] max-w-[55rem] w-[100%] m-auto px-4 mb-10">
      <div>{message}</div>
      <div className="flex flex-col w-[200px] m-auto">
        {chats.length != 0 && (
          <div className="w-[200%] mb-10 font-bold">
            Here are your previous chats.
          </div>
        )}
        {chats.length != 0 &&
          chats.map((chat, index) => {
            let person =
              chat.personOne === user?.userName
                ? chat.personTwo
                : chat.personOne;
            const personData = userDetails[person];
            return (
              <div
                key={index}
                className="mb-2 cursor-pointer "
                onClick={() => {
                  router.push(`/chats/${personData.userName}`);
                }}
              >
                {personData ? (
                  <>
                    <div className="flex items-center mb-2">
                      <Image
                        src={
                          personData.profilePhoto
                            ? personData.profilePhoto
                            : avatar
                        }
                        alt="profile photo"
                        width={16}
                        height={16}
                        className="h-[3rem] w-[3rem] rounded-full mr-3"
                      />
                      <span>{personData.userName}</span>
                    </div>
                    <div className="bg-secondary-500 h-[2px] px-2"></div>
                  </>
                ) : (
                  <p></p>
                )}
              </div>
            );
          })}
      </div>
      <div className="text-center mt-10">
        Search for users and chat with them
      </div>
    </div>
  );
};

export default Chats;
