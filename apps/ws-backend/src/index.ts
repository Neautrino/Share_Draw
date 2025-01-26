import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, request) => {

    const url = request.url;
    if(!url) {
        return;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token");
    const decoded = jwt.verify(token as string, "Hello World");

    if(!decoded || !(decoded as JwtPayload).id) {
        ws.send("Unauthorized");
        ws.close();
        return;
    }

    ws.on("message", (data) => {
        ws.send(`Received: ${data}`);
    });
});