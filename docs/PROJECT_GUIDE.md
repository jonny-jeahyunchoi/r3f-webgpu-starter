# 프로젝트 가이드: R3F WebGPU + Vite + TypeScript 스타터

## 1. 프로젝트 개요 및 목표

이 문서는 React Three Fiber (R3F), Vite, TypeScript를 기반으로 구축된 WebGPU 및 TSL (Three.js Shading Language) 실험용 스타터 프로젝트에 대한 상세 가이드입니다.

**주요 목표:**

*   최신 웹 3D 렌더링 기술인 WebGPU의 통합 가능성 탐색 (현재 부분적 시도 및 타입 정의 문제 해결 중).
*   Three.js의 노드 기반 머티리얼 시스템(TSL)을 TypeScript 환경에서 활용하는 방법 연구.
*   Vite를 사용한 빠르고 효율적인 프론트엔드 개발 환경 구축.
*   React 19 및 최신 R3F/Drei 라이브러리를 활용한 선언적 3D 프로그래밍 패턴 정립.
*   TypeScript를 통한 코드 안정성 및 유지보수성 향상.
*   향후 복잡한 3D 애플리케이션 개발을 위한 견고한 기반 마련.

이 프로젝트는 학습 및 실험을 주목적으로 하며, 특히 최신 기술의 경계에서 발생하는 타입 정의 문제와 그 해결 과정을 기록하는 데 중점을 둡니다.

## 2. 아키텍처

이 프로젝트는 다음과 같은 주요 기술 요소와 구조로 구성됩니다.

### 2.1. 빌드 시스템: Vite
- **특징:** ESM (ES Modules) 기반의 매우 빠른 개발 서버 시작 및 HMR (Hot Module Replacement) 속도, 프로덕션 빌드 최적화 (Rollup 사용).
- **설정 파일:** `vite.config.ts`
  - `@vitejs/plugin-react` 플러그인을 사용하여 React 프로젝트 지원 (JSX, Fast Refresh 등).
  - 필요한 경우, 추가적인 Vite 플러그인 (예: Tailwind CSS 플러그인) 및 빌드 옵션 설정 가능.

### 2.2. UI 라이브러리: React 19
- **특징:** 최신 React 버전으로, JSX Transform 자동 적용, 향후 추가될 수 있는 Concurrent Features 등의 기반.
- **개발 방식:** 주로 함수형 컴포넌트와 Hooks (useState, useEffect, useRef 등)를 사용합니다.

### 2.3. 3D 렌더링
- **React Three Fiber (R3F):** Three.js를 React의 선언적 컴포넌트 스타일로 사용할 수 있게 해주는 렌더러입니다.
  - Three.js 객체들을 JSX 태그로 표현 (예: `<mesh>`, `<boxGeometry>`, `<meshStandardMaterial>`).
  - `useThree`, `useFrame` 등 다양한 훅을 제공하여 씬, 카메라, 렌더링 루프 등에 쉽게 접근 가능.
- **Drei:** R3F를 위한 유용한 헬퍼 컴포넌트, 훅, 추상화 모음입니다.
  - 예: `<OrbitControls>`, `<Environment>`, `<Loader>`, `<useGLTF>` 등.
- **Three.js (버전 ^0.175.0 기준):** 핵심 3D 엔진으로, R3F를 통해 간접적으로 제어되거나, 필요시 직접 Three.js 객체 및 API를 사용할 수 있습니다.
  - WebGPU 렌더러 및 TSL(Node Material)과 같은 고급 기능 사용을 시도하고 있습니다.

### 2.4. 타입 시스템: TypeScript
- **특징:** JavaScript에 정적 타입을 추가하여 코드의 안정성, 가독성, 유지보수성을 향상시킵니다.
- **활용:**
  - 컴포넌트 Props 및 State 타입 정의.
  - 함수 시그니처 (파라미터, 반환 값) 타입 명시.
  - 복잡한 객체 및 데이터 구조에 대한 `interface` 또는 `type` 정의.
  - 전역 타입 확장: `src/three.d.ts` 파일을 통해 R3F의 JSX 요소 타입을 전역 `JSX.IntrinsicElements`에 추가합니다.

