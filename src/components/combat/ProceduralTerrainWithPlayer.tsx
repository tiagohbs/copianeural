import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import SimplexNoise from "../../utils/simplex-noise";

// Instâncias de ruído para diferentes camadas (Red Blob Games technique)
const noiseElevation = new SimplexNoise(12345);
const noiseMoisture = new SimplexNoise(54321);
const noiseDetail = new SimplexNoise(67890);

// Função de altura seguindo Red Blob Games - múltiplas octaves
function getHeight(x: number, y: number): number {
  // Octaves de ruído (frequências diferentes)
  const octave1 = noiseElevation.noise2D(x * 0.01, y * 0.01) * 1.0;    // Grandes montanhas
  const octave2 = noiseElevation.noise2D(x * 0.02, y * 0.02) * 0.5;    // Colinas médias
  const octave3 = noiseElevation.noise2D(x * 0.04, y * 0.04) * 0.25;   // Detalhes pequenos
  
  // Soma das octaves (Red Blob Games technique)
  let elevation = octave1 + octave2 + octave3;
  
  // Normalização (divide pela soma das amplitudes)
  elevation = elevation / (1.0 + 0.5 + 0.25);
  
  // Redistribuição para criar vales planos (Red Blob Games technique)
  elevation = Math.pow(elevation, 2.5);
  
  // Escala para altura final
  return elevation * 8 - 2; // Range: -2 a 6
}

// Função de umidade (moisture) para biomas
function getMoisture(x: number, y: number): number {
  // Usa frequência diferente para evitar correlação com elevação
  const moisture = noiseMoisture.noise2D(x * 0.015, y * 0.015);
  return (moisture + 1) / 2; // Normaliza para 0-1
}

// Função procedural para gerar elementos
function pseudoRandom(x: number, z: number, seed = 42) {
  return Math.abs(Math.sin(x * 12.9898 + z * 78.233 + seed) * 43758.5453) % 1;
}

// Sistema de biomas baseado em Red Blob Games
function getBiome(elevation: number, moisture: number, gameMode: string = 'hunt'): string {
  switch (gameMode) {
    case 'hunt':
      // Modo Caça: Grama e Floresta
      if (elevation < -1.0) return 'water';
      if (elevation < 0.0) return 'grass';
      if (elevation < 1.0 && moisture > 0.6) return 'forest';
      if (elevation < 1.0) return 'grass';
      if (elevation < 2.5) return 'hills';
      return 'mountain';
      
    case 'explore':
      // Modo Exploração: Desértico
      if (elevation < -1.0) return 'oasis';
      if (elevation < 0.0) return 'sand';
      if (elevation < 1.0) return 'dunes';
      if (elevation < 2.5) return 'rocky';
      return 'mountain';
      
    case 'dungeon':
      // Modo Masmorra: Terreno escuro
      if (elevation < -1.0) return 'void';
      if (elevation < 0.0) return 'dark_ground';
      if (elevation < 1.0) return 'dark_forest';
      if (elevation < 2.5) return 'dark_hills';
      return 'dark_mountain';
      
    default:
      // Padrão: Grama e Floresta
      if (elevation < -1.0) return 'water';
      if (elevation < 0.0) return 'grass';
      if (elevation < 1.0 && moisture > 0.6) return 'forest';
      if (elevation < 1.0) return 'grass';
      if (elevation < 2.5) return 'hills';
      return 'mountain';
  }
}

// Cores dos biomas por modo de jogo
function getTerrainColor(elevation: number, moisture: number, gameMode: string = 'hunt'): string {
  const biome = getBiome(elevation, moisture, gameMode);
  
  switch (gameMode) {
    case 'hunt':
      // Modo Caça: Grama e Floresta
      switch (biome) {
        case 'water': return '#3ec6ff';
        case 'grass': return '#7ec850';
        case 'forest': return '#228B22';
        case 'hills': return '#bdb76b';
        case 'mountain': return '#cccccc';
        default: return '#7ec850';
      }
      
    case 'explore':
      // Modo Exploração: Desértico
      switch (biome) {
        case 'oasis': return '#3ec6ff';
        case 'sand': return '#f4d03f';
        case 'dunes': return '#f39c12';
        case 'rocky': return '#95a5a6';
        case 'mountain': return '#7f8c8d';
        default: return '#f4d03f';
      }
      
    case 'dungeon':
      // Modo Masmorra: Terreno escuro
      switch (biome) {
        case 'void': return '#2c3e50';
        case 'dark_ground': return '#34495e';
        case 'dark_forest': return '#1a252f';
        case 'dark_hills': return '#2c3e50';
        case 'dark_mountain': return '#1a252f';
        default: return '#34495e';
      }
      
    default:
      // Padrão: Grama e Floresta
      switch (biome) {
        case 'water': return '#3ec6ff';
        case 'grass': return '#7ec850';
        case 'forest': return '#228B22';
        case 'hills': return '#bdb76b';
        case 'mountain': return '#cccccc';
        default: return '#7ec850';
      }
  }
}

