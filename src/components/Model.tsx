import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader, ThreeEvent } from "@react-three/fiber";
import { Mesh } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useAppSelector } from "../hooks";
import gsap from "gsap";
import Loading from "./Loading"

const Geometry = () => {
    const menuReducers = useAppSelector((state) => state.menuReducers);
    const geometryRef = useRef<Mesh>(null!);
    const geometryOpacityRef = useRef<Mesh>(null!);
    const colorMap = useLoader(
        TextureLoader,
        process.env.PUBLIC_URL + "/assets/texture.jpg"
    );
    const [isRotateSpeed, setIsRotateSpeed] = useState<Boolean>(true);

    const homeEnterAnim = () => {
        return gsap.context(() => {
            gsap.timeline({
                defaults: {
                    ease: "none",
                },
            })
                .to(
                    geometryRef.current.material,
                    {
                        duration: 0.3,
                        opacity: 0,
                        visible: false,
                    },
                    0
                )
                .to(
                    geometryRef.current.scale,
                    {
                        duration: 0.7,
                        x: 0,
                        y: 0,
                        z: 0,
                    },
                    0
                )
                .to(
                    geometryOpacityRef.current.material,
                    {
                        duration: 0.3,
                        opacity: 0.8,
                        visible: true,
                    },
                    0
                )
                .to(
                    geometryOpacityRef.current.scale,
                    {
                        duration: 0.6,
                        x: 2,
                        y: 2,
                        z: 2,
                    },
                    0.3
                )
                .to(
                    geometryOpacityRef.current.scale,
                    {
                        duration: 0.4,
                        x: 1.8,
                        y: 1.8,
                        z: 1.8,
                    },
                    ">"
                );
        });
    };
    const homeOutAnim = () => {
        return gsap.context(() => {
            gsap.timeline({
                defaults: {
                    ease: "none",
                },
            })
                .to(
                    geometryOpacityRef.current.material,
                    {
                        duration: 0.3,
                        opacity: 0,
                        visible: false,
                    },
                    0
                )
                .to(
                    geometryOpacityRef.current.scale,
                    {
                        duration: 0.7,
                        x: 0,
                        y: 0,
                        z: 0,
                    },
                    0
                )
                .to(
                    geometryRef.current.material,
                    {
                        duration: 0.4,
                        opacity: 1,
                        visible: true,
                    },
                    0.3
                )
                .to(
                    geometryRef.current.scale,
                    {
                        duration: 0.4,
                        x: 1.5,
                        y: 1.5,
                        z: 1.5,
                    },
                    ">"
                );
        });
    };
    const enterAnim = () => {
        return gsap.context(() => {
            gsap.timeline({
                defaults: {
                    ease: "none",
                },
            })
                .to(
                    geometryRef.current.scale,
                    {
                        duration: 0,
                        x: 0,
                        y: 0,
                        z: 0,
                    },
                    0
                )
                .to(
                    geometryOpacityRef.current.material,
                    {
                        duration: 0.4,
                        opacity: 0.05,
                        visible: true,
                    },
                    0
                )
                .to(
                    geometryOpacityRef.current.scale,
                    {
                        duration: 0.6,
                        x: 5.5,
                        y: 5.5,
                        z: 5.5,
                    },
                    0
                )
                .to(
                    geometryOpacityRef.current.scale,
                    {
                        duration: 0.3,
                        x: 5,
                        y: 5,
                        z: 5,
                    },
                    ">"
                );
        });
    };
    const outAnim = () => {
        return gsap.context(() => {
            gsap.timeline({
                defaults: {
                    ease: "none",
                },
            })
                .to(
                    geometryRef.current.scale,
                    {
                        duration: 0,
                        x: 0,
                        y: 0,
                        z: 0,
                    },
                    0
                )
                .to(
                    geometryOpacityRef.current.scale,
                    {
                        duration: 0.6,
                        x: 1.5,
                        y: 1.5,
                        z: 1.5,
                    },
                    0
                )
                .to(
                    geometryOpacityRef.current.scale,
                    {
                        duration: 0.3,
                        x: 1.8,
                        y: 1.8,
                        z: 1.8,
                    },
                    ">"
                )
                .to(
                    geometryOpacityRef.current.material,
                    {
                        duration: 0.4,
                        opacity: 0.8,
                        visible: true,
                    },
                    0
                );
        });
    };

    useEffect(() => {
        if (menuReducers.state === "home") {
            menuReducers.isClick ? homeEnterAnim() : homeOutAnim();
            return;
        }
        menuReducers.isClick ? outAnim() : enterAnim();
        setIsRotateSpeed(menuReducers.isClick);
    }, [menuReducers.isClick]);

    useEffect(() => {
        if (menuReducers.state === "home") return;
        enterAnim();
        setIsRotateSpeed(false);
    }, [menuReducers.state]);

    useFrame(() => {
        geometryRef.current.rotation.y += 0.004;
        geometryOpacityRef.current.rotation.y += isRotateSpeed ? 0.004 : 0.001;
    }, 0);

    const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
        //ref.current.lookAt(event.point);
        gsap.to(geometryRef.current.rotation, {
            duration: 5,
            x: geometryRef.current.rotation.x + event.point.x,
            y: geometryRef.current.rotation.y + event.point.y,
            z: geometryRef.current.rotation.z + event.point.z,
        });
    };
    useEffect(() => {
      console.log("B")
    }, [])
    
    return (
        <group>
            <mesh
                ref={geometryRef}
                scale={1.5}
                onPointerMove={handlePointerMove}
            >
                <dodecahedronGeometry />
                <meshPhysicalMaterial
                    map={colorMap}
                    metalness={0.5}
                    roughness={0.7}
                    reflectivity={2}
                    transparent={true}
                    opacity={1}
                />
            </mesh>
            <mesh ref={geometryOpacityRef} scale={0}>
                <dodecahedronGeometry args={[undefined, 5]} />
                <meshPhysicalMaterial
                    map={colorMap}
                    transparent={true}
                    opacity={0.2}
                    wireframe
                />
            </mesh>
        </group>
    );
};

const Model: React.FC = () => {
    return (
        <Suspense fallback={<Loading />}>
            <Canvas
                style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
            >
                <ambientLight intensity={0.2} />
                <spotLight
                    position={[10, 10, 10]}
                    angle={1}
                    penumbra={0.5}
                    intensity={2}
                />
                <pointLight position={[-10, -10, -10]} />
                <Geometry />
            </Canvas>
        </Suspense>
    );
};

export default Model;
