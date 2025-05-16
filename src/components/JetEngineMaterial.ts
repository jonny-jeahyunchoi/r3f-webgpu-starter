import { useFrame } from "@react-three/fiber";

// TSL import 문제는 해결될 때까지 주석 처리합니다.
/*
import {
  uniform, float, vec2, sin, cos, uv, mod, div, sub, length, pow, abs, vec3, add, mul
} from 'three/tsl';
import { UniformNode } from 'three/webgpu';
import { FloatNode, Vec2Node, Vec3Node} from 'three/examples/jsm/Addons';
*/

interface JetEngineMaterialResult {
  key: number;
  colorNode: any; // 임시로 any 타입 사용
}

/**
 * JetEngineMaterial is temporarily disabled due to TSL import issues.
 */
export function useJetEngineMaterial(): JetEngineMaterialResult {
  // console.warn("JetEngineMaterial is temporarily disabled due to TSL import issues.");
  
  // 기본 반환 값 (실제 TSL 노드 대신 null 또는 기본값 사용)
  // useFrame(() => {}); // 프레임 업데이트 로직도 비활성화

  return {
    key: Date.now(), // 임의의 키 값
    colorNode: null, // 임시로 null 반환
  };
} 