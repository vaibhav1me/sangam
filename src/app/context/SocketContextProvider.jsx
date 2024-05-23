"use client"
import { createContext, useContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext()

export const useSocket = () => {
    const socket = useContext(SocketContext);
    return socket
}

export const SocketProvider = (props) => {
    const socket = io("http://localhost:3000")
    return <SocketContext.Provider value={socket}>
            {props.children}
    </SocketContext.Provider>
}