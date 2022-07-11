import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { NextPage } from "next";
import React, { useEffect, useMemo, useRef, useState } from "react";
import glsl from "glslify";

// import fragmentShader from "../shaders/basic/frag.glsl";
// import vertexShader from "../shaders/basic/vert.glsl";

const Example: NextPage = () => {
  return (
    <main className="px-6 py-6 min-h-screen flex items-center justify-center max-w-4xl mx-auto">
      <div className="w-full aspect-square bg-[#373642]">
        <Canvas>
          <Shader />
        </Canvas>
      </div>
    </main>
  );
};

export default Example;

const vertexShader = glsl`
  varying vec2 vUv;

  void main(){
    vUv=uv;
    gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);
  }
`;

const fragmentShader = glsl`
  uniform float uTime;
  varying vec2 vUv;

  void main(){
    gl_FragColor=vec4(vUv,1.,1.);
  }
`;

const Shader: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  const material = useRef<THREE.ShaderMaterial>(null!);
  const { viewport, size } = useThree();

  const shaderData = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader,
    }),
    [vertexShader, fragmentShader]
  );

  // useFrame(({ clock }) => {
  //   material.current.uniforms.uTime.value = clock.getElapsedTime();
  // });

  return (
    <mesh ref={mesh}>
      <planeGeometry
        attach="geometry"
        args={[viewport.width, viewport.height]}
      />
      <shaderMaterial ref={material} attach="material" {...shaderData} />
      {/* <meshStandardMaterial color="blue" /> */}

      <ambientLight />
    </mesh>
  );
};
