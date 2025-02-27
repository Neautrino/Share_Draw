'use client';

import initDraw from '@/draw';
import React, { useEffect, useRef } from 'react'

function CanvasPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        initDraw(canvas);
    }, [canvasRef])

  return (
    <div>
        <canvas ref={canvasRef} width={1900} height={925}/>
    </div>
  )
}

export default CanvasPage;