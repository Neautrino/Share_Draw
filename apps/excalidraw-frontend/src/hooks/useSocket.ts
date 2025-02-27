import { useState, useEffect } from "react";
import { WEBSOCKET_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WEBSOCKET_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNob3R1QGdtYWlsLmNvbSIsImlkIjoiMDc3YzI5YTktMmExOS00MGFlLTk0Y2UtYzI5ZDMzYTFjOGUyIiwiaWF0IjoxNzQwNjQ4MjU3fQ.o1S-uvFGa_B32Z4uAav0SvVakUCB_HzczsPj5-XhROQ`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []); 

    return { loading, socket };
}