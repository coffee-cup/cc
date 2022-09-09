import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { NextPage } from "next";
import React, { useMemo, useRef } from "react";
import { MathUtils } from "three";

import fragmentShader from "../shaders/gradient/frag.glsl";
import vertexShader from "../shaders/gradient/vert.glsl";

const Gradient: NextPage = () => {
  return (
    <main className="h-screen w-screen flex items-center justify-center mx-auto bg-[#373642]">
      <div className="p-8 w-full h-full max-w-[1000px] max-h-[1000px]">
        <Canvas className="rounded">
          <Shader />
        </Canvas>
      </div>
    </main>
  );
};

export default Gradient;

const Shader: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  const material = useRef<THREE.ShaderMaterial>(null!);
  const { viewport, size } = useThree();

  const key = MathUtils.generateUUID();

  const shaderData = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [1000, 1000] },
        // uResolution: { value: [size.width, size.height] },
      },
      vertexShader,
      fragmentShader,
    }),
    [size]
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
        key={key}
        ref={material}
        attach="material"
        {...shaderData}
      />
      {/* <meshStandardMaterial color="blue" /> */}

      <ambientLight />
    </mesh>
  );
};
