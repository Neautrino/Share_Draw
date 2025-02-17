import axios from "axios";
import { BACKEND_URL } from "../app/config";
import ChatRoomClient from "./ChatRoomClient";

async function getChats(roomId: string) {
    const response = await axios.get(`${BACKEND_URL}/chats/${roomId}`, {
        headers: {
            Authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNob3R1QGdtYWlsLmNvbSIsImlkIjoiN2ZmMGUzYjQtMDg4NS00YTEzLWJkMmEtY2RlMWU0OWQ1YTBmIiwiaWF0IjoxNzM5NzI5NTQzfQ.zbmsC4iYvJMl3J4qznVmNRHV75Bn6qPoCeeQcHuYiTk`
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