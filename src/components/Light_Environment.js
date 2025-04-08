import { Environment } from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";

export function Light_Environment({ environmentSettings }) {
  // 기본 환경맵 설정
  const defaultSettings = {
    preset: "sunset",
    intensity: 0.7,
    rotation: [0.4, 0, 1.4]
  };

  // 에디터 패널에서 변경한 설정이 있으면 사용, 없으면 기본 설정 사용
  const settings = environmentSettings || defaultSettings;

  return (
    <>
      <directionalLight
        position={[-0.7, 1.8, 0.1]}
        intensity={6}
        castShadow
        shadow-mapSize={[128, 128]}
        shadow-camera-near={2}
        shadow-camera-far={100}
        shadow-camera-top={3}
        shadow-camera-right={3}
        shadow-camera-bottom={-3}
        shadow-camera-left={-3}
        shadow-bias={-0.002}
      />
      <OrbitControls
        target={[2, -0.6, 0]}
        // zoomSpeed={0.8}
        screenSpacePanning={false}
        dampingFactor={0.08}
        maxPolarAngle={Math.PI / 1.75}
        minPolarAngle={Math.PI / 2.7}
        maxDistance={2.4}
        minDistance={1}
        minZoom={0.5}
        maxZoom={1}
      />
      <Environment
        preset={settings.preset}
        environmentIntensity={settings.intensity}
        environmentRotation={settings.rotation}
      />
    </>
  );
}