### 2.5. 스타일링: Tailwind CSS
- **특징:** 유틸리티 우선 CSS 프레임워크로, HTML 마크업 내에서 직접 스타일을 빠르게 적용할 수 있습니다.
- **설정:** `tailwind.config.js` 및 `postcss.config.js` 파일 (생성 예정)을 통해 설정.
- **적용:** `src/styles.css` (또는 유사한 전역 CSS 파일)에 Tailwind 지시어를 import 하고, 컴포넌트의 `className`을 통해 유틸리티 클래스 적용.

## 3. 주요 디렉토리 및 파일 구조 (재강조)

프로젝트의 주요 파일 및 디렉토리 구조는 다음과 같습니다. Vite 기반 프로젝트의 표준적인 구조를 따르며, TypeScript 소스 파일과 정적 에셋을 관리합니다.

- **`index.html`**: (프로젝트 루트)
  - Vite 애플리케이션의 메인 진입점 HTML 파일입니다.
  - React 애플리케이션이 마운트될 `<div id="root"></div>` 요소를 포함합니다.
  - `<script type="module" src="/src/index.tsx"></script>`를 통해 메인 TypeScript 진입 파일을 로드합니다.

- **`vite.config.ts`**: (프로젝트 루트)
  - Vite의 설정 파일입니다.
  - `@vitejs/plugin-react`와 같은 플러그인을 설정하고, 빌드 옵션, 개발 서버 옵션 등을 정의합니다.

- **`tsconfig.json`**: (프로젝트 루트)
  - TypeScript 컴파일러 옵션을 정의합니다.
  - `compilerOptions` (예: `target`, `module`, `jsx`, `strict`, `moduleResolution`, `baseUrl`, `paths`)와 `include` 경로 등을 설정합니다.
  - 특히 `paths` 옵션은 `three/examples/jsm/*`과 같은 특정 경로의 모듈 해석을 위해 사용됩니다.

- **`public/`**: 
  - 정적 에셋을 위치시키는 디렉토리입니다. 이 디렉토리의 파일들은 빌드 시 프로젝트 루트에 그대로 복사됩니다.
  - `favicon.ico`, 이미지, 폰트 등의 파일을 저장합니다.

- **`src/`**: 
  - 애플리케이션의 주요 소스 코드가 위치하는 디렉토리입니다.
  - **`index.tsx`** (또는 `main.tsx`):
    - React 애플리케이션의 실제 진입점입니다.
    - `ReactDOM.createRoot()`를 사용하여 React 컴포넌트(`App.tsx`)를 `index.html`의 root DOM 요소에 렌더링합니다.
    - 전역 스타일 (`styles.css`)을 import 합니다.
  - **`App.tsx`**:
    - 메인 애플리케이션 컴포넌트로, 전체 3D 씬의 레이아웃과 주요 로직을 구성합니다.
    - R3F의 `<Canvas>` 컴포넌트를 사용하여 3D 렌더링 환경을 설정합니다.
  - **`components/`**:
    - 재사용 가능한 React 및 React Three Fiber 컴포넌트들이 위치합니다.
    - 예: 3D 모델 로딩 컴포넌트, UI 요소, 포스트 프로세싱 효과 컴포넌트 등.
    - 현재 `ManciniCanvas.tsx`, `WebGPUPostProcessing.tsx`, `JetEngineMaterial.ts` 등 WebGPU/TSL 관련 핵심 로직이 포함된 파일들이 이곳에 있습니다.
  - **`styles.css`**:
    - 전역 CSS 스타일 및 Tailwind CSS의 `@tailwind` 지시어를 import 하는 파일입니다.
  - **`three.d.ts`**:
    - Three.js 및 React Three Fiber 관련 전역 타입 확장을 위한 파일입니다.
    - 주로 `import '@react-three/fiber';`를 포함하여 R3F가 사용하는 JSX 요소들(예: `<mesh>`, `<group>`)이 TypeScript에서 올바르게 인식되도록 합니다.
    - 커스텀 머티리얼이나 노드 재질을 위한 추가적인 JSX 타입 확장이 필요할 수 있습니다.

