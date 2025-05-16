import React, { useState } from "react";
import { Loader } from "@react-three/drei";
import { WebGPUPostProcessing } from "./components/WebGPUPostProcessing"; // .tsx로 변경 가정 또는 확인 필요
import { Hall } from "./components/Hall"; // .tsx로 변경 가정 또는 확인 필요
import { Overlay } from "./components/Overlay"; // .tsx로 변경 가정 또는 확인 필요
import RoyalNaboo from "./components/Royal"; // .tsx로 변경 가정 또는 확인 필요
import { Light_Environment } from "./components/Light_Environment"; // .tsx로 변경 가정 또는 확인 필요
import { VaderScene } from "./components/VaderScene"; // .tsx로 변경 가정 또는 확인 필요
import { ManciniCanvas } from "./components/ManciniCanvas"; // .tsx로 변경 가정 또는 확인 필요
import { EditorPanel } from "./components/EditorPanel"; // .tsx로 변경 가정 또는 확인 필요

// Props 타입 정의 (필요에 따라 구체화)
interface AppProps {}

// 환경 설정 타입 (예시, 실제 구조에 맞게 수정 필요)
interface EnvironmentSettings {
  // 예: intensity: number; color: string;
  [key: string]: any; // 우선 any로 두고 나중에 구체화
}

const App: React.FC<AppProps> = () => {
  const [currentScene, setCurrentScene] = useState<string>("vader");
  const [quality, setQuality] = useState<string>("default");
  const [isPostProcessingEnabled, setIsPostProcessingEnabled] = useState<boolean>(true);
  const [environmentSettings, setEnvironmentSettings] = useState<EnvironmentSettings | null>(null);
  const [showEditor, setShowEditor] = useState<boolean>(false);
  // Disable frameloop by default, waiting for WebGPU to be ready

  // 환경맵 설정 변경 핸들러
  const handleEnvironmentChange = (settings: EnvironmentSettings) => {
    setEnvironmentSettings(settings);
  };

  return (
    <>
      <Overlay
        isPostProcessingEnabled={isPostProcessingEnabled}
        setIsPostProcessingEnabled={setIsPostProcessingEnabled}
        setCurrentScene={setCurrentScene}
        currentScene={currentScene}
        setQuality={setQuality}
        quality={quality}
        showEditor={showEditor}
        setShowEditor={setShowEditor}
      />

      <Loader />

      <ManciniCanvas quality={quality}>
        <color attach="background" args={["black"]} />

        {isPostProcessingEnabled && (
          <WebGPUPostProcessing
            strength={0.25} // 타입 확인 필요
            radius={0.1} // 타입 확인 필요
            quality={quality} // 타입 확인 필요
          />
        )}

        <Light_Environment environmentSettings={environmentSettings} />

        <group position={[-1, 0, 0]}>
          <Hall position={[16.3, 0, -0.15]} scale={[1, 1, 1.3]} />

          <group
            visible={currentScene === "vader"}
            scale={[0.8, 0.8, 0.8]}
            position={[0, -0.25, 0]}
          >
            <VaderScene />
          </group>

          <RoyalNaboo
            visible={currentScene === "royal"}
            position={[3, -0.5, -2.2]}
            scale={0.35}
            rotation={[0, 0, 0]}
          />
        </group>
      </ManciniCanvas>

      {showEditor && (
        <div className="editor-container">
          <EditorPanel onEnvironmentChange={handleEnvironmentChange} />
        </div>
      )}
    </>
  );
}

export default App; 