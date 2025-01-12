"use client";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Mesh, Texture } from "three";
import gsap from "gsap";
import usePageStore from "@/store/pageStore";
import { usePathname } from "next/navigation";
import useCursorStore from "@/store/cursorStore";
import * as THREE from "three";

const loader = new THREE.TextureLoader();

const SphereModal = () => {
    const pathname = usePathname();
    const { isMenuDisplay, currentClick, handleIsMenuDisplay } = usePageStore();
    const isHover = useCursorStore().handleIsHover;
    const dodecahedronMeshRef = useRef<Mesh>(null!);
    const sphereMeshRef = useRef<Mesh>(null!);
    const [colorMap, setColorMap] = useState<Texture>(null!);
    useEffect(() => {
        if (colorMap != null) return;
        loader.load("texture.jpg", (texture) => setColorMap(texture));
    }, [colorMap]);

    const transformSphere = () => {
        if (dodecahedronMeshRef.current == null) return;
        if (sphereMeshRef.current == null) return;
        return gsap.context(() => {
            gsap.timeline({
                defaults: {
                    ease: "none",
                },
            })
                .to(
                    dodecahedronMeshRef.current.material,
                    {
                        duration: 0.3,
                        opacity: 0,
                        visible: false,
                    },
                    0
                )
                .to(
                    dodecahedronMeshRef.current.scale,
                    {
                        duration: 0.7,
                        x: 0,
                        y: 0,
                        z: 0,
                    },
                    0
                )
                .to(
                    sphereMeshRef.current.material,
                    {
                        duration: 0.3,
                        opacity: 0.8,
                        visible: true,
                    },
                    0
                )
                .to(
                    sphereMeshRef.current.scale,
                    {
                        duration: 0.6,
                        x: 2,
                        y: 2,
                        z: 2,
                    },
                    0.3
                )
                .to(
                    sphereMeshRef.current.scale,
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

    const revertSphere = () => {
        if (dodecahedronMeshRef.current == null) return;
        if (sphereMeshRef.current == null) return;
        return gsap.context(() => {
            gsap.timeline({
                defaults: {
                    ease: "none",
                },
            })
                .to(
                    sphereMeshRef.current.material,
                    {
                        duration: 0.3,
                        opacity: 0,
                        visible: false,
                    },
                    0
                )
                .to(
                    sphereMeshRef.current.scale,
                    {
                        duration: 0.7,
                        x: 0,
                        y: 0,
                        z: 0,
                    },
                    0
                )
                .to(
                    dodecahedronMeshRef.current.material,
                    {
                        duration: 0.4,
                        opacity: 1,
                        visible: true,
                    },
                    0.3
                )
                .to(
                    dodecahedronMeshRef.current.scale,
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

    const scaleSphere = () => {
        if (dodecahedronMeshRef.current == null) return;
        if (sphereMeshRef.current == null) return;
        return gsap.context(() => {
            gsap.timeline({
                defaults: {
                    ease: "none",
                },
            })
                .to(
                    dodecahedronMeshRef.current.scale,
                    {
                        duration: 0,
                        x: 0,
                        y: 0,
                        z: 0,
                    },
                    0
                )
                .to(
                    sphereMeshRef.current.material,
                    {
                        duration: 0.4,
                        opacity: 0.05,
                        visible: true,
                    },
                    0
                )
                .to(
                    sphereMeshRef.current.scale,
                    {
                        duration: 0.6,
                        x: 5.5,
                        y: 5.5,
                        z: 5.5,
                    },
                    0
                )
                .to(
                    sphereMeshRef.current.scale,
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

    const revertScaleSphere = () => {
        if (dodecahedronMeshRef.current == null) return;
        if (sphereMeshRef.current == null) return;
        return gsap.context(() => {
            gsap.timeline({
                defaults: {
                    ease: "none",
                },
            })
                .to(
                    dodecahedronMeshRef.current.scale,
                    {
                        duration: 0,
                        x: 0,
                        y: 0,
                        z: 0,
                    },
                    0
                )
                .to(
                    sphereMeshRef.current.scale,
                    {
                        duration: 0.6,
                        x: 1.5,
                        y: 1.5,
                        z: 1.5,
                    },
                    0
                )
                .to(
                    sphereMeshRef.current.scale,
                    {
                        duration: 0.3,
                        x: 1.8,
                        y: 1.8,
                        z: 1.8,
                    },
                    ">"
                )
                .to(
                    sphereMeshRef.current.material,
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
        if (currentClick === "/") {
            if (isMenuDisplay) {
                transformSphere();
            } else {
                revertSphere();
            }
            return;
        }
        if (isMenuDisplay) {
            revertScaleSphere();
        } else {
            scaleSphere();
        }
    }, [isMenuDisplay, currentClick, pathname]);

    useFrame(() => {
        dodecahedronMeshRef.current.rotation.y += 0.004;
        sphereMeshRef.current.rotation.y += 0.001;
    }, 0);

    const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
        gsap.to(dodecahedronMeshRef.current.rotation, {
            duration: 5,
            x: dodecahedronMeshRef.current.rotation.x + event.point.x,
            y: dodecahedronMeshRef.current.rotation.y + event.point.y,
            z: dodecahedronMeshRef.current.rotation.z + event.point.z,
        });
    };
    const handlePointerOver = () => isHover(true);
    const handlePointerOut = () => isHover(false);
    const onClick = () => {
        handleIsMenuDisplay(true);
        window.gtag("event", "click", {
            category: "模型",
            label: "清單",
        });
    };

    return (
        <group>
            <mesh
                scale={1.5}
                ref={dodecahedronMeshRef}
                onPointerMove={handlePointerMove}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={onClick}
            >
                <dodecahedronGeometry />
                {colorMap != null && (
                    <meshPhysicalMaterial
                        map={colorMap}
                        metalness={0.5}
                        roughness={0.7}
                        reflectivity={2}
                        transparent={true}
                        opacity={1}
                    />
                )}
            </mesh>
            <mesh ref={sphereMeshRef} scale={0}>
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

export default SphereModal;