- **`tailwind.config.js`** (생성 예정):
  - Tailwind CSS의 설정을 커스터마이징하는 파일입니다 (테마, 플러그인 등).

- **`postcss.config.js`** (생성 예정):
  - PostCSS 설정을 위한 파일로, Tailwind CSS를 PostCSS 플러그인으로 사용하기 위해 필요합니다.

## 4. 타입 문제 해결 가이드 (상세 기록)

이 프로젝트를 TypeScript로 전환하고 최신 라이브러리 버전으로 업데이트하는 과정에서 몇 가지 주요 타입 관련 문제에 직면했으며, 그 해결 과정은 다음과 같습니다. 이 기록은 유사한 문제를 해결하는 데 도움이 될 수 있습니다.

### 4.1. `@types` 패키지 미설치 및 의존성 충돌 문제
- **증상:** `node_modules/@types` 디렉토리가 생성되지 않거나, 특정 타입 정의를 찾을 수 없다는 오류 발생.
- **원인:**
    - `npm install` 과정에서 peer dependency 충돌 (`ERESOLVE`)로 인해 `@types/*` 패키지들이 제대로 설치되지 않음 (특히 `react-scripts`와 `typescript` 버전 간의 충돌).
    - 손상된 `npm` 캐시 또는 `package-lock.json`.
- **해결 과정:**
    1.  `npm cache clean --force` 명령으로 npm 캐시를 강제 정리.
    2.  기존 `package-lock.json` 파일 삭제.
    3.  기존 `node_modules` 디렉토리 완전 삭제 (`Remove-Item -Recurse -Force node_modules` 또는 `rm -rf node_modules`).
    4.  `npm install --legacy-peer-deps` 명령을 사용하여 peer dependency 충돌을 우회하고 모든 의존성 (devDependencies 포함)을 새로 설치.
    - *결과: 이 과정을 통해 `@types/three`, `@types/react` 등 필요한 타입 정의 패키지들이 정상적으로 설치됨.*

### 4.2. Three.js JSM (JavaScript Modules) Addons Import 문제
- **증상:** `three/examples/jsm/...` 경로의 모듈 (예: `PostProcessing`, `OrbitControls`, TSL 디스플레이 함수 등)에 대해 "Cannot find module" 또는 "Could not find a declaration file" 오류 발생.
- **원인:**
    - TypeScript가 JSM 모듈의 타입 정의 파일(`.d.ts`)을 찾는 데 어려움을 겪음.
    - `@types/three`와 `three` 라이브러리 버전 불일치.
    - `tsconfig.json`의 `paths` 또는 `baseUrl` 설정 미흡.
    - JSM 모듈 자체의 export 방식과 `@types/three`의 타입 정의 방식 간의 불일치 가능성.
- **시도했던 해결책 및 현재 상태:**
    1.  **`three` 및 `@types/three` 버전 일치:** `package.json`에서 두 패키지의 버전을 동일하게 맞춤 (현재 `^0.175.0`).
    2.  **`tsconfig.json`의 `paths` 설정:**
        - 초기 시도: `"three/examples/jsm/*": ["./node_modules/three/examples/jsm/*"]` (실제 `three` 패키지 내부 JSM 경로 참조 시도 - `three` 패키지 내에 `.d.ts`가 완전하지 않을 수 있음).
        - **현재 설정:** `"three/examples/jsm/*": ["./node_modules/@types/three/examples/jsm/*"]`. 이 설정은 `@types/three` 패키지 내의 JSM 타입 정의를 사용하도록 하며, `Addons.d.ts`와 같은 집합적인 타입 정의 파일을 통해 일부 모듈(예: `EffectComposer`, 각종 Pass 클래스)을 성공적으로 가져오고 있습니다.
        - *주의: 모든 JSM 모듈이 `@types/three`에 의해 완벽하게 타입이 정의되거나 `Addons.d.ts`를 통해 export 되는 것은 아닐 수 있습니다. 특정 로우레벨 TSL 디스플레이 함수 (예: `bloom`, `ssr`, `smaa`)나 `WebGPURenderer`의 경우, 이 `paths` 설정만으로는 부족하여 여전히 경로 문제가 발생하거나, `three-stdlib`와 같은 대안을 고려해야 할 수 있습니다.*
    3.  **`three-stdlib` 패키지 도입 시도:**
        - JSM 모듈들을 더 안정적으로 사용하기 위해 `npm install three-stdlib` 시도.
        - `EffectComposer` 및 일부 Pass들은 `three-stdlib`에서 성공적으로 import 되었으나, `OutputPass`나 `WebGPURenderer`, 로우레벨 TSL 함수 등은 `three-stdlib`의 최상위 export에 포함되지 않아 문제가 완전히 해결되지는 않았습니다.
        - 현재는 `three-stdlib`를 일부 Pass import에 사용하고 있으며, 다른 JSM 모듈은 `paths` 설정을 통해 `@types/three`를 참조하고 있습니다.
    4.  **Import 경로에서 `.js` 확장자 제거:** TypeScript의 `moduleResolution: "bundler"` (또는 `nodenext`) 설정과 함께, 타입 정의 파일(`.d.ts`)을 참조하기 위해 import 경로에서 `.js` 확장자를 제거하는 것이 일반적입니다.

