import { useState, useEffect } from "react";
import { WEBSOCKET_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WEBSOCKET_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNzaW5naDk4OHJAZ21haWwuY29tIiwiaWQiOiI2NWNhNmExMC1mNGQxLTQwYzktOTRjYS0zMTBhZjA5MmEwYjkiLCJpYXQiOjE3MzkwMDgyMDV9.89ip76psmDJxvODqL5GoZne9xVkWmC_geot7wwqMyDs`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []); 

    return { loading, socket };
}