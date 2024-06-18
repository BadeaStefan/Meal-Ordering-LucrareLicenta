import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Model from './Model.jsx';

export default function Burger() {

    return (
        <Canvas style={{ height: '70vh' }}>
            <PerspectiveCamera
                makedefault
                position={[0, -3, -4]}
                fov={100}
                zoom={5}
            />
            <ambientLight intensity={4} />
            <pointLight position={[5, 5, 5]} />
            <Suspense fallback={null}>
                <Model url="/Burger2.glb" ></Model>
            </Suspense>
            <OrbitControls />
        </Canvas>
    );
}