### 4.3. TSL (Three.js Shading Language) 함수 및 노드 타입 Import 문제
- **증상:** TSL 관련 함수(예: `uniform`, `float`, `pass`, `mrt`) 및 노드 클래스/타입(예: `UniformNode`, `FloatNode`, `Vec2Node`)에 대해 "no exported member" 또는 "Cannot find module" 오류 발생.
- **원인:** `three@0.175.0` 및 `@types/three@0.175.0` 버전에서 TSL 기능들이 어떤 경로와 방식으로 export 되는지 파악하는 데 어려움이 있었음.
- **시도했던 해결책 및 현재 상태:**
    1.  **다양한 import 경로 시도:**
        - `three` 코어에서 직접 import (예: `import { uniform, FloatNode } from 'three';`).
        - `three/nodes` 가상 경로 시도.
        - `three/tsl` 경로 시도.
        - `import * as THREE from 'three'; THREE.TSL.uniform` 과 같이 네임스페이스를 통한 접근 시도.
        - `import { TSL } from 'three'; TSL.uniform` 과 같이 명명된 `TSL` 객체 import 시도.
    2.  **타입 정의 파일 분석:** `@types/three/index.d.ts` 및 `@types/three/src/Three.TSL.d.ts`, `@types/three/src/nodes/core/UniformNode.d.ts` 등의 내용을 분석하여 export 구조 추론.
    3.  **현재 상태 (잠정적 결론):**
        - **TSL 함수 (`uniform`, `float`, `pass`, `mrt` 등):** `import { ... } from 'three/tsl';` 경로를 통해 가져오는 것이 현재로서는 가장 안정적으로 작동하는 것으로 보입니다 (사용자님이 직접 경로 수정하여 일부 해결). 이 경로에 대한 타입 정의가 `@types/three` 내에 존재해야 합니다.
        - **TSL 노드 타입/클래스 (`UniformNode`, `FloatNode` 등):** 이 타입들은 `three/tsl`에서 함수와 함께 export 되지 않고, `three` 코어 모듈(`import { UniformNode, FloatNode } from 'three';`)에서 직접 export 되어야 하지만, 이 방식이 계속해서 "no exported member" 오류를 발생시켰습니다. 이는 `@types/three`의 메인 모듈 export 구성에 문제가 있거나, TypeScript Language Server의 해석 문제일 가능성이 있습니다.
        - **`JetEngineMaterial.ts`:** 이 TSL 관련 문제로 인해 현재 해당 파일의 핵심 로직은 주석 처리되어 기능이 **임시 비활성화**된 상태입니다.
        - **`WebGPUPostProcessing.tsx`:** 원본 JS의 로우레벨 TSL 사용 로직을 복원하려 했으나, 위와 같은 TSL 함수 및 타입 import 문제, 그리고 TSL 디스플레이 함수(`bloom`, `ssr`, `smaa`)의 JSM 경로 문제로 인해 현재는 `EffectComposer`와 `three-stdlib`에서 가져온 Pass(예: `BloomPass`)를 사용하는 단순화된 형태로 유지 중이거나, 원본 복원 시도 시 타입 오류가 발생하고 있습니다.

