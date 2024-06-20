"use client";
import { useUser } from "@/app/context/UserContextProvider";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import avatar from "@/app/assets/images/avatar.jpg";
import { socket } from "@/socket";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const params = useParams();
  const userName = params.userName;
  const { user } = useUser();
  const [person, setPerson] = useState({});
  const [broken, setIsBroken] = useState(false);
  const [message, setMessage] = useState("");
  const [chatFetched, setChatFetched] = useState(false);

  useEffect(() => {
    const fetchPerson = async () => {
      const response = await axios.post("/api/users/getUser", { userName });
      if (response.data.success) {
        if (response.data.user?.length == 0) {
          setIsBroken(true);
        } else {
          setPerson(response.data.user[0]);
        }
      }
    };
    if (broken == false && !person?.userName && userName) {
      fetchPerson();
    }
  }, [userName, user]);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await axios.post("/api/chats/getChat", {
        personOne: userName,
        personTwo: user?.userName,
      });
      if (response.data.success) {
        if (response.data.chats?.length != 0) {
          setChats(response.data.chats[0]?.messages);
        }
      }
    };
    if (chats.length == 0 && user?.userName && userName && !chatFetched) {
      fetchChats();
      setChatFetched(true);
    }
  }, [userName, user, chats]);

  const updateChats = ({ message, from, Data }) => {
    console.log("Chats befor", chats);
    setChats([...chats, { message, sender: from, time: Data }]);
  };

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      const { message, from, to, Date } = data;
      console.log("Received message", data);
      if (from == userName && to == user?.userName) {
        updateChats({ message, from, Date });
      }
    });
  }, [chats, user, userName]);

  useEffect(() => {
    if (user?.userName) {
      socket.emit("joinRoom", { room: user?.userName });
      socket.on("joinedRoom", (data) => {
        console.log("Rooms", data);
      });
    }
  }, [user]);

  useEffect(() => {
    console.log("Chats changed", chats);
  }, [chats]);

  const sendMessage = async () => {
    if (message != "") {
      let spreadChats = [...chats];
      spreadChats.push({ message, sender: user?.userName, time: new Date() });
      console.log("Spread", spreadChats);
      setChats([...spreadChats]);
      socket.emit("sendMessage", {
        message,
        from: user?.userName,
        to: userName,
        Date: new Date(),
      });
      await axios.post("/api/chats/addChat", {
        sender: user?.userName,
        receiver: userName,
        message: message,
      });
      setMessage("");
    }
  };

  return (
    <div className="h-screen pt-10 pb-10">
      {broken ? (
        <div className="mt-10 flex justify-around min-w-[500px] max-w-[55rem] w-[100%] m-auto px-4 mb-10">
          {" "}
          This link is broken.{" "}
        </div>
      ) : (
        <div className="min-w-[400px] max-w-[55rem] w-[90%] m-auto px-4 mb-10">
          <div className="w-[100%] rounded-md mb-4 flex justify-between items-center bg-primary-500 p-3">
            <Image
              src={person?.profilePhoto || avatar}
              alt="profile"
              height={16}
              width={16}
              className="h-[2.5rem] w-[2.5rem] rounded-full"
            />
            <span className="text-white font-bold italic mr-3">
              {person?.userName}
            </span>
          </div>
          <div>
            {chats?.length == 0 ? (
              <div className="text-center h-[80vh] mt-10">
                {chatFetched
                  ? "Looks like there are no chats between you. What are you waiting for start now."
                  : "Loading chats..."}
              </div>
            ) : (
              <div className="h-[calc(100vh-190px)] min-h-[350px] overflow-y-scroll">
                {chats?.length != 0 &&
                  chats?.map((chat, index) => {
                    return (
                      <div
                        key={index}
                        className={`${
                          chat.sender == user?.userName
                            ? "flex flex-row-reverse "
                            : "flex "
                        } mb-1`}
                      >
                        <spam
                          className={`max-w[100px] px-2 font-bold  rounded-bl-md rounded-br-md ${
                            chat.sender == user?.userName
                              ? "bg-primary-500 rounded-tl-md"
                              : "bg-dark-4 rounded-tr-md"
                          }`}
                        >
                          {chat.message}
                        </spam>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
          <div className="w-[100%] pb-10 flex justify-center">
            <input
              type="text"
              placeholder="Type your message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              className="bg-light-4 px-2 py-1 rounded-md mr-2 w-[70%]"
            />
            <button
              className="w-[60px] bg-primary-600 rounded-md font-bold"
              onClick={() => {
                sendMessage();
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
