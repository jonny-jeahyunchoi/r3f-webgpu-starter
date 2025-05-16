import React, { useEffect, RefObject } from 'react';
import { WebGPURenderer } from 'three/webgpu';

interface ResizeHandlerProps {
  quality: string;
  rendererRef: RefObject<WebGPURenderer | null>;
}

export const ResizeHandler: React.FC<ResizeHandlerProps> = ({ quality, rendererRef }) => {
  useEffect(() => {
    const handleResize = () => {
      if (rendererRef.current) {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [quality, rendererRef]);

  return null;
} 