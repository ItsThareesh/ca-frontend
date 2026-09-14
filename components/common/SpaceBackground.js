import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

const REGION_SIZE = 60

const Stars = ({ count = 3000 }) => {
	const pointsRef = useRef()

	const circleTexture = useMemo(() => {
		if (typeof document === 'undefined') return null
		const canvas = document.createElement('canvas')
		canvas.width = 64
		canvas.height = 64
		const ctx = canvas.getContext('2d')
		ctx.beginPath()
		ctx.arc(32, 32, 30, 0, 2 * Math.PI)
		ctx.fillStyle = '#ffffff'
		ctx.fill()
		return new THREE.CanvasTexture(canvas)
	}, [])

	const [positions, sizes] = useMemo(() => {
		const p = new Float32Array(count * 3)
		const s = new Float32Array(count)

		for (let i = 0; i < count; i++) {
			let x, y, z, orbitMinDistSq
			do {
				x = (Math.random() - 0.5) * REGION_SIZE
				y = (Math.random() - 0.5) * REGION_SIZE
				z = (Math.random() - 0.5) * REGION_SIZE

				const r_xz = Math.sqrt(x * x + z * z)
				orbitMinDistSq = y * y + (r_xz - 10) ** 2
			} while (orbitMinDistSq < 25)

			p.set([x, y, z], i * 3)
			s[i] = Math.random() * 0.2 + 0.05
		}
		return [p, s]
	}, [count])

	useFrame((state) => {
		if (pointsRef.current) {
			pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
		}
	})

	return (
		<Points ref={pointsRef} positions={positions} sizes={sizes}>
			<PointMaterial
				transparent
				color='#ffffee'
				size={0.03}
				sizeAttenuation={true}
				depthWrite={false}
				opacity={0.9}
				map={circleTexture}
				alphaTest={0.002}
			/>
		</Points>
	)
}

const Meteor = () => {
	const meshRef = useRef()

	const startPos = useMemo(
		() =>
			new THREE.Vector3(
				(Math.random() - 0.5) * 40,
				20 + Math.random() * 10,
				-10 - Math.random() * 20
			),
		[]
	)
	const speed = useMemo(() => 15 + Math.random() * 10, [])

	useFrame((state, delta) => {
		if (meshRef.current) {
			meshRef.current.position.x -= speed * delta * 0.5
			meshRef.current.position.y -= speed * delta

			if (meshRef.current.position.y < -30) {
				meshRef.current.position.copy(startPos)
				meshRef.current.position.x = (Math.random() - 0.5) * 40
				meshRef.current.position.y = 20 + Math.random() * 10
			}
		}
	})

	return (
		<mesh ref={meshRef} position={startPos}>
			<sphereGeometry args={[0.05, 8, 8]} />
			<meshBasicMaterial color='#d4a373' />
		</mesh>
	)
}

const CameraRig = () => {
	const { camera } = useThree()
	useFrame((state) => {
		const targetX = (state.pointer.x * 2 - camera.position.x) * 0.1
		const targetY = (state.pointer.y * 2 - camera.position.y) * 0.1
		camera.position.x += targetX
		camera.position.y += targetY
		camera.lookAt(0, 0, 0)
	})
	return null
}

// dial particle count / pixel ratio back on smaller / weaker screens
function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false)
	useEffect(() => {
		const mq = window.matchMedia('(max-width: 768px)')
		const update = () => setIsMobile(mq.matches)
		update()
		mq.addEventListener('change', update)
		return () => mq.removeEventListener('change', update)
	}, [])
	return isMobile
}

export default function SpaceBackground() {
	const isMobile = useIsMobile()

	return (
		<div
			style={{
				position: 'fixed',
				inset: 0,
				width: '100%',
				height: '100%',
				zIndex: -1,
				background: '#050505',
				overflow: 'hidden',
			}}
		>
			<Canvas
				camera={{ position: [0, 0, 10], fov: 60 }}
				dpr={isMobile ? [1, 1.5] : [1, 2]}
				resize={{ scroll: false, debounce: 0 }}
				style={{ width: '100%', height: '100%', display: 'block' }}
			>
				<fog attach='fog' args={['#050505', 10, 40]} />
				<Stars count={isMobile ? 8000 : 30000} />
				{[...Array(3)].map((_, i) => (
					<Meteor key={i} />
				))}
				<CameraRig />
			</Canvas>
		</div>
	)
}
