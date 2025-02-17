"use client"

import { useEffect, useState, useRef } from "react";
import { useSocket } from "../hooks/useSocket"

export default function ChatRoomClient({
    messages,
    id
}: {
    messages: { message: string }[],
    id: number
}) {
    const { loading, socket } = useSocket();
    const [ currentMessage, setCurrentMessage ] = useState<string>("");
    const [ chats, setChats ] = useState<{ message: string }[]>(messages);

    useEffect(() => {
        if (socket && !loading) {

            console.log("User Connected to Chat Room");
            socket.send(JSON.stringify({
                type: "join-room",
                roomId: id
            }));

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === "chat") {
                    setChats(c => [...c, { message: data.message }]);
                }
            }

            return () => {
                console.log("User Disconnected from Chat Room");
                socket.send(JSON.stringify({
                    type: "leave-room",
                    roomId: id
                }));
            }
        }
    }, [socket, loading, id]);

    return (
        <div>
            {chats.map((msg, index) => (
                <div key={index}>
                    <p>{msg.message}</p>
                </div>
            ))}
            
            <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
            <button onClick={async () => {
                if (socket && !loading) {
                    socket.send(JSON.stringify({
                        type: "chat",
                        roomId: id,
                        message: currentMessage
                    }));
                    setCurrentMessage("");
                }
            }}>Send</button>
        </div>
    )
}