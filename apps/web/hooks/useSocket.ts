import { useState, useEffect } from "react";
import { WEBSOCKET_URL } from "../app/config";

export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`${WEBSOCKET_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNob3R1QGdtYWlsLmNvbSIsImlkIjoiN2ZmMGUzYjQtMDg4NS00YTEzLWJkMmEtY2RlMWU0OWQ1YTBmIiwiaWF0IjoxNzM5NzI5NTQzfQ.zbmsC4iYvJMl3J4qznVmNRHV75Bn6qPoCeeQcHuYiTk`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []); 

    return { loading, socket };
}