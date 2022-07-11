import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { NextPage } from "next";
import React, { useEffect, useMemo, useRef, useState } from "react";

import fragmentShader from "../shaders/basic/frag.glsl";
import vertexShader from "../shaders/basic/vert.glsl";

const Example: NextPage = () => {
  return (
    <div>
      <main className="px-6 py-6 min-h-screen flex items-center justify-center max-w-4xl mx-auto">
        {/* <header className="mt-20 mb-20">
          <h1 className="text-xl text-secondary font-mono">example.</h1>
        </header> */}

        <div className="w-full aspect-square bg-[#373642]">
          <Canvas>
            <Shader />
          </Canvas>
        </div>
      </main>
    </div>
  );
};

export default Example;

const Shader: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  const material = useRef<THREE.ShaderMaterial>(null!);
  const { viewport, size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    [vertexShader, fragmentShader]
  );

  useFrame(({ clock }) => {
    material.current.uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry
        attach="geometry"
        args={[viewport.width, viewport.height]}
      />
      <shaderMaterial
        ref={material}
        attach="material"
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
      {/* <meshStandardMaterial color="blue" /> */}

      <ambientLight />
    </mesh>
  );
};