// Componente do terreno com elementos que se movem
const Terrain: React.FC<{ 
  offset: { x: number; y: number }; 
  viewRadius: number; 
  spawnRadius: number; 
  gameMode: string;
}> = ({ offset, viewRadius, spawnRadius, gameMode }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const size = 64;
  const planeSize = 32;

  // Cria a geometria do terreno
  const geometry = React.useMemo(() => {
    return new THREE.PlaneGeometry(planeSize, planeSize, size, size);
  }, []);

  // Atualiza a geometria do terreno para seguir o offset e colore por bioma
  useFrame(() => {
    if (mesh.current) {
      const geometry = mesh.current.geometry as THREE.PlaneGeometry;
      const colors = [];
      for (let i = 0; i < geometry.attributes.position.count; i++) {
        const x = geometry.attributes.position.getX(i) + offset.x;
        const y = geometry.attributes.position.getY(i) + offset.y;
        const h = getHeight(x, y);
        const m = getMoisture(x, y);
        geometry.attributes.position.setZ(i, h);
        // Coloração por bioma baseada no modo de jogo
        const color = new THREE.Color(getTerrainColor(h, m, gameMode));
        colors.push(color.r, color.g, color.b);
      }
      if (!geometry.attributes.color || geometry.attributes.color.count !== geometry.attributes.position.count) {
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      } else {
        geometry.attributes.color.array.set(colors);
        geometry.attributes.color.needsUpdate = true;
      }
      geometry.computeVertexNormals();
      geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Terreno base colorido por bioma */}
      <mesh ref={mesh} geometry={geometry} rotation-x={-Math.PI / 2} receiveShadow position={[0, 0, 0]}>
        <meshStandardMaterial vertexColors />
      </mesh>
    </group>
  );
};

const Player: React.FC = () => {
  // O player está sempre no centro, então calcula a altura do terreno em (0,0)
  const y = getHeight(0, 0) + 0.5;
  return (
    <mesh position={[0, y, 0]} castShadow>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color="#00bfff" />
    </mesh>
  );
};

// Componente principal que renderiza o Canvas
const ProceduralTerrainWithPlayer: React.FC<{ gameMode?: string }> = ({ gameMode = 'hunt' }) => {
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(true);
  const [inBattle, setInBattle] = useState(false);
  const [fps, setFps] = useState(0);
  const speed = 0.1; // Velocidade aumentada de 0.008 para 0.1

  // Parâmetros do sistema de elementos
  const planeSize = 32;
  const viewRadius = planeSize / 1.5; // Raio de visualização
  const spawnRadius = viewRadius + 8; // Raio de spawn (fora da visualização)

  // Calcula a velocidade de deslocamento
  const velocityPerFrame = speed; // unidades por frame
  const velocityPerSecond = speed * 60; // unidades por segundo (assumindo 60 FPS)
  const velocityPerMinute = velocityPerSecond * 60; // unidades por minuto

  // Nome do modo para exibir
  const getModeName = (mode: string) => {
    switch (mode) {
      case 'hunt': return 'Caça';
      case 'explore': return 'Exploração';
      case 'dungeon': return 'Masmorra';
      default: return 'Caça';
    }
  };

  // Controla o offset dentro do Canvas
  const OffsetController = () => {
    const frameCountRef = useRef(0);
    const lastTimeRef = useRef(performance.now());
    
    useFrame(() => {
      frameCountRef.current++;
      const currentTime = performance.now();
      
      // Calcula FPS a cada segundo
      if (currentTime - lastTimeRef.current >= 1000) {
        const calculatedFps = Math.round(frameCountRef.current * 1000 / (currentTime - lastTimeRef.current));
        setFps(calculatedFps);
        frameCountRef.current = 0;
        lastTimeRef.current = currentTime;
      }
      
      if (isMoving) {
        setOffset((prev) => ({ x: prev.x, y: prev.y + speed }));
      }
    });
    return null;
  };

  // Detecta proximidade com inimigo e pausa movimento
  useEffect(() => {
    if (inBattle) return;
    
    // Verifica se há inimigos próximos (posição relativa ao offset)
    const enemyNearby = Math.random() < 0.01; // 1% de chance por frame
    
    if (enemyNearby) {
      setIsMoving(false);
      setInBattle(true);
      
      setTimeout(() => {
        setInBattle(false);
        setIsMoving(true);
      }, 2000);
    }
  }, [inBattle]);

  return (
    <div style={{ width: "100%", height: 500, borderRadius: 12, overflow: "hidden", background: '#222' }}>
      <Canvas 
        camera={{ position: [0, 20, 20], fov: 45 }} 
        shadows
        gl={{ antialias: true }}
        style={{ background: '#222' }}
      >
        <color attach="background" args={["#222"]} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 10, 7]} intensity={2} castShadow />
        <OffsetController />
        <Terrain offset={offset} viewRadius={viewRadius} spawnRadius={spawnRadius} gameMode={gameMode} />
        <Player />
        
        {/* Contador de FPS e velocidade */}
        <Html position={[4, 4, 0]} style={{ 
          background: 'rgba(0,0,0,0.8)', 
          color: 'white', 
          padding: '8px 12px', 
          borderRadius: 5,
          fontSize: '12px',
          fontFamily: 'monospace',
          pointerEvents: 'none',
          minWidth: '180px',
          whiteSpace: 'nowrap'
        }}>
          <div>FPS: {fps}</div>
          <div>Vel/frame: {velocityPerFrame.toFixed(4)}</div>
          <div>Vel/seg: {velocityPerSecond.toFixed(3)}</div>
          <div>View: {viewRadius.toFixed(1)}u</div>
          <div>Spawn: {spawnRadius.toFixed(1)}u</div>
          <div>Modo: {getModeName(gameMode)}</div>
        </Html>
        
        {inBattle && (
          <Html center style={{ pointerEvents: 'none', color: 'white', fontSize: 32 }}>
            Batalha!
          </Html>
        )}
      </Canvas>
    </div>
  );
};

export default ProceduralTerrainWithPlayer;
