"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import SphereModal from "./SphereModal";

const Scene = () => {
    return (
        <Suspense fallback={null}>
            <div className="absolute top-0 left-0 -z-0 w-full h-full">
                <Canvas>
                    <ambientLight intensity={2} />

                    <spotLight
                        position={[10, 10, 10]}
                        angle={1}
                        penumbra={0.5}
                        intensity={700}
                    />

                    <pointLight
                        position={[-10, -10, -10]}
                        intensity={500}
                    />

                    <SphereModal />
                </Canvas>
            </div>
        </Suspense>
    );
};

export default Scene;