'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles } from '@react-three/drei';

function Tower({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[1, 1, 6, 8]} />
        <meshStandardMaterial color="#5c5c5c" />
      </mesh>
      <mesh position={[0, 3.5, 0]}>
        <coneGeometry args={[1.2, 1, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
    </group>
  );
}

function Wall({ position, args }: { position: [number, number, number]; args: [number, number, number] }) {
    return (
        <mesh position={position}>
            <boxGeometry args={args} />
            <meshStandardMaterial color="#6b6b6b" />
        </mesh>
    )
}

function Castle() {
  return (
    <group position={[0, -2, -5]}>
      {/* Main Keep */}
      <mesh position={[0, 2, 0]}>
        <boxGeometry args={[4, 4, 4]} />
        <meshStandardMaterial color="#7c7c7c" />
      </mesh>
       <mesh position={[0, 4, 0]}>
        <cylinderGeometry args={[0, 2.5, 2, 4]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Towers */}
      <Tower position={[-3, 3, -3]} />
      <Tower position={[3, 3, -3]} />
      <Tower position={[-3, 3, 3]} />
      <Tower position={[3, 3, 3]} />

      {/* Walls */}
      <Wall position={[0, 1.5, 4]} args={[8, 3, 0.5]} />
      <Wall position={[0, 1.5, -4]} args={[8, 3, 0.5]} />
      <Wall position={[5, 1.5, 0]} args={[0.5, 3, 8]} />
      <Wall position={[-5, 1.5, 0]} args={[0.5, 3, 8]} />
      
      <Sparkles count={50} scale={10} size={2} speed={0.4} color="#FFC857" />
    </group>
  );
}

export function CastleScene() {
  return (
    <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
      <ambientLight intensity={0.3} />
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
        autoRotateSpeed={0.2}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}