### 4.4. React Three Fiber (R3F) JSX 요소 타입 문제
- **증상:** `<group>`, `<mesh>`, `<meshStandardMaterial>`, `<directionalLight>`, 그리고 특히 커스텀 노드 재질인 `<meshStandardNodeMaterial>` 등에 대해 `Property '...' does not exist on type 'JSX.IntrinsicElements'.` 오류 발생.
- **원인:** TypeScript가 R3F에서 사용하는 Three.js 객체 기반의 JSX 요소들을 기본 HTML 요소로 인식하여 발생.
- **해결 과정:**
    1.  **전역 타입 정의 파일 생성:** `src/three.d.ts` 파일을 생성.
    2.  **R3F JSX 네임스페이스 확장:** `src/three.d.ts` 파일에 `import '@react-three/fiber';` 한 줄을 추가. 이 import는 `@react-three/fiber` 패키지에 포함된 타입 정의를 통해 전역 `JSX.IntrinsicElements` 네임스페이스를 확장하여 R3F 요소들을 TypeScript에 알려줍니다.
    3.  **Props 타입 정의:** GLTF 모델 컴포넌트 등에서 `<group>` 요소의 Props를 정의할 때, `@react-three/fiber`에서 `GroupProps`를 직접 import 하려다 "no exported member" 오류 발생. 대신 `ThreeElements['group']` 유틸리티 타입을 사용하여 해결 (예: `type MyGroupProps = ThreeElements['group'] & { myCustomProp?: string };`).
    4.  **커스텀 노드 재질 (`<meshStandardNodeMaterial>` 등):**
        - 이러한 요소들은 `src/three.d.ts`의 기본 확장만으로는 부족할 수 있습니다.
        - `Royal.tsx`에서 로컬하게 `declare module '@react-three/fiber'`를 사용하여 `ThreeElements`를 확장하고, `extend` 함수로 해당 노드 재질 클래스(`MeshStandardNodeMaterial` 등, `three/webgpu`에서 import 시도)를 R3F에 등록하는 방식을 시도했습니다.
        - `extend` 함수 자체를 찾지 못하는 오류는 `import { extend } from '@react-three/fiber';`로 해결했습니다.
        - *현재 상태: `<meshStandardNodeMaterial>` 등의 오류는 여전히 발생 가능성이 있으며, 이는 `three/webgpu` 경로의 안정성 및 `src/three.d.ts`의 전역 적용 여부, TS 서버 상태에 따라 달라질 수 있습니다.*
    5.  **`Cannot find namespace 'JSX'.` 오류:**
        - `tsconfig.json`에 `"jsx": "react-jsx"`가 설정되어 있고, `@types/react`가 설치되어 있음에도 발생.
        - `vite.config.ts`에 `@vitejs/plugin-react` 설정 확인.
        - `tsconfig.json`에 `"jsxImportSource": "react"` 추가 시도.
        - *이 문제는 주로 TS 서버가 프로젝트 설정을 완전히 인지하지 못했을 때 발생하며, 편집기/TS 서버 재시작, 또는 `src/three.d.ts`의 `@react-three/fiber` import가 결정적인 역할을 합니다.*

### 4.5. Vite 관련 문제
- **HTTP ERROR 404 (페이지 찾을 수 없음):**
    - 원인: Vite 개발 서버 실행 시 프로젝트 루트에 `index.html` 파일이 없음.
    - 해결: 프로젝트 루트에 기본적인 `index.html` 파일 (React 앱 마운트 및 `src/index.tsx` 로드 스크립트 포함) 생성.
- **`[plugin:vite:import-analysis] Failed to parse source ... invalid JS syntax`:**
    - 원인: JSX 구문을 포함하는 파일의 확장자가 `.js`로 되어 있어 Vite가 JavaScript로 처리하려다 발생.
    - 해결: 해당 파일의 확장자를 `.tsx`로 변경 (또는 변환 후 남은 원본 `.js` 파일 삭제).

