# React Three Fiber + Vite + TypeScript - WebGPU Starter (Work in Progress)

<h4>Original concept by Anderson Mancini, migrated to TypeScript/Vite by AI Assistant</h4>

[![screenshot](https://r3f-webgpu-post-processing.vercel.app/social.jpg)](https://r3f-webgpu-post-processing.vercel.app/)

This project is a TypeScript-based starter for React Three Fiber, utilizing Vite as the build tool. It aims to demonstrate the integration of Three.js (including WebGPU rendering attempts and TSL for node materials) with the R3F ecosystem.

This project is currently a **work in progress**, with ongoing efforts to resolve type definitions for advanced Three.js features like TSL and WebGPU rendering within a TypeScript environment.

### Key Technologies

*   **React:** ^19.0.0
*   **Three.js:** ^0.175.0
*   **React Three Fiber:** ^9.1.0
*   **Drei:** ^10.0.5
*   **Vite:** ^6.2.0
*   **TypeScript:** ~5.7.2
*   **Tailwind CSS:** ^4.0.17 (Configured, but not yet extensively used in components)
*   **ESLint & Prettier:** For code quality and formatting

### Getting Started

1.  **Prerequisites:** Download and install Node.js (preferably a recent LTS version).
2.  **Clone/Download:** Get the project files onto your local machine.
3.  **Open in Editor:** Open the project folder in your preferred code editor (e.g., VS Code).
4.  **Install Dependencies:** Open the terminal in your editor and run:
    ```shell
    npm install
    ```
    *Note: Due to potential peer dependency conflicts (especially with `react-scripts` if it was previously used, or certain TypeScript version mismatches), you might need to use a flag like `--legacy-peer-deps` if you encounter `ERESOLVE` errors:*
    ```shell
    npm install --legacy-peer-deps
    ```
5.  **Run Development Server:**
    ```shell
    npm run dev
    ```
    This will start the Vite development server, typically الحكومي على `http://localhost:5175`.

### Available Scripts

*   `npm run dev`: Starts the Vite development server.
*   `npm run build`: Builds the application for production (uses `tsc -b && vite build`).
*   `npm run lint`: Lints the codebase using ESLint.
*   `npm run preview`: Serves the production build locally for preview.

### Current Status & Known Issues

*   **TypeScript Migration:** Most JavaScript components have been converted to TypeScript (`.tsx`, `.ts`). Basic prop and state typing is in place.
*   **Vite Integration:** The project has been migrated from Create React App (implied by previous `react-scripts`) to Vite.
*   **TSL (Three.js Shading Language) & WebGPU Type Issues:**
    *   `JetEngineMaterial.ts`: This custom hook, which heavily relies on TSL, is **temporarily disabled** due to unresolved issues with importing TSL functions and node types/classes. The exact import paths for TSL features in `three@0.175.0` with `@types/three@0.175.0` are still under investigation.
    *   `WebGPUPostProcessing.tsx`: Attempts to use low-level TSL for post-processing (based on the original JavaScript logic) are ongoing. Similar to `JetEngineMaterial.ts`, TSL-related imports are causing type errors. The component logic is preserved but may not function correctly due to these type issues.
    *   `ManciniCanvas.tsx`: Efforts to explicitly use `WebGPURenderer` have faced type definition and import path challenges. The current implementation attempts to use `three/webgpu` for `WebGPURenderer`, which may not be stable or correctly typed.
*   **R3F JSX Element Types:** Some React Three Fiber JSX elements (e.g., `<meshStandardNodeMaterial>`, `<group>`, `<directionalLight>`) might still show "Property does not exist on type JSX.IntrinsicElements" errors. This typically indicates an issue with the global JSX namespace extension via `src/three.d.ts` (`import '@react-three/fiber';`) not being fully recognized by the TypeScript Language Server, despite the file being correctly configured. Restarting the TS server or editor is often a workaround.
*   **Tailwind CSS:** Configured, but UI components have not yet been extensively styled with Tailwind.

### Contribution & Future Work

This project serves as a learning and experimental base. Future work includes:

*   Stabilizing TSL and WebGPU type definitions and import paths.
*   Re-enabling and fixing `JetEngineMaterial.ts` and `WebGPUPostProcessing.tsx`.
*   Ensuring all R3F JSX elements are correctly typed without `@ts-ignore`.
*   Applying Tailwind CSS for a more polished UI.
*   Adding more examples of WebGPU-specific features.

--- 
Original README content for context (if applicable):

> A very simple scene to demonstrate how to integrate Threejs WebGPU with React Three Fiber using Post Processing effects.
> [See the demo here](https://r3f-webgpu-post-processing.vercel.app/)

> ### Can you leave a star please?
> I genuinely appreciate your support! If you're willing to show your appreciation, you can <strong>give me a star on GitHub 🎉 </strong>or consider buying a coffee to support my development at https://www.buymeacoffee.com/andersonmancini. The funds received will be utilized to create more valuable content about Three.js and invest in acquiring new courses. Thank you for your consideration!
