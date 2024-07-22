
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage } from '@react-three/drei';
import { OrbitControls } from '@react-three/drei';

function Model(props) {
  const { scene } = useGLTF('/bmw.glb'); // Change the path to match your 3D model file
  return <primitive object={scene} {...props} />;
}

function Car() {
  const controlsRef = useRef();

  return (
    <Canvas dpr={[1, 2]} shadows camera={{ fov: 45, position: [0, 2, 10] }}>
      <color attach="background" args={['#fff']} />
      
      <Stage environment={null}>
        <Model scale={0.01} rotation={[0, Math.PI / 6, 0]} />
      </Stage>

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}  // Disable zoom
        enablePan={false}   // Disable panning
        minPolarAngle={Math.PI / 2.5}  // Restrict vertical movement
        maxPolarAngle={Math.PI / 2}  // Restrict vertical movement
      />
    </Canvas>
  );
}

export default Car;
