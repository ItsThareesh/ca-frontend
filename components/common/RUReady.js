import { useEffect, useRef, useState } from 'react'
import { useUserContext } from 'context/UserContext'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import styles from './r-u-ready.module.css'

export default function RUReady() {
	const { user, isLoggedIn } = useUserContext()
	const router = useRouter()
	const iconRef = useRef(null)
	const [spinning, setSpinning] = useState(false)
	const [hovering, setHovering] = useState(false)
	const [hasAnimated, setHasAnimated] = useState(false)

	useEffect(() => {
		const el = iconRef.current
		if (typeof window === 'undefined' || !el) return

		const onScroll = () => {
			if (hasAnimated) return
			const rect = el.getBoundingClientRect()
			if (rect.top <= window.innerHeight && rect.bottom >= 0) {
				setHasAnimated(true)
				setSpinning(true)
				setTimeout(() => setSpinning(false), 1000)
			}
		}

		onScroll()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => window.removeEventListener('scroll', onScroll)
	}, [hasAnimated])

	const handleHoverEnter = () => {
		setHovering(true)
		setSpinning(true)
	}

	const handleHoverLeave = () => {
		setHovering(false)
		setSpinning(false)
	}

	const handleClick = () => {
		if (isLoggedIn && user) {
			toast.info('You are already logged in!')
		} else {
			toast.info('Registrations are closed.')
		}
	}

	return (
		<div className='container'>
			<div className='spacerv-md'></div>
			<div className='spacerv-sm'></div>
			<div className={styles['r-u-ready']}>
				<div className={styles['left']}>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						id='vic-icon'
						ref={iconRef}
						src='/images/simon.png'
						alt='Tathva mascot'
						className={`${styles['vic-icon']} ${spinning ? styles['spin-once'] : ''} ${
							hovering ? styles['spin-hover'] : ''
						}`}
						onMouseEnter={handleHoverEnter}
						onMouseLeave={handleHoverLeave}
					/>
					<div className={styles['r-u-ready-text']}>
						<h3>Are you ready?</h3>
						<p>
							To be a part of the biggest tech
							<br /> fest in South India
						</p>
					</div>
				</div>
				<button className={`btn-primary ${styles['r-u-ready-btn']}`} onClick={handleClick}>
					Sign up
				</button>
			</div>
			<div className='spacerv-md'></div>
			<div className='spacerv-sm'></div>
		</div>
	)
}
