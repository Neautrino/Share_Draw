import axios from "axios";
import { BACKEND_URL } from "../app/config";
import ChatRoomClient from "./ChatRoomClient";

async function getChats(roomId: string) {
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`, {
        headers: {
            Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNzaW5naDk4OHJAZ21haWwuY29tIiwiaWQiOiI2NWNhNmExMC1mNGQxLTQwYzktOTRjYS0zMTBhZjA5MmEwYjkiLCJpYXQiOjE3MzkwMDgyMDV9.89ip76psmDJxvODqL5GoZne9xVkWmC_geot7wwqMyDs`
        }
    });
    console.log(response.data.messages);
    return response.data.messages;
}

export default async function ChatRoom({id} : {id: string}) {
    const messages = await getChats(id);
    return (
        <div>
            <ChatRoomClient id={Number(id)} messages={messages} />
        </div>
    )
    
}