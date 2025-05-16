import React from 'react'; // React import

interface OverlayProps {
  isPostProcessingEnabled: boolean;
  setIsPostProcessingEnabled: (enabled: boolean) => void;
  currentScene: string; // "vader" | "royal"과 같은 유니온 타입으로 더 구체화 가능
  setCurrentScene: (scene: string) => void;
  quality: string; // "default" | "high"과 같은 유니온 타입으로 더 구체화 가능
  setQuality: (quality: string) => void;
  showEditor: boolean;
  setShowEditor: (show: boolean) => void;
}

export const Overlay: React.FC<OverlayProps> = ({
  isPostProcessingEnabled,
  setIsPostProcessingEnabled,
  currentScene,
  setCurrentScene,
  quality,
  setQuality,
  showEditor,
  setShowEditor,
}) => {
  return (
    <div className="overlay">
      <header>
        <h1>
          R3F <span>WebGPU</span>
        </h1>
        <p>
          This is a demo of React Three Fiber using post processing with threejs
          and WebGPU, featuring Screen Space Reflections.
        </p>
      </header>
      <footer>
        <p className="footer-text">
          Created by <a href="https://andersonmancini.dev">Anderson Mancini</a>
        </p>
        <div className="footer-buttons">
          <button
            onClick={() => setIsPostProcessingEnabled(!isPostProcessingEnabled)}
          >
            {isPostProcessingEnabled ? "Disable" : "Enable"} Post Processing
          </button>
          <button
            className="toggle"
            onClick={() =>
              setCurrentScene(currentScene === "vader" ? "royal" : "vader")
            }
          >
            Toggle Scene
          </button>
          <button
            onClick={() =>
              setQuality(quality === "default" ? "high" : "default")
            }
            className="toggle-quality"
          >
            {quality === "default" ? "Higher Quality" : "Performance Mode"}
          </button>
          <button
            onClick={() => setShowEditor(!showEditor)}
            className="editor-toggle"
          >
            {showEditor ? "Hide Editor" : "Show Editor"}
          </button>
        </div>
        <a
          href="https://github.com/ektogamat/r3f-webgpu-starter"
          // download prop은 boolean 또는 string을 받을 수 있습니다. 여기서는 boolean으로 가정합니다.
          download 
          className="download-button"
        >
          <SvgIcon />
        </a>
      </footer>
    </div>
  );
}

// SvgIcon Props 타입 정의 (SVG 속성을 포함할 수 있도록 확장 가능)
interface SvgIconProps {
  // 현재는 사용되는 props가 없지만, 필요시 추가
  // 예: fill?: string; width?: number | string; height?: number | string;
}

const SvgIcon: React.FC<SvgIconProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="white" // fill은 props로 받을 수 있도록 수정 가능
    {...props} // 전달된 다른 SVG 관련 props를 받을 수 있도록 함
  >
    <path
      d="m20.59 12-3.3-3.3a1 1 0 1 1 1.42-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.42-1.4zM3.4 12l3.3 3.3a1 1 0 0 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4A1 1 0 0 1 6.7 8.7zm7.56 8.24a1 1 0 0 1-1.94-.48l4-16a1 1 0 1 1 1.94.48z"
      className="heroicon-ui"
    ></path>
  </svg>
); 