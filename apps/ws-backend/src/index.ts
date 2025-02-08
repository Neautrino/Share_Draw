import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import {prismaClient} from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
    userId: string;
    ws: WebSocket;
    rooms: number[];
}

const users: User[] = [];

function checkUser(token: string): string | null {
    try {
        const decoded = jwt.verify(token as string, JWT_SECRET);
    
        if(!decoded || !(decoded as JwtPayload).id) {
            return null;
        }
    
        return (decoded as JwtPayload).id;
    } catch (error) {
        return null;
        
    }
}

wss.on("connection", (ws, request) => {

    const url = request.url;
    if(!url) {
        return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token");
    const userId = checkUser(token as string);

    if(userId == null) {
        ws.send("Invalid token");
        ws.close();
        return;
    }

    users.push({ userId, ws, rooms: [] });

    ws.on("message", async (data) => {
        const parsedData = JSON.parse(data.toString());

        if(parsedData.type === "join-room") {
            const roomId = parsedData.roomId;
            const user = users.find(u => u.userId === userId);

            if(!user) {
                return;
            }

            user.rooms.push(roomId);
        }

        if(parsedData.type === "leave-room") {
            const roomId = parsedData.roomId;
            const user = users.find(u => u.userId === userId);

            if(!user) {
                return;
            }

            user.rooms = user.rooms.filter(r => r !== roomId);
        }

        if(parsedData.type === "chat") {
            const roomId = parsedData.roomId;
            const user = users.find(u => u.userId === userId);
            const message = parsedData.message;

            if(!user) {
                return;
            }

            await prismaClient.chat.create({
                data: {
                    roomId,
                    message,
                    userId
                }
            })

            users.filter(u => {
                if(u.rooms.includes(roomId)){
                    u.ws.send(JSON.stringify({ type: "chat", message }));
                }
            });
        }
    });
});