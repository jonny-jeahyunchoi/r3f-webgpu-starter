import React from "react";
import { useGLTF } from "@react-three/drei";
import { Material, Mesh, Color } from "three/webgpu";
import { GLTF } from 'three-stdlib';
import { ThreeElements } from '@react-three/fiber';

interface LightMaterial extends Material {
  emissiveIntensity?: number;
  emissive?: Color;
}

interface GLTFResult extends GLTF {
  nodes: {
    ["cam_low_Material_#26_0_1"]: Mesh;
    ["cam_low_Material_#26_0_2"]: Mesh;
    ["ball_low_Material_#26_0"]: Mesh;
    ["d_low_Material_#26_0"]: Mesh;
    ["inner_low_Material_#26_0"]: Mesh;
    ["Object018_Material_#26_0"]: Mesh;
    ["shell_low_Material_#26_0"]: Mesh;
  };
  materials: {
    light: LightMaterial;
    Material_26: Material;
  };
}

type ProbeProps = ThreeElements['group'] & {
  color?: string | number | Color;
};

export const Probe: React.FC<ProbeProps> = (props) => {
  const { nodes, materials } = useGLTF("/probe-transformed.glb") as unknown as GLTFResult;
  
  const lightMaterial = materials.light.clone() as LightMaterial;
  lightMaterial.emissiveIntensity = 10;
  if (props.color) {
    if (!lightMaterial.emissive) lightMaterial.emissive = new Color();
    lightMaterial.emissive.set(props.color);
  }

  return (
    <group {...props} dispose={null}>
      <group position={[-0.423, 0.036, -0.084]} rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["cam_low_Material_#26_0_1"].geometry}
          material={materials.Material_26}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["cam_low_Material_#26_0_2"].geometry}
          material={lightMaterial}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["ball_low_Material_#26_0"].geometry}
        material={materials.Material_26}
        position={[-0.423, 0.036, -0.084]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["d_low_Material_#26_0"].geometry}
        material={materials.Material_26}
        position={[-0.423, 0.036, -0.084]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["inner_low_Material_#26_0"].geometry}
        material={materials.Material_26}
        position={[-0.211, -0.033, 7.813]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Object018_Material_#26_0"].geometry}
        material={lightMaterial}
        position={[-0.423, 0.036, -0.084]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["shell_low_Material_#26_0"].geometry}
        position={[-0.423, 0.036, -0.084]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshPhysicalMaterial
          color="white"
          roughness={0.35}
          metalness={1}
          clearcoat={1}
        />
      </mesh>
    </group>
  );
}

useGLTF.preload("/probe-transformed.glb"); 