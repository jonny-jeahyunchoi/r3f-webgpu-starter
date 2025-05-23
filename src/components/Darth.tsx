/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: AFTONBLADET (https://sketchfab.com/wallander)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/darth-vader-by-makeamo-5b3371f4789c41eeaa691c9a3dfe1a96
Title: Darth Vader by Makeamo
*/

import React from "react"; // React import 추가
import { useGLTF } from "@react-three/drei";
import { Material, Mesh } from "three/webgpu"; // Material, Mesh 타입 추가
import { GLTF } from 'three-stdlib'; // GLTF 타입 추가
import { ThreeElements } from '@react-three/fiber'; // ThreeElements import 추가

// useGLTF 훅에서 반환되는 타입 정의
interface GLTFResult extends GLTF {
  nodes: {
    DARTH_Sabel_vit_0: Mesh;
    DARTH_darthvader_VaderConsolesFlickermat_0: Mesh;
    DARTH_darthvader_VaderCapemat_0: Mesh;
    DARTH_darthvader_VaderHelmetRimmat_0: Mesh;
    DARTH_darthvader_VaderBodyArmourmat_0: Mesh;
    DARTH_Laser_0: Mesh;
    DARTH_Sabel_svart_0: Mesh;
  };
  materials: {
    Sabel_vit: Material;
    darthvader_VaderConsolesFlickermat: Material & { roughness: number };
    darthvader_VaderCapemat: Material & { roughness: number; metalness: number };
    darthvader_VaderHelmetRimmat: Material & { roughness: number; metalness: number };
    darthvader_VaderBodyArmourmat: Material & { roughness: number; metalness: number };
    Laser: Material;
    Sabel_svart: Material & { emissiveIntensity: number };
  };
}

// @react-three/fiber의 ThreeElements 유틸리티 타입을 사용하여 Props 정의
type DarthProps = ThreeElements['group'] & {
  // 여기에 Darth 컴포넌트만의 추가적인 props를 정의할 수 있습니다.
  // 예: myCustomDarthProp?: string;
};

export const Darth: React.FC<DarthProps> = (props) => {
  const { nodes, materials } = useGLTF("/darth-transformed.glb") as unknown as GLTFResult; // 타입 단언을 unknown을 거치도록 수정

  // Material 속성 설정 (타입 안정성을 위해 null 체크 또는 단언 사용 가능)
  if (materials.Sabel_svart) materials.Sabel_svart.emissiveIntensity = 20;
  if (materials.darthvader_VaderConsolesFlickermat) materials.darthvader_VaderConsolesFlickermat.roughness = 0.2;
  if (materials.darthvader_VaderCapemat) {
    materials.darthvader_VaderCapemat.roughness = 0.2;
    materials.darthvader_VaderCapemat.metalness = 0.7;
  }
  if (materials.darthvader_VaderHelmetRimmat) {
    materials.darthvader_VaderHelmetRimmat.roughness = 0.3;
    materials.darthvader_VaderHelmetRimmat.metalness = 0.6;
  }
  if (materials.darthvader_VaderBodyArmourmat) {
    materials.darthvader_VaderBodyArmourmat.roughness = 0.2;
    materials.darthvader_VaderBodyArmourmat.metalness = 0.9;
  }

  return (
    /* @ts-ignore JSX Intrinsic Element 오류는 추후 해결 */
    <group {...props} dispose={null}>
      {/* @ts-ignore JSX Intrinsic Element 오류는 추후 해결 */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DARTH_Sabel_vit_0.geometry}
        material={materials.Sabel_vit}
      />
      {/* @ts-ignore JSX Intrinsic Element 오류는 추후 해결 */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DARTH_darthvader_VaderConsolesFlickermat_0.geometry}
        material={materials.darthvader_VaderConsolesFlickermat}
      />
      {/* @ts-ignore JSX Intrinsic Element 오류는 추후 해결 */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DARTH_darthvader_VaderCapemat_0.geometry}
        material={materials.darthvader_VaderCapemat}
      />
      {/* @ts-ignore JSX Intrinsic Element 오류는 추후 해결 */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DARTH_darthvader_VaderHelmetRimmat_0.geometry}
        material={materials.darthvader_VaderHelmetRimmat}
      />
      {/* @ts-ignore JSX Intrinsic Element 오류는 추후 해결 */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DARTH_darthvader_VaderBodyArmourmat_0.geometry}
        material={materials.darthvader_VaderBodyArmourmat}
      />
      {/* @ts-ignore JSX Intrinsic Element 오류는 추후 해결 */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DARTH_Laser_0.geometry}
        material={materials.Laser}
      />
      {/* @ts-ignore JSX Intrinsic Element 오류는 추후 해결 */}
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.DARTH_Sabel_svart_0.geometry}
        material={materials.Sabel_svart}
      />
    </group>
  );
}

useGLTF.preload("/darth-transformed.glb"); 