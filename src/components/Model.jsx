import { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
export default function Model({ url }) {
    const group = useRef();

    const { scene, animations } = useGLTF(url);
    const { actions, mixer } = useAnimations(animations, scene);

    useEffect(() => {
        
        for (let i = 1; i < 6; i++) {
            const action = actions[Object.keys(actions)[i]];
            action.setLoop(THREE.LoopOnce, 1);
            action.play();

            action.clampWhenFinished = true;
            if (action.onFinish) {
                action.stop();
            }
        }

    }, [mixer, actions]);

    return <primitive ref={group} dispose={null} object={scene} position={[0, -3, -4]} />;
}