## 5. WebGPU 및 고급 기능 사용 가이드 (진행 중)

이 프로젝트는 Three.js의 WebGPU 렌더러와 TSL(Node Material) 시스템과 같은 고급 기능을 TypeScript 환경에서 사용하는 것을 목표로 하고 있으나, 현재 몇 가지 타입 정의 및 경로 문제로 인해 완전하게 작동하지 않거나 기능이 임시 비활성화된 부분이 있습니다.

### 5.1. WebGPU 렌더러 설정 (`ManciniCanvas.tsx`)
- **목표:** R3F의 `<Canvas>` 컴포넌트에서 WebGL 렌더러 대신 WebGPU 렌더러를 사용하도록 설정합니다.
- **시도된 방법:**
    1.  `<Canvas webgpu />` prop 사용: 최신 R3F 버전에서 WebGPU를 활성화하는 간편한 방법으로 예상했으나, 해당 prop이 유효하지 않거나 타입 정의에 문제가 있어 실패했습니다.
    2.  `<Canvas>`의 `gl` prop을 통해 수동으로 `WebGPURenderer` 인스턴스 생성 및 전달:
        - `WebGPURenderer` 클래스를 `three` 코어, `three/webgpu`, `three/examples/jsm/renderers/webgpu/WebGPURenderer`, `three-stdlib` 등 다양한 경로에서 import 시도했으나, 타입 정의를 찾지 못하거나 "no exported member" 오류가 발생하는 등 경로 문제가 지속되었습니다.
        - `gl` 콜백의 시그니처 타입 (`DefaultGLProps` 등)과 `WebGPURenderer` 생성자에 전달하는 `canvas` 객체의 타입 일치 문제도 있었습니다.
- **현재 상태 (`ManciniCanvas.tsx`):**
    - `import * as THREE from "three/webgpu";` 및 `new THREE.WebGPURenderer({...})` 형태로 코드가 수정되어 사용자님께서 직접 경로를 지정하셨습니다. 이 `three/webgpu` 경로가 `@types/three`에서 올바르게 타입이 정의되어 있고, 실제 Three.js 라이브러리에서 해당 경로로 WebGPU 관련 모듈을 제공한다면 작동할 수 있습니다.
    - `renderer.init()` 호출을 통해 WebGPU 초기화를 시도하고, 실패 시 WebGL로 폴백하는 로직의 기초가 포함되어 있습니다 (폴백 로직은 더 구체화 필요).
- **향후 진행 방향:** `three/webgpu` 경로의 안정성 및 타입 정의를 최종 확인하고, WebGPU 초기화 및 폴백 로직을 견고하게 만들어야 합니다. `ResizeHandler.tsx`에 전달되는 `rendererRef`의 타입도 WebGPU와 WebGL을 모두 고려할 수 있도록 수정이 필요할 수 있습니다.

### 5.2. 로우레벨 TSL을 사용한 포스트 프로세싱 (`WebGPUPostProcessing.tsx`)
- **목표:** 원본 JavaScript 프로젝트의 로직을 따라, TSL 함수(`pass`, `mrt`, `bloom`, `ssr`, `smaa` 등)와 `THREE.PostProcessing` 클래스를 직접 사용하여 커스텀 포스트 프로세싱 파이프라인을 구축합니다.
- **주요 문제점:**
    - TSL 함수 및 노드 타입/클래스의 정확한 import 경로 및 타입 정의 문제 (4.3절 참조).
    - `PostProcessing` 클래스의 정확한 import 경로 문제 (JSM 또는 `three-stdlib`).
    - TSL 디스플레이 함수(`bloom`, `ssr`, `smaa`)의 정확한 import 경로 문제 (JSM 또는 `three-stdlib`).
- **시도된 방법:**
    - `EffectComposer`와 `three-stdlib`에서 제공하는 표준 Pass(예: `BloomPass`)를 사용하는 방식으로 단순화 시도 (로우레벨 TSL 사용 임시 포기).
    - 원본 JavaScript 로직 복원을 위해 다양한 TSL 및 JSM import 경로 시도.
