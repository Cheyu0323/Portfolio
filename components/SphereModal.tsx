"use client";

import { type ThreeEvent, useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import * as THREE from "three";

import usePageStore from "@/store/pageStore";
import useCursorStore from "@/store/cursorStore";
import { trackMenuOpen } from "@/lib/analytics";

type FacePlane = {
    normal: THREE.Vector3;
    constant: number;
};

type SphereMode = "home" | "menu" | "background";

const createDodecahedronPlanes = (): FacePlane[] => {
    const geometry = new THREE.DodecahedronGeometry(1, 0);

    const position = geometry.getAttribute("position") as THREE.BufferAttribute;

    const planes: FacePlane[] = [];

    const a = new THREE.Vector3();
    const b = new THREE.Vector3();
    const c = new THREE.Vector3();

    const ab = new THREE.Vector3();
    const ac = new THREE.Vector3();

    for (let i = 0; i < position.count; i += 3) {
        a.fromBufferAttribute(position, i);

        b.fromBufferAttribute(position, i + 1);

        c.fromBufferAttribute(position, i + 2);

        ab.subVectors(b, a);
        ac.subVectors(c, a);

        const normal = new THREE.Vector3().crossVectors(ab, ac).normalize();

        if (normal.dot(a) < 0) {
            normal.negate();
        }

        const constant = normal.dot(a);

        const exists = planes.some(
            (plane) => plane.normal.dot(normal) > 0.9999,
        );

        if (!exists) {
            planes.push({
                normal: normal.clone(),
                constant,
            });
        }
    }

    geometry.dispose();

    return planes;
};

const createMorphGeometry = () => {
    let geometry: THREE.BufferGeometry = new THREE.DodecahedronGeometry(1, 4);

    if (geometry.index) {
        const nonIndexed = geometry.toNonIndexed();

        geometry.dispose();

        geometry = nonIndexed;
    }

    const position = geometry.getAttribute("position") as THREE.BufferAttribute;

    const planes = createDodecahedronPlanes();

    const facetedPositions = new Float32Array(position.count * 3);

    const spherePositions = new Float32Array(position.count * 3);

    const direction = new THREE.Vector3();

    const facetedPosition = new THREE.Vector3();

    for (let i = 0; i < position.count; i++) {
        direction.fromBufferAttribute(position, i).normalize();

        spherePositions[i * 3] = direction.x;

        spherePositions[i * 3 + 1] = direction.y;

        spherePositions[i * 3 + 2] = direction.z;

        let distance = Infinity;

        for (const plane of planes) {
            const denominator = plane.normal.dot(direction);

            if (denominator <= 0.000001) {
                continue;
            }

            const intersection = plane.constant / denominator;

            if (intersection < distance) {
                distance = intersection;
            }
        }

        facetedPosition.copy(direction).multiplyScalar(distance);

        facetedPositions[i * 3] = facetedPosition.x;

        facetedPositions[i * 3 + 1] = facetedPosition.y;

        facetedPositions[i * 3 + 2] = facetedPosition.z;
    }

    geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(facetedPositions, 3),
    );

    geometry.morphAttributes.position = [
        new THREE.Float32BufferAttribute(spherePositions, 3),
    ];

    geometry.morphTargetsRelative = false;

    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();

    return geometry;
};

