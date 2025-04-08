import { useState } from "react";
import { Loader } from "@react-three/drei";
import { WebGPUPostProcessing } from "./components/WebGPUPostProcessing";
import { Hall } from "./components/Hall";
import { Overlay } from "./components/Overlay";
import RoyalNaboo from "./components/Royal";
import { Light_Environment } from "./components/Light_Environment";
import { VaderScene } from "./components/VaderScene";
import { ManciniCanvas } from "./components/ManciniCanvas";
import { EditorPanel } from "./components/EditorPanel";

export default function App() {
  const [currentScene, setCurrentScene] = useState("vader");
  const [quality, setQuality] = useState("default");
  const [isPostProcessingEnabled, setIsPostProcessingEnabled] = useState(true);
  const [environmentSettings, setEnvironmentSettings] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  // Disable frameloop by default, waiting for WebGPU to be ready

  // 환경맵 설정 변경 핸들러
  const handleEnvironmentChange = (settings) => {
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
            strength={0.25}
            radius={0.1}
            quality={quality}
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