- **현재 상태 (`WebGPUPostProcessing.tsx`):**
    - 사용자님이 원본 JS 코드 기반으로 복원하셨으며, TSL 함수들은 `three/tsl`에서, TSL 디스플레이 함수들과 `PostProcessing` 클래스는 `three/examples/jsm/...` 경로에서 가져오도록 되어 있습니다.
    - 하지만 `three/tsl`에서 `TextureNode`, `FloatNode` 등의 타입 export 문제, JSM 경로에 대한 "Cannot find module" 문제가 지속적으로 발생하여 타입 안정성이 확보되지 않았습니다.
    - 많은 타입 오류를 임시로 회피하기 위해 `any` 타입을 사용하거나 로직 일부를 주석 처리했을 수 있습니다.
- **향후 진행 방향:** TSL 함수 및 노드 타입의 import 경로를 명확히 하고, JSM 애드온들의 경로 문제를 `tsconfig.json`의 `paths` 설정과 `@types/three`의 실제 구조를 통해 해결해야 합니다. 모든 타입이 올바르게 적용된 후 로직의 정확성을 검증해야 합니다.

### 5.3. 커스텀 TSL 머티리얼 (`JetEngineMaterial.ts`)
- **목표:** TSL을 사용하여 동적인 제트 엔진 분사 효과를 내는 커스텀 머티리얼 로직을 구현합니다.
- **주요 문제점:** `WebGPUPostProcessing.tsx`와 유사하게 TSL 함수 및 노드 타입/클래스의 정확한 import 경로와 타입 정의 문제입니다.
- **현재 상태:** TSL import 문제 해결의 어려움으로 인해 해당 파일의 핵심 로직은 현재 **주석 처리되어 기능이 임시 비활성화**된 상태입니다. (`Royal.tsx`에서 이 훅을 사용하고 있으므로, 현재는 기본값 또는 `null`을 반환하여 오류를 방지하고 있을 것입니다.)
- **향후 진행 방향:** TSL 관련 타입 문제가 해결되면, 이 파일의 주석을 해제하고 TSL 코드가 올바르게 작동하도록 타입을 적용하고 검증해야 합니다.

## 6. 코딩 스타일 및 컨벤션 (재강조)

프로젝트의 일관성과 가독성을 유지하기 위해 다음 코딩 스타일 및 컨벤션을 따릅니다. 이 내용은 `.cursorrules` 파일에도 요약되어 있습니다.

- **파일 명명:**
  - React 컴포넌트: `PascalCase.tsx` (예: `MyComponent.tsx`)
  - 일반 TypeScript 파일/모듈 (유틸리티, 클래스 등): `camelCase.ts` 또는 `PascalCase.ts` (예: `utils.ts`, `GraphicsManager.ts`)
- **타입 정의:**
  - 모든 컴포넌트 Props, State, 주요 함수 반환 값, 변수에 대해 명시적인 타입 사용을 강력히 권장합니다 (`interface` 또는 `type` 사용).
  - `any` 타입 사용은 불가피한 경우 (예: 외부 라이브러리 타입 미비, 매우 동적인 데이터 구조)에 한하며, 사용 시 주석으로 사유를 명시합니다.
  - 복잡한 객체나 API 응답에 대해서는 별도의 `interface` 또는 `type`을 정의하여 구조를 명확히 합니다.
- **Import 문:**
  - 모듈 import는 파일 상단에 그룹화하여 정렬합니다 (예: React 관련, 외부 라이브러리, 내부 모듈 순).
  - `tsconfig.json`의 `baseUrl` (".") 및 `paths` 설정을 활용하여 절대 경로 (`src/...`) 또는 상대 경로를 일관되게 사용합니다.
  - **JSM/TSL Import:** Three.js의 JSM 애드온 모듈 및 TSL 기능 import 시, 타입 정의 경로가 불안정하므로 각별한 주의가 필요합니다. 현재 `@types/three`의 `examples/jsm/` 경로, `three/tsl`, `three/webgpu`, `three-stdlib` 등 다양한 경로를 시도하고 있으며, 각 모듈의 최신 권장 import 방식을 따르는 것이 중요합니다. (상세 내용은 "4. 타입 문제 해결 가이드" 참조)
