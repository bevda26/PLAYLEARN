'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles as DreiSparkles } from '@react-three/drei';

function Tower({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.8, 1, 5, 6]} />
        <meshStandardMaterial color="#5c5c5c" />
      </mesh>
      <mesh position={[0, 3, 0]}>
        <coneGeometry args={[1.2, 1.5, 6]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
    </group>
  );
}

function Castle() {
  return (
    <group position={[0, -2.5, -5]}>
      {/* Simplified Main Keep */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[5, 3, 4]} />
        <meshStandardMaterial color="#7c7c7c" />
      </mesh>
       <mesh position={[0, 3.5, 0]}>
        <cylinderGeometry args={[0, 3, 1.5, 4]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Towers */}
      <Tower position={[-2.5, 2.5, -1.5]} />
      <Tower position={[2.5, 2.5, -1.5]} />
      <Tower position={[-2.5, 2.5, 1.5]} />
      <Tower position={[2.5, 2.5, 1.5]} />
      
      {/* Reduced particle count */}
      <DreiSparkles count={30} scale={12} size={3} speed={0.3} color="#FFC857" />
    </group>
  );
}

export function CastleScene() {
  return (
    <Canvas camera={{ position: [0, 4, 18], fov: 60 }}>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 10, 7.5]} 
        intensity={1.2} 
        color="#a797ff" 
      />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <Castle />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate 
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2.2}
      />
    </Canvas>
  );
}
