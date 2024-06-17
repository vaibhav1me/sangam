"use client";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext(null);

export const useUser = () => {
  const {user, setUser} = useContext(UserContext);
  return {user, setUser };
};

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   if (user == null || user?.length == 0) {
  //     const verifyUser = async () => {
  //       const response = await axios.get("/api/users/verifyUser");
  //       // console.log(response.data);
  //       if (response.data.user) {
  //         setUser(response.data.user[0]);
  //       }
  //     };
  //     verifyUser();
  //   }
  // }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
