import { Suspense, useRef } from 'react'
import Head from 'next/head'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { Scroll, ScrollControls, Stars, useScroll } from '@react-three/drei'
import { EffectComposer, Glitch, DotScreen } from '@react-three/postprocessing'

import styles from '../styles/Home.module.css'

function Earth(props) {
  const ref = useRef()
  const scroll = useScroll()
  const colorMap = useLoader(TextureLoader, 'earth.svg')

  useFrame(() => {
    ref.current.position.z = 0.5 + (scroll.scroll.current * 2);
  })

  return (
    <mesh
      {...props}
      ref={ref}
      position={[0, -1, 2]}
      rotation={[0, 4.81, -0.63]}
      scale={0.5}>
      <sphereGeometry args={[5, 32, 32]} />
      <meshStandardMaterial map={colorMap} color="#20c20E" />
    </mesh>
  )
}

function Sun(props) {
  const ref = useRef()

  return (
    <pointLight ref={ref} intensity={0.8} position={[1, 0.5, 7]} />
  )
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Globe</title>
        <meta name="description" content="Globe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Canvas className={styles.canvas}>
          <Suspense fallback={null}>
            <ScrollControls pages={5}>
              <Stars
                radius={150}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
              />
              <EffectComposer>
                <DotScreen
                  angle={Math.PI * 0.5} // angle of the dot pattern
                  scale={1.0} // scale of the dot pattern
                />
                <Glitch
                  delay={[1.5, 10.5]} // min and max glitch delay
                  duration={[0.6, 1.0]} // min and max glitch duration
                  strength={[0.3, 1.0]} // min and max glitch strength
                  active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
                  ratio={0.85}
                />
              </EffectComposer>
              <Sun />
              <Earth />
              <Scroll html style={{ width: '100%' }}>
                <h1 style={{ position: 'absolute', top: `100vh`, left: '5vw', color: '#FFF', fontSize: '25em' }}>lorem</h1>
                <h1 style={{ position: 'absolute', top: '180vh', fontSize: '15em', color: '#FFF', right: '5vw' }}>ipsum</h1>
                <h1 style={{ position: 'absolute', top: '260vh', fontSize: '20em', color: '#FFF', right: '10vw' }}>dolor</h1>
                <h1 style={{ position: 'absolute', top: '350vh', fontSize: '20em', color: '#FFF', left: '10vw' }}>sit</h1>
                <h1 style={{ position: 'absolute', top: '440vh', fontSize: '20em', color: '#FFF', right: '10vw' }}>amet</h1>
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </main>
    </>
  )
}
