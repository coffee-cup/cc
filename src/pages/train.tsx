import { OrbitControls, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import type { NextPage } from "next";
import React, { Suspense, useMemo, useRef } from "react";
import { MathUtils } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls } from "leva";

import fragmentShader from "../shaders/grid/frag.glsl";
import vertexShader from "../shaders/grid/vert.glsl";

const TrainPage: NextPage = () => {
  // const {} = useControls({g})

  return (
    <main className="h-screen w-screen flex items-center justify-center mx-auto">
      <div className="p-8 w-full h-full bg-[#373642]">
        <Canvas className="rounded" camera={{ position: [-32.3, 17.2, 22.35] }}>
          <Ground />

          <Suspense fallback={null}>
            <Train scale={[1.0, 1.0, 1.0]} position={[0, 1, 0]} />
          </Suspense>

          <OrbitControls />
        </Canvas>
      </div>
    </main>
  );
};

export default TrainPage;

const Train: React.FC<JSX.IntrinsicElements["group"]> = (props) => {
  const { nodes, materials } = useGLTF("/light-train.glb") as any;
  return (
    <group dispose={null} {...props}>
      <group position={[0, 0, 0.1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={materials.Material}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_2.geometry}
          material={materials["Material.001"]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.dot.geometry}
        material={nodes.dot.material}
        position={[-20, 0, 5]}
      />
      <group position={[-4.3, -0.1, 0.1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_1.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002_2.geometry}
          material={materials["Material.004"]}
        />
      </group>
      <group position={[-8.5, -0.1, 0.1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials["Material.004"]}
        />
      </group>
      <group position={[-12.6, -0.1, 0.1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_1.geometry}
          material={materials["Material.003"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004_2.geometry}
          material={materials["Material.004"]}
        />
      </group>
      <group position={[2.9, 0, 0.1]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={materials["Material.005"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube005_1.geometry}
          material={materials["Material.006"]}
        />
      </group>
    </group>
  );
};

const size = [100, 100];
const Ground: React.FC = () => {
  const mesh = useRef<THREE.Mesh>(null!);
  const material = useRef<THREE.ShaderMaterial>(null!);
  const { viewport, size } = useThree();

  const key = MathUtils.generateUUID();

  const shaderData = useMemo(
    () => ({
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0, 0] },
        uResolution: { value: [1000, 1000] },
      },
      vertexShader,
      fragmentShader,
    }),
    [size]
  );

  // useFrame(({ camera }) => console.log(camera.position));

  // useFrame(({ clock, mouse, camera }) => {
  // material.current.uniforms.uTime.value = clock.getElapsedTime();
  // material.current.uniforms.uMouse.value = [mouse.x, mouse.y];
  // material.current.uniforms.uResolution.value = [size.width, size.height];
  // });

  return (
    <mesh ref={mesh} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry attach="geometry" args={[100, 100]} />
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