const SphereModal = () => {
    const pathname = usePathname();

    const { isMenuDisplay, handleIsMenuDisplay } = usePageStore();

    const handleIsHover = useCursorStore().handleIsHover;

    const routeSection =
        pathname === "/"
            ? "home"
            : pathname.startsWith("/works")
              ? "works"
              : "about";

    const sphereMode: SphereMode = isMenuDisplay
        ? "menu"
        : routeSection === "home"
          ? "home"
          : "background";

    const initialIsHomeRef = useRef(pathname === "/");
    const initialMorphRef = useRef(initialIsHomeRef.current ? 0 : 1);
    const initialScaleRef = useRef(initialIsHomeRef.current ? 1.5 : 5);
    const initialSolidOpacityRef = useRef(initialIsHomeRef.current ? 1 : 0);
    const initialWireOpacityRef = useRef(initialIsHomeRef.current ? 0 : 0.2);
    const groupRef = useRef<THREE.Group | null>(null);
    const solidMeshRef = useRef<THREE.Mesh | null>(null);
    const wireMeshRef = useRef<THREE.Mesh | null>(null);
    const solidMaterialRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
    const wireMaterialRef = useRef<THREE.MeshBasicMaterial | null>(null);
    const textureRef = useRef<THREE.Texture | null>(null);

    const morphState = useRef({
        value: initialMorphRef.current,
    });
    const rotationVelocity = useRef({
        x: 0,
        y: 0,
    });
    const previousPointer = useRef({
        x: 0,
        y: 0,
    });
    const isPointerOver = useRef(false);
    const isTransitioning = useRef(false);
    const previousSphereModeRef = useRef<SphereMode>(sphereMode);
    const isInteractive = routeSection === "home" && !isMenuDisplay;
    const morphGeometry = useMemo(() => createMorphGeometry(), []);

    const handleSolidMeshRef = useCallback((mesh: THREE.Mesh | null) => {
        solidMeshRef.current = mesh;

        if (mesh?.morphTargetInfluences) {
            mesh.morphTargetInfluences[0] = initialMorphRef.current;
        }
    }, []);

    const handleWireMeshRef = useCallback((mesh: THREE.Mesh | null) => {
        wireMeshRef.current = mesh;

        if (mesh?.morphTargetInfluences) {
            mesh.morphTargetInfluences[0] = initialMorphRef.current;
        }
    }, []);

    useEffect(() => {
        const loader = new THREE.TextureLoader();

        let isDisposed = false;

        loader.load("/texture.webp", (texture) => {
            if (isDisposed) {
                texture.dispose();
                return;
            }

            texture.colorSpace = THREE.SRGBColorSpace;

            texture.wrapS = THREE.RepeatWrapping;

            texture.wrapT = THREE.ClampToEdgeWrapping;

            texture.anisotropy = 8;
            texture.needsUpdate = true;

            textureRef.current = texture;

            const material = solidMaterialRef.current;

            if (material) {
                material.map = texture;

                material.needsUpdate = true;
            }
        });

        return () => {
            isDisposed = true;

            textureRef.current?.dispose();

            textureRef.current = null;
        };
    }, []);

    useEffect(() => {
        return () => {
            morphGeometry.dispose();
        };
    }, [morphGeometry]);

    useEffect(() => {
        if (isInteractive) {
            return;
        }

        isPointerOver.current = false;

        rotationVelocity.current.x = 0;

        rotationVelocity.current.y = 0;

        handleIsHover(false);
    }, [isInteractive, handleIsHover]);

    const animateSphere = ({
        morph,
        scale,
        scaleOvershoot,
        scaleUndershoot,
        solidOpacity,
        wireOpacity,
        duration = 0.95,
    }: {
        morph: number;
        scale: number;
        scaleOvershoot?: number;
        scaleUndershoot?: number;
        solidOpacity: number;
        wireOpacity: number;
        duration?: number;
    }) => {
        const group = groupRef.current;

        const solidMaterial = solidMaterialRef.current;

        const wireMaterial = wireMaterialRef.current;

        if (!group || !solidMaterial || !wireMaterial) {
            return;
        }

        isTransitioning.current = true;

        rotationVelocity.current.x = 0;

        rotationVelocity.current.y = 0;

        gsap.killTweensOf(morphState.current);

        gsap.killTweensOf(group.scale);

        gsap.killTweensOf(solidMaterial);

        gsap.killTweensOf(wireMaterial);

        const currentScale = group.scale.x;

        const isShrinking = currentScale > scale;

        const timeline = gsap.timeline({
            defaults: {
                overwrite: "auto",
            },

            onComplete: () => {
                isTransitioning.current = false;
            },
        });

        timeline.to(
            morphState.current,
            {
                value: morph,
                duration,
                ease: "sine.inOut",
            },
            0,
        );

        if (solidOpacity === 0) {
            timeline.to(
                solidMaterial,
                {
                    opacity: 0,
                    duration: duration * 0.42,
                    ease: "sine.inOut",
                },
                duration * 0.32,
            );
        } else {
            timeline.to(
                solidMaterial,
                {
                    opacity: solidOpacity,
                    duration: duration * 0.55,
                    ease: "sine.inOut",
                },
                duration * 0.12,
            );
        }

        if (isShrinking && scaleUndershoot) {
            timeline
                .to(
                    group.scale,
                    {
                        x: scaleUndershoot,
                        y: scaleUndershoot,
                        z: scaleUndershoot,
                        duration: duration * 0.72,
                        ease: "sine.inOut",
                    },
                    0,
                )
                .to(
                    group.scale,
                    {
                        x: scale,
                        y: scale,
                        z: scale,
                        duration: duration * 0.28,
                        ease: "power2.out",
                    },
                    ">",
                );

            timeline.to(
                wireMaterial,
                {
                    opacity: wireOpacity,
                    duration: duration * 0.45,
                    ease: "sine.inOut",
                },
                duration * 0.25,
            );

            return;
        }

        if (scaleOvershoot) {
            timeline.to(
                group.scale,
                {
                    x: scaleOvershoot,
                    y: scaleOvershoot,
                    z: scaleOvershoot,
                    duration: duration * 0.62,
                    ease: "sine.inOut",
                },
                0,
            );

            timeline.to(
                wireMaterial,
                {
                    opacity: wireOpacity * 0.2,
                    duration: duration * 0.45,
                    ease: "sine.inOut",
                },
                duration * 0.12,
            );

            timeline.to(
                group.scale,
                {
                    x: scale,
                    y: scale,
                    z: scale,
                    duration: duration * 0.38,
                    ease: "sine.inOut",
                },
                ">",
            );

            timeline.to(
                wireMaterial,
                {
                    opacity: wireOpacity,
                    duration: duration * 0.38,
                    ease: "sine.inOut",
                },
                "<",
            );

            return;
        }

        timeline.to(
            group.scale,
            {
                x: scale,
                y: scale,
                z: scale,
                duration,
                ease: "sine.inOut",
            },
            0,
        );

        timeline.to(
            wireMaterial,
            {
                opacity: wireOpacity,
                duration: duration * 0.55,
                ease: "sine.inOut",
            },
            duration * 0.1,
        );
    };

    const showHomeObject = () => {
        animateSphere({
            morph: 0,
            scale: 1.5,
            scaleUndershoot: 1.35,
            solidOpacity: 1,
            wireOpacity: 0,
            duration: 0.9,
        });
    };

    const showMenuSphere = () => {
        animateSphere({
            morph: 1,
            scale: 1.8,
            scaleOvershoot: 2,
            scaleUndershoot: 1.65,
            solidOpacity: 0,
            wireOpacity: 0.8,
            duration: 0.95,
        });
    };

    const showBackgroundSphere = () => {
        animateSphere({
            morph: 1,
            scale: 5,
            scaleOvershoot: 5.5,
            solidOpacity: 0,
            wireOpacity: 0.2,
            duration: 0.9,
        });
    };

    useEffect(() => {
        const previousMode = previousSphereModeRef.current;

        if (previousMode === sphereMode) {
            return;
        }

        previousSphereModeRef.current = sphereMode;

        if (sphereMode === "home") {
            showHomeObject();

            return;
        }

        if (sphereMode === "menu") {
            showMenuSphere();

            return;
        }

        showBackgroundSphere();
    }, [sphereMode]);

    useFrame(() => {
        const group = groupRef.current;

        const solid = solidMeshRef.current;

        const wire = wireMeshRef.current;

        if (!group || !solid || !wire) {
            return;
        }

        const solidInfluences = solid.morphTargetInfluences;

        const wireInfluences = wire.morphTargetInfluences;

        if (solidInfluences) {
            solidInfluences[0] = morphState.current.value;
        }

        if (wireInfluences) {
            wireInfluences[0] = morphState.current.value;
        }

        group.rotation.y += 0.004;

        if (isInteractive && !isTransitioning.current) {
            group.rotation.y += rotationVelocity.current.y;

            group.rotation.x += rotationVelocity.current.x;

            rotationVelocity.current.x *= 0.94;

            rotationVelocity.current.y *= 0.94;
        }
    });

    const handlePointerOver = (event: ThreeEvent<PointerEvent>) => {
        if (!isInteractive || isTransitioning.current) {
            return;
        }

        isPointerOver.current = true;

        previousPointer.current = {
            x: event.nativeEvent.clientX,

            y: event.nativeEvent.clientY,
        };

        handleIsHover(true);
    };

    const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
        if (
            !isInteractive ||
            !isPointerOver.current ||
            isTransitioning.current
        ) {
            return;
        }

        const currentX = event.nativeEvent.clientX;

        const currentY = event.nativeEvent.clientY;

        const deltaX = currentX - previousPointer.current.x;

        const deltaY = currentY - previousPointer.current.y;

        rotationVelocity.current.y += deltaX * 0.0008;

        rotationVelocity.current.x += deltaY * 0.0005;

        rotationVelocity.current.y = THREE.MathUtils.clamp(
            rotationVelocity.current.y,
            -0.035,
            0.035,
        );

        rotationVelocity.current.x = THREE.MathUtils.clamp(
            rotationVelocity.current.x,
            -0.025,
            0.025,
        );

        previousPointer.current = {
            x: currentX,
            y: currentY,
        };
    };

    const handlePointerOut = () => {
        if (!isInteractive) {
            return;
        }

        isPointerOver.current = false;

        handleIsHover(false);
    };

    const handleClick = () => {
        if (!isInteractive || isTransitioning.current) {
            return;
        }

        isPointerOver.current = false;

        rotationVelocity.current.x = 0;

        rotationVelocity.current.y = 0;

        handleIsHover(false);

        handleIsMenuDisplay(true);

        trackMenuOpen();
    };

    return (
        <group ref={groupRef} scale={initialScaleRef.current}>
            <mesh
                ref={handleSolidMeshRef}
                args={[morphGeometry]}
                onPointerMove={isInteractive ? handlePointerMove : undefined}
                onPointerOver={isInteractive ? handlePointerOver : undefined}
                onPointerOut={isInteractive ? handlePointerOut : undefined}
                onClick={isInteractive ? handleClick : undefined}
            >
                <meshPhysicalMaterial
                    ref={solidMaterialRef}
                    color="#ffffff"
                    metalness={0.5}
                    roughness={0.7}
                    reflectivity={2}
                    transparent
                    opacity={initialSolidOpacityRef.current}
                />
            </mesh>

            <mesh ref={handleWireMeshRef} args={[morphGeometry]} scale={1.002}>
                <meshBasicMaterial
                    ref={wireMaterialRef}
                    transparent
                    opacity={initialWireOpacityRef.current}
                    wireframe
                />
            </mesh>
        </group>
    );
};

export default SphereModal;
