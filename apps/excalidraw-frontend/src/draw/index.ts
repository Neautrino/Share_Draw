import { BACKEND_URL } from "@/app/config";
import { useSocket } from "@/hooks/useSocket";
import axios from "axios";

type Shape = {
    type: "rect",
    x: number,
    y: number,
    width: number,
    height: number,
} | {
    type: "circle",
    centerX: number,
    centerY: number,
    radius: number,
}

interface MessageResponse {
    id: number;
    message: string;
    roomId: number;
    userId: string;
}

export default async function initDraw(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket | null) {

    const ctx = canvas.getContext("2d");
    if (!ctx) return; 1

    let existingShapes: Shape[] = await getExistingShapes(roomId);

    if (socket) {
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.type === "chat") {
                existingShapes.push(message.message);
                clearCanvas(existingShapes, ctx);
            }
        }
    }


    clearCanvas(existingShapes, ctx);

    let clicked = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", (e) => {
        clicked = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    canvas.addEventListener("mouseup", (e) => {
        clicked = false;
        const width = e.clientX - startX;
        const height = e.clientY - startY;
        const shape: Shape = {
            type: "rect",
            x: startX,
            y: startY,
            width,
            height,
        }
        existingShapes.push(shape);

        socket?.send(JSON.stringify({
            type: "chat",
            roomId: Number(roomId),
            message: JSON.stringify(shape),
        }));
    });

    canvas.addEventListener("mousemove", (e) => {
        if (clicked) {
            const width = e.clientX - startX;
            const height = e.clientY - startY;
            clearCanvas(existingShapes, ctx);
            ctx.strokeStyle = "white"
            ctx.strokeRect(startX, startY, width, height);
        }
    });
}

function clearCanvas(existingShapes: Shape[], ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    existingShapes.forEach(shape => {
        console.log(shape)
        if (shape.type === "rect") {
            ctx.strokeStyle = "white";``
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
        } else if (shape.type === "circle") {
            ctx.beginPath();
            ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
            ctx.stroke();
        }
    });
}

async function getExistingShapes(roomId: String) {
    const res = await axios.get(`${BACKEND_URL}/chats/${roomId}`, {
        headers: {
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNob3R1QGdtYWlsLmNvbSIsImlkIjoiMDc3YzI5YTktMmExOS00MGFlLTk0Y2UtYzI5ZDMzYTFjOGUyIiwiaWF0IjoxNzQwNjQ4MjU3fQ.o1S-uvFGa_B32Z4uAav0SvVakUCB_HzczsPj5-XhROQ"
        }
    })
    const messages: MessageResponse[] = res.data.messages;

    const shapes: Shape[] = messages.map((message: MessageResponse) => {
        let shape = JSON.parse(message.message);
        return shape;
    });

    return shapes;
}