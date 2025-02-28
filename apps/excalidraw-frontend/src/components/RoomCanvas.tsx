'use client';

import { useSocket } from '@/hooks/useSocket';
import React, { useEffect } from 'react'
import Canvas from './Canvas';

function RoomCanvas({roomId}: {roomId: string}) {

  const { loading, socket } = useSocket();

  useEffect(() => {
    if (socket && !loading) {

        console.log("User Connected to Chat Room");
        socket.send(JSON.stringify({
            type: "join-room",
            roomId: roomId
        }));

        return () => {
            console.log("User Disconnected from Chat Room");
            socket.send(JSON.stringify({
                type: "leave-room",
                roomId: roomId
            }));
        }
    }
}, [socket, loading, roomId]);

  
  if(loading || socket==null) return <div>Loading...</div>

  return (
   <Canvas roomId={roomId} socket={socket} />
  )
}

export default RoomCanvas;