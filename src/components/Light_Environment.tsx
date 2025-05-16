import React from 'react'; // React import
import { Environment, OrbitControls, EnvironmentProps } from "@react-three/drei";
import * as THREE from 'three'; // THREE import 추가
import { Vector3 } from 'three'; // Vector3 타입 import

// 환경 설정 타입
interface EnvironmentSettings {
  preset: EnvironmentProps['preset']; // EnvironmentProps에서 preset 타입 가져오기
  intensity: number;
  rotation: [number, number, number]; // Euler 각도를 나타내는 숫자 배열로 한정
}

interface LightEnvironmentProps {
  environmentSettings: EnvironmentSettings | null;
}

export const Light_Environment: React.FC<LightEnvironmentProps> = ({ environmentSettings }) => {
  // 기본 환경맵 설정
  const defaultSettings: EnvironmentSettings = {
    preset: "sunset", // 기본 preset 값
    intensity: 0.7,
    rotation: [0.4, 0, 1.4]
  };

  // 에디터 패널에서 변경한 설정이 있으면 사용, 없으면 기본 설정 사용
  const settings = environmentSettings || defaultSettings;
  const eulerRotation = new THREE.Euler(...settings.rotation); // 숫자 배열을 Euler 객체로 변환

  return (
    <>
      <directionalLight
        position={[-0.7, 1.8, 0.1]}
        intensity={6}
        castShadow
        shadow-mapSize={[128, 128]} // width, height
        shadow-camera-near={2}
        shadow-camera-far={100}
        shadow-camera-top={3}
        shadow-camera-right={3}
        shadow-camera-bottom={-3}
        shadow-camera-left={-3}
        shadow-bias={-0.002}
      />
      <OrbitControls
        target={[2, -0.6, 0]} // Vector3Like
        // zoomSpeed={0.8}
        screenSpacePanning={false}
        dampingFactor={0.08}
        maxPolarAngle={Math.PI / 1.75}
        minPolarAngle={Math.PI / 2.7}
        maxDistance={2.4}
        minDistance={1}
        // minZoom={0.5} // OrbitControls에 minZoom, maxZoom은 직접적인 prop이 아닐 수 있음 (확인 필요)
        // maxZoom={1}
      />
      {/* Environment 컴포넌트의 props가 EnvironmentSettings와 호환되는지 확인 */}
      <Environment
        preset={settings.preset}
        environmentIntensity={settings.intensity}
        environmentRotation={eulerRotation} // Euler 객체 전달
      />
    </>
  );
} 