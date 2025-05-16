import React, { useRef, useState, PropsWithChildren } from 'react';
import { Canvas, RootState } from "@react-three/fiber";
import { WebGPURenderer } from 'three/webgpu'; 
import { ResizeHandler } from "./ResizeHandler";

// extend(THREE); // extend 호출은 잠시 주석 처리하여 오류 영향 확인

interface ManciniCanvasProps extends PropsWithChildren {
  quality: string;
}

export const ManciniCanvas: React.FC<ManciniCanvasProps> = ({ quality, children }) => {
  const rendererRef = useRef<WebGPURenderer | null>(null);
  const [frameloop, setFrameloop] = useState<"always" | "demand" | "never">("never");

  return (
    <Canvas
      onCreated={(state: RootState) => {
        // setSize는 자동으로 처리될 수 있으므로 명시적 호출이 필요 없을 수 있음
        // state.setSize(window.innerWidth, window.innerHeight);
      }}
      frameloop={frameloop}
      dpr={quality === "default" ? 1 : [1, 1.5]}
      camera={{
        position: [18.6, -0.6, 0],
        near: 0.1,
        far: 50,
        fov: 65,
      }}
      shadows={"variance"}
      gl={(glProps: any): WebGPURenderer => {
        const canvasElement = glProps.canvas as HTMLCanvasElement;
        
        const renderer = new WebGPURenderer({
          canvas: canvasElement,
          powerPreference: "high-performance",
          antialias: true,
          alpha: false,
          stencil: false,
        });

        // renderer.init()은 WebGPURenderer 초기화 방식에 따라 필요 없을 수 있습니다.
        // 최신 버전에서는 생성자에서 바로 사용 가능하거나, 별도의 async init 함수가 있을 수 있습니다.
        // 우선 init() 호출을 유지하되, 문제가 되면 API 문서를 확인해야 합니다.
        (async () => {
          try {
            await renderer.init();
            setFrameloop("always");
          } catch (e) {
            console.error("Failed to initialize WebGPURenderer", e);
            // WebGLRenderer로 폴백하거나 사용자에게 알림 등의 처리
          }
        })();
        
        rendererRef.current = renderer;
        return renderer;
      }}
    >
      {children}
      <ResizeHandler quality={quality} rendererRef={rendererRef} />
    </Canvas>
  );
} 