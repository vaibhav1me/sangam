"use client";
import { useUser } from "@/app/context/UserContextProvider";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatar from "@/app/assets/images/avatar.jpg";
import axios from "axios";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState(
    "The size of image should not be more than 1.5MB."
  );
  const { user, setUser } = useUser();
  const router = useRouter();

  // useEffect(() => {
  //   if (user == null || user?.length == 0) {
  //     const verifyUser = async () => {
  //       const response = await axios.get("/api/users/verifyUser")
  //       if (response.data.success) {
  //         setUser(response.data.user)
  //       } else {
  //         router.push("/login")
  //       }
  //     }
  //     verifyUser()
  //   }
  // }, [user]);

  useEffect(() => {
    setDetails(user);
  }, [user]);

  const saveProfile = async () => {
    setMessage("Saving...");
    const response = await axios.patch("/api/users/editProfile", details);
    console.log(response.data);
    setMessage(response.data.message);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <div className="pt-20 w-[70%] max-w-[700px] min-w-[] m-auto">
      <h1 className="font-bold text-[1.5rem] mb-10">Edit Profile</h1>
      <div className="">
        <div className="flex px-10 justify-between bg-dark-4 py-4 rounded-2xl items-center mb-10">
          <Image
            src={user?.profilePhoto ? user.profilePhoto : avatar}
            alt="avatar"
            height={16}
            width={16}
            className="h-[4rem] w-[4rem] rounded-full border-[3px] border-primary-600"
          />
          <label
            className="bg-primary-600 p-2 font-semibold rounded-lg hover:cursor-pointer"
            htmlFor="profilePhoto"
          >
            Change Photo
          </label>
          <input
            type="file"
            className="hidden"
            id="profilePhoto"
            name="profilePhoto"
            accept="image/png, image/jpg, image/jpeg"
            onChange={async (e) => {
              const result = await convertToBase64(e.target.files[0]);
              setDetails({ ...details, profilePhoto: result });
              setUser({ ...user, profilePhoto: result });
            }}
          />
        </div>
        <div className="flex flex-col mb-[30px]">
          <label
            htmlFor="email"
            className="mb-1 font-semibold text-primary-500"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            className="hover:cursor-not-allowed bg-dark-4 p-2 rounded-lg focus:outline-primary-500"
            value={user?.email}
            readOnly
          />
        </div>
        <div className="flex flex-col mb-[30px]">
          <label
            htmlFor="userName"
            className="mb-1 font-semibold text-primary-500"
          >
            Username
          </label>
          <input
            type="text"
            name="userName"
            id="userName"
            className="hover:cursor-not-allowed bg-dark-4 p-2 rounded-lg focus:outline-primary-500"
            value={user?.userName}
            readOnly
          />
        </div>
        <div className="flex flex-col mb-[30px]">
          <label htmlFor="bio" className="mb-1 font-semibold text-primary-500">
            Bio
          </label>
          <input
            type="text"
            name="bio"
            className=" bg-dark-4 p-2 rounded-lg focus:outline-primary-500"
            id="bio"
            value={details?.bio}
            onChange={(e) => {
              setDetails({ ...details, bio: e.target.value });
            }}
          />
        </div>
        <button
          className="bg-primary-600 p-2 font-semibold rounded-lg hover:cursor-pointer"
          onClick={() => {
            saveProfile();
          }}
        >
          Save
        </button>
        <p className="mt-2 text-center">{message}</p>
      </div>
    </div>
  );
};

export default EditProfile;
