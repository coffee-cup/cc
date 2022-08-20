import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { NextPage } from "next";
import React, { useMemo, useRef } from "react";
import { MathUtils } from "three";

import fragmentShader from "../shaders/grid/frag.glsl";
import vertexShader from "../shaders/grid/vert.glsl";

const Grid: NextPage = () => {
  return (
    <main className="h-screen w-screen flex items-center justify-center mx-auto">
      <div className="p-8 w-full h-full bg-[#373642] cursor-none">
        <Canvas>
          <Shader />
        </Canvas>
      </div>
    </main>
  );
};

export default Grid;

const Shader: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  const material = useRef<THREE.ShaderMaterial>(null!);
  const { viewport } = useThree();

  const key = MathUtils.generateUUID();

  const shaderData = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0, 0] },
      },
      vertexShader,
      fragmentShader,
    }),
    []
  );

  useFrame(({ clock, mouse }) => {
    material.current.uniforms.uTime.value = clock.getElapsedTime();
    material.current.uniforms.uMouse.value = [mouse.x, mouse.y];
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
