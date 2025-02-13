"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react'

export default function OnboardingPage() {

  const [roomSlug, setRoomSlug] = useState<string>("");
  const router = useRouter();

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      gap: "1rem"
    }}>
      <input type="text" placeholder="Room name" value={roomSlug} onChange={(e) => setRoomSlug(e.target.value)}
        style={{
          padding: "0.5rem",
          fontSize: "1rem",
          border: "1px solid #ccc",
          borderRadius: "0.5rem",
          width: "300px"
        }}
      />
      <button onClick={async () => {
        router.push(`/room/${roomSlug}`);
      }}
      style={{
        padding: "0.5rem",
        fontSize: "1rem",
        border: "1px solid #ccc",
        borderRadius: "0.5rem",
        backgroundColor: "#333",
        color: "#fff",
        cursor: "pointer",
      }}
      >Join Room</button>
    </div>
  )
}