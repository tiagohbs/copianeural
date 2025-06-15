import React, { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import noise, { setNoiseSeed, setNoiseDetail } from "../../utils/perlin";

// Parâmetros de terreno por modo
const TERRAIN_PRESETS: Record<string, {
  seed: number;
  scale: number;
  octaves: number;
  persistence: number;
  lacunarity: number;
  biomas: (h: number, m: number) => string;
  heightMult?: number;
}> = {
  hunt: {
    seed: 12345,
    scale: 0.045, // escala menor = mais suave
    octaves: 4,
    persistence: 0.7, // mais persistência = menos contraste
    lacunarity: 2.0,
    heightMult: 1.5, // altura máxima reduzida
    biomas: (h, m) => {
      if (h < -1.5) return '#3ec6ff'; // água
      if (h < -0.5) return '#e3d7a3'; // areia
      if (h < 1.5 && m > 0.6) return '#228B22'; // floresta
      if (h < 1.5) return '#7ec850'; // grama
      if (h < 3) return '#bdb76b'; // colina
      return '#cccccc'; // montanha
    }
  },
  dungeon: {
    seed: 54321,
    scale: 0.12,
    octaves: 4,
    persistence: 0.6,
    lacunarity: 2.5,
    biomas: (h, m) => {
      if (h < -1.2) return '#22223b'; // abismo
      if (h < 0.5) return '#444466'; // pedra
      if (h < 2) return '#6c757d'; // rocha
      return '#bdbdbd'; // caverna clara
    }
  },
  explore: {
    seed: 67890,
    scale: 0.06,
    octaves: 6,
    persistence: 0.45,
    lacunarity: 2.1,
    biomas: (h, m) => {
      if (h < -1.2) return '#b3e6ff'; // lago
      if (h < 0.2) return '#e3e3a3'; // campo aberto
      if (h < 1.5 && m > 0.5) return '#4caf50'; // floresta densa
      if (h < 2.5) return '#c2b280'; // colina seca
      return '#f5f5f5'; // pico
    }
  },
  tournament: {
    seed: 24680,
    scale: 0.09,
    octaves: 3,
    persistence: 0.7,
    lacunarity: 1.8,
    biomas: (h, m) => {
      if (h < -0.8) return '#d4af37'; // arena dourada
      if (h < 1.2) return '#e5c07b'; // areia
      return '#c678dd'; // platô roxo
    }
  }
};

// Inicializa o Perlin Noise com base no modo de jogo
function initNoise(gameMode: string) {
  const { seed, octaves, persistence } = TERRAIN_PRESETS[gameMode] || TERRAIN_PRESETS['hunt'];
  setNoiseSeed(seed);
  setNoiseDetail(octaves, persistence);
}

// Função de altura com múltiplos octaves (como no vídeo)
function getHeight(x: number, y: number, params = useTerrainParams('hunt')): number {
  let amplitude = 1;
  let frequency = 1;
  let noiseHeight = 0;
  for (let i = 0; i < params.octaves; i++) {
    const sampleX = x * params.scale * frequency;
    const sampleY = y * params.scale * frequency;
    const perlinValue = noise(sampleX, sampleY) * 2 - 1;
    noiseHeight += perlinValue * amplitude;
    amplitude *= params.persistence;
    frequency *= params.lacunarity;
  }
  return noiseHeight * (params.heightMult ?? 3);
}

// Função de umidade com base na posição e no modo de jogo
function getMoisture(x: number, y: number, gameMode: string): number {
  const { scale } = TERRAIN_PRESETS[gameMode] || TERRAIN_PRESETS['hunt'];
  return noise(x * scale + 100, y * scale - 100);
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
        const h = getHeight(x, y, gameMode);
        const m = getMoisture(x, y, gameMode);
        geometry.attributes.position.setZ(i, h);
        // Coloração por bioma baseada no modo de jogo
        const color = new THREE.Color(TERRAIN_PRESETS[gameMode]?.biomas(h, m) || '#ffffff');
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
  const y = getHeight(0, 0, 'hunt') + 0.5;
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

  // Inicializa o noise e parâmetros do terreno ao mudar o modo de jogo
  useEffect(() => {
    initNoise(gameMode);
    setOffset({ x: 0, y: 0 }); // Reseta o offset ao mudar de modo
  }, [gameMode]);

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
