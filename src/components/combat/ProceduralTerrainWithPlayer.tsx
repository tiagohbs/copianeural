import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Função simples para gerar altura (pode ser substituída por Perlin/Simplex)
function getHeight(x: number, y: number) {
  return Math.sin(x * 0.3) * Math.cos(y * 0.3) * 2;
}

const Terrain: React.FC<{ offset: { x: number; y: number } }> = ({ offset }) => {
  const mesh = useRef<THREE.Mesh>(null);
  // Aumenta o tamanho do plano e a resolução
  const size = 128;
  const planeSize = 64;
  const [localOffset, setLocalOffset] = useState(offset);

  useFrame(() => {
    setLocalOffset(offset); // Mantém sincronizado com o offset global
    if (mesh.current) {
      const geometry = mesh.current.geometry as THREE.PlaneGeometry;
      for (let i = 0; i < geometry.attributes.position.count; i++) {
        const x = geometry.attributes.position.getX(i) + offset.x;
        const y = geometry.attributes.position.getY(i) + offset.y;
        geometry.attributes.position.setZ(i, getHeight(x, y));
      }
      geometry.computeVertexNormals();
      geometry.attributes.position.needsUpdate = true;
    }
  });

  // Cria a geometria apenas uma vez
  const geometry = React.useMemo(() => {
    return new THREE.PlaneGeometry(planeSize, planeSize, size, size);
  }, []);

  return (
    <mesh ref={mesh} geometry={geometry} rotation-x={-Math.PI / 2} receiveShadow position={[0, 0, 0]}>
      <meshStandardMaterial color="#2ecc40" />
    </mesh>
  );
};

const Player: React.FC<{ offset?: { x: number; y: number } }> = ({ offset }) => {
  // Garante valores padrão seguros
  const x = offset?.x ?? 0;
  const y = offset?.y ?? 0;
  const altura = getHeight(x, y) + 0.5;
  return (
    <mesh position={[0, altura, 0]} castShadow>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color="#00bfff" />
    </mesh>
  );
};

// Componente principal que renderiza o Canvas
const ProceduralTerrainWithPlayer: React.FC = () => {
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const speed = 0.05;

  // Controla o offset dentro do Canvas
  const OffsetController = () => {
    useFrame(() => {
      setOffset((prev) => ({ x: prev.x + speed, y: prev.y }));
    });
    return null;
  };

  return (
    <div style={{ width: "100%", height: 500, borderRadius: 12, overflow: "hidden", background: '#222' }}>
      <Canvas 
        camera={{ position: [0, 12, 12], fov: 50 }} 
        shadows
        gl={{ antialias: true }}
        style={{ background: '#222' }}
      >
        <color attach="background" args={["#222"]} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 7]} intensity={2} castShadow />
        <OffsetController />
        <Terrain offset={offset} />
        <Player offset={offset} />
      </Canvas>
    </div>
  );
};

export default ProceduralTerrainWithPlayer;
