import React, { useState } from 'react';
import { Environment } from "@react-three/drei";

// 환경맵 프리셋 목록
const ENVIRONMENT_PRESETS = [
  "apartment",
  "city",
  "dawn",
  "forest",
  "lobby",
  "night",
  "park",
  "studio",
  "sunset",
  "warehouse"
];

// 환경맵 프리셋 이미지 경로
const ENVIRONMENT_PREVIEW_IMAGES = {
  "apartment": "/images/environment/lebombo_1k.png",
  "city": "/images/environment/potsdamer_platz_1k.png",
  "dawn": "/images/environment/kiara_1_dawn_1k.png",
  "forest": "/images/environment/forest_slope_1k.png",
  "lobby": "/images/environment/st_fagans_interior_1k.png",
  "night": "/images/environment/dikhololo_night_1k.png",
  "park": "/images/environment/rooitou_park_1k.png",
  "studio": "/images/environment/studio_small_03_1k.png",
  "sunset": "/images/environment/venice_sunset_1k.png",
  "warehouse": "/images/environment/empty_warehouse_01_1k.png"
};

export function EditorPanel({ onEnvironmentChange }) {
  const [selectedPreset, setSelectedPreset] = useState("sunset");
  const [environmentIntensity, setEnvironmentIntensity] = useState(0.7);
  const [environmentRotation, setEnvironmentRotation] = useState([0.4, 0, 1.4]);
  const [showEnvironmentPreview, setShowEnvironmentPreview] = useState(false);

  // 환경맵 프리셋 변경 핸들러
  const handlePresetChange = (e) => {
    const newPreset = e.target.value;
    setSelectedPreset(newPreset);
    onEnvironmentChange({
      preset: newPreset,
      intensity: environmentIntensity,
      rotation: environmentRotation
    });
  };

  // 환경맵 강도 변경 핸들러
  const handleIntensityChange = (e) => {
    const newIntensity = parseFloat(e.target.value);
    setEnvironmentIntensity(newIntensity);
    onEnvironmentChange({
      preset: selectedPreset,
      intensity: newIntensity,
      rotation: environmentRotation
    });
  };

  // 환경맵 회전 변경 핸들러
  const handleRotationChange = (axis, value) => {
    const newRotation = [...environmentRotation];
    newRotation[axis] = parseFloat(value);
    setEnvironmentRotation(newRotation);
    onEnvironmentChange({
      preset: selectedPreset,
      intensity: environmentIntensity,
      rotation: newRotation
    });
  };

  return (
    <div className="editor-panel">
      <h3>에디터 패널</h3>
      
      <div className="editor-section">
        <h4>환경맵 설정</h4>
        
        <div className="editor-control">
          <label>프리셋:</label>
          <select value={selectedPreset} onChange={handlePresetChange}>
            {ENVIRONMENT_PRESETS.map(preset => (
              <option key={preset} value={preset}>{preset}</option>
            ))}
          </select>
        </div>
        
        <div className="editor-control">
          <label>강도: {environmentIntensity.toFixed(2)}</label>
          <input 
            type="range" 
            min="0" 
            max="2" 
            step="0.1" 
            value={environmentIntensity} 
            onChange={handleIntensityChange} 
          />
        </div>
        
        <div className="editor-control">
          <label>회전 X: {environmentRotation[0].toFixed(2)}</label>
          <input 
            type="range" 
            min="-Math.PI" 
            max="Math.PI" 
            step="0.1" 
            value={environmentRotation[0]} 
            onChange={(e) => handleRotationChange(0, e.target.value)} 
          />
        </div>
        
        <div className="editor-control">
          <label>회전 Y: {environmentRotation[1].toFixed(2)}</label>
          <input 
            type="range" 
            min="-Math.PI" 
            max="Math.PI" 
            step="0.1" 
            value={environmentRotation[1]} 
            onChange={(e) => handleRotationChange(1, e.target.value)} 
          />
        </div>
        
        <div className="editor-control">
          <label>회전 Z: {environmentRotation[2].toFixed(2)}</label>
          <input 
            type="range" 
            min="-Math.PI" 
            max="Math.PI" 
            step="0.1" 
            value={environmentRotation[2]} 
            onChange={(e) => handleRotationChange(2, e.target.value)} 
          />
        </div>
        
        <div className="editor-control">
          <label>
            <input 
              type="checkbox" 
              checked={showEnvironmentPreview} 
              onChange={() => setShowEnvironmentPreview(!showEnvironmentPreview)} 
            />
            환경맵 미리보기
          </label>
        </div>
      </div>
      
      {showEnvironmentPreview && (
        <div className="environment-preview">
          <img 
            src={ENVIRONMENT_PREVIEW_IMAGES[selectedPreset]} 
            alt={`${selectedPreset} 환경맵 미리보기`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="preview-info">
            <p>현재 선택: {selectedPreset}</p>
            <p>강도: {environmentIntensity.toFixed(2)}</p>
            <p>회전: [{environmentRotation.map(r => r.toFixed(2)).join(', ')}]</p>
          </div>
        </div>
      )}
    </div>
  );
} 