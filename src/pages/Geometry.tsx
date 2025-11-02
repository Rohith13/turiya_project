import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, MeshDistortMaterial } from "@react-three/drei";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import * as THREE from "three";

const platonicSolids = [
  { name: "Tetrahedron", geometry: new THREE.TetrahedronGeometry(2) },
  { name: "Cube", geometry: new THREE.BoxGeometry(2, 2, 2) },
  { name: "Octahedron", geometry: new THREE.OctahedronGeometry(2) },
  { name: "Dodecahedron", geometry: new THREE.DodecahedronGeometry(2) },
  { name: "Icosahedron", geometry: new THREE.IcosahedronGeometry(2) },
];

const Geometry = () => {
  const [selectedSolid, setSelectedSolid] = useState(0);
  const [distortion, setDistortion] = useState(0.3);
  const [speed, setSpeed] = useState(1);
  const [color, setColor] = useState("#f59e0b");

  const handleGenerate = () => {
    const randomSolid = Math.floor(Math.random() * platonicSolids.length);
    const randomColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    const randomDistortion = Math.random() * 0.5 + 0.2;
    const randomSpeed = Math.random() * 2 + 0.5;
    
    setSelectedSolid(randomSolid);
    setColor(randomColor);
    setDistortion(randomDistortion);
    setSpeed(randomSpeed);
  };

  return (
    <PageLayout gradient="energy" tagline="Explore the patterns of creation.">
      <div className="w-full h-[600px] flex flex-col lg:flex-row gap-8 items-center">
        {/* 3D Canvas */}
        <div className="w-full lg:w-2/3 h-96 lg:h-full rounded-2xl overflow-hidden bg-card/30 backdrop-blur shadow-2xl">
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            <mesh rotation={[0, 0, 0]}>
              <primitive object={platonicSolids[selectedSolid].geometry} />
              <MeshDistortMaterial
                color={color}
                attach="material"
                distort={distortion}
                speed={speed}
                roughness={0.2}
                metalness={0.8}
              />
            </mesh>
            
            <OrbitControls 
              enableZoom={true} 
              autoRotate 
              autoRotateSpeed={0.5}
            />
          </Canvas>
        </div>

        {/* Controls */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div>
            <h2 className="text-2xl font-light mb-4">Sacred Forms</h2>
            <div className="space-y-2">
              {platonicSolids.map((solid, index) => (
                <Button
                  key={solid.name}
                  onClick={() => setSelectedSolid(index)}
                  variant={selectedSolid === index ? "default" : "outline"}
                  className="w-full justify-start"
                >
                  {solid.name}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Distortion: {distortion.toFixed(2)}
              </label>
              <Slider
                value={[distortion]}
                onValueChange={([v]) => setDistortion(v)}
                min={0}
                max={1}
                step={0.01}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Animation Speed: {speed.toFixed(1)}x
              </label>
              <Slider
                value={[speed]}
                onValueChange={([v]) => setSpeed(v)}
                min={0.1}
                max={3}
                step={0.1}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Color
              </label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full h-12 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <Button onClick={handleGenerate} className="w-full" size="lg">
            Generate Random
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default Geometry;