- **R3F JSX 요소:**
  - `<group>`, `<mesh>`, `<meshStandardMaterial>` 등 R3F에서 사용하는 Three.js 객체 기반 JSX 요소들은 `src/three.d.ts` 파일의 `import '@react-three/fiber';`를 통해 전역 JSX 네임스페이스가 확장되어야 TypeScript에서 올바르게 인식됩니다.
  - 커스텀 노드 재질 (예: `<meshStandardNodeMaterial>`) 사용 시, R3F의 `extend` 함수로 해당 클래스를 R3F에 등록하고, 필요시 `src/three.d.ts`에서 `ThreeElements` 인터페이스를 확장하여 타입을 명시해야 할 수 있습니다.
- **주석:**
  - 복잡한 로직, 특정 결정의 배경, `any` 타입 사용 사유 등 코드만으로 이해하기 어려운 부분에 주석을 작성합니다.
  - 명확하고 간결한 주석을 선호합니다.
- **ESLint & Prettier:**
  - 프로젝트 루트에 설정된 ESLint (`eslint.config.js` 또는 `.eslintrc.js` - 현재 `package.json`에 `@eslint/js` 등으로 설정됨) 및 Prettier 규칙을 준수합니다.
  - 코드 커밋 전에 린터 및 포맷터를 실행하여 코드 스타일을 일관되게 유지합니다.

## 7. 빌드 및 배포

- **개발 서버 실행:** `npm run dev` (Vite 개발 서버)
- **프로덕션 빌드:** `npm run build`
  - 이 스크립트는 `tsc -b && vite build`를 실행합니다.
  - 먼저 TypeScript 컴파일러 (`tsc -b`)가 타입 검사 및 빌드(JavaScript로 변환하지 않고 타입 선언 파일 생성 등)를 수행하고, 그 후 Vite (`vite build`)가 실제 프로덕션용 에셋(최적화된 JS, CSS, 이미지 등)을 `dist/` 폴더에 생성합니다.
- **빌드 결과물 미리보기:** `npm run preview` (Vite가 `dist/` 폴더 내용을 기준으로 로컬 서버 실행)
- **배포:** 생성된 `dist/` 폴더의 내용을 정적 호스팅 서비스 (예: Vercel, Netlify, GitHub Pages 등)에 배포할 수 있습니다.

## 8. 향후 개선 및 기여 방향 (재강조)

이 프로젝트는 지속적인 개선을 목표로 합니다. 주요 향후 작업 및 기여 가능한 부분은 다음과 같습니다:

- **타입 안정화:**
  - WebGPU 렌더러 및 관련 API의 타입 정의 안정화.
  - TSL 함수 및 노드 타입/클래스의 정확한 import 경로 확립 및 타입 문제 해결.
  - `JetEngineMaterial.ts` 및 `WebGPUPostProcessing.tsx`의 완전한 기능 복원 및 타입 안정화.
  - 모든 R3F JSX 요소 (특히 커스텀 노드 재질)가 `@ts-ignore` 없이 올바르게 타입 추론되도록 개선.
- **기능 확장:**
  - WebGPU 특화 렌더링 기능 (예: Compute Shaders) 예제 추가.
  - TSL을 활용한 다양한 커스텀 머티리얼 및 포스트 프로세싱 효과 구현.
  - 프로젝트에 맞는 UI/UX 개선 (Tailwind CSS 적극 활용).
- **개발 환경 개선:**
  - ESLint 및 Prettier 규칙 세분화 및 자동화 강화.
  - 필요한 경우 테스트 코드 작성 (React Testing Library, Vitest 등).
  - 문서 지속적 업데이트 및 보강.

프로젝트에 대한 아이디어나 개선점, 버그 리포트, 코드 기여 등 모든 형태의 참여를 환영합니다. (GitHub 저장소 링크 추가 예정)

---
*문서 종료* 