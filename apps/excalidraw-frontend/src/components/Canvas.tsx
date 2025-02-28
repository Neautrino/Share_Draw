'use client';

import initDraw from '@/draw';
import React, { useEffect, useRef } from 'react'

function Canvas({roomId, socket}: {roomId: string, socket: WebSocket}) {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    initDraw(canvas, roomId, socket);
  }, [canvasRef, roomId])

  return (
    <div>
      <canvas ref={canvasRef} width={1900} height={925} />
      <div className="absolute bottom-0 right-0">
        <div className="bg-white p-4 rounded-tl-lg flex justify-center items-center gap-4 h-full">
          <button className="text-black bg-gray-300 px-4 py-2 rounded-lg">
            Rect
          </button>
        <button className="text-black bg-gray-300 px-4 py-2 rounded-lg">
          Circle
        </button>
        <button className="text-black bg-gray-300 px-4 py-2 rounded-lg">
          Line
        </button>
        </div>
      </div>
    </div>
  )
}

export default Canvas;