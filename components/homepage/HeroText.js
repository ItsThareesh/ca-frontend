import { useUserContext } from 'context/UserContext'
import { useRouter } from 'next/router'
import CountUp from 'react-countup'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
// Note: Toast imports are no longer needed for this feature
// import { toast, ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'

const HeroText = () => {
	const router = useRouter()
	const { isLoggedIn } = useUserContext()
	const [timeLeft, setTimeLeft] = useState(0)

	useEffect(() => {
		// Set the target date to the end of today (Oct 4, 2025, 23:59:59)
		const targetDate = new Date('2025-10-05T19:30:59')

		const interval = setInterval(() => {
			const now = new Date()
			const difference = targetDate.getTime() - now.getTime()
			setTimeLeft(difference > 0 ? difference : 0)
		}, 1000)

		// Cleanup interval on component unmount
		return () => clearInterval(interval)
	}, [])

	const formatTime = (ms) => {
		const totalSeconds = Math.floor(ms / 1000)
		const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
		const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
		const seconds = String(totalSeconds % 60).padStart(2, '0')
		return `${hours}:${minutes}:${seconds}`
	}
	// --- END: Added logic for registration deadline countdown ---

	const handleSignUp2 = () => {
		if (isLoggedIn) {
			router.push('/dashboard/profile')
		} else {
			router.push('/register')
		}
	}

		const handleSignUp = () => {
		if (isLoggedIn) {
			router.push('/dashboard/profile')
		} else {
			toast.info("Registrations are now closed.")
		}
	}

	return (
		<div className='hero-text container'>
			<h1 className='hero-heading'>
				Campus <br />
				Ambassador
			</h1>
			<p className='hero-tagline'>Be the emissary of Tathva 2026</p>

			{/* --- START: New countdown element --- */}
			<div className='deadline-timer'>
				{timeLeft > 0 ? (
					<>
						🔥 Registrations close in: <strong>{formatTime(timeLeft)}</strong>
					</>
				) : (
					<span>Registrations are now closed.</span>
				)}
			</div>
			{/* --- END: New countdown element --- */}

			<div className='hero-cta-wrapper'>
				{/* Conditionally disable button if registrations are closed */}
				<button onClick={handleSignUp} className='btn-primary'>
					{isLoggedIn ? 'Go to Dashboard' : 'Sign up'}
				</button>
				<a href='#explore'>
					<button className='btn-outline'>Explore</button>
				</a>
			</div>

			<div className='hero-stats'>
				<div className='stat-wrapper'>
					<CountUp
						className='stat-num'
						end={30}
						duration={1.5}
						delay={0.5}
						suffix='+'
						useEasing={true}
					/>
					<p>Workshops</p>
				</div>
				<div className='stat-wrapper'>
					<CountUp
						className='stat-num'
						end={12}
						duration={1.3}
						delay={0.5}
						suffix='+'
						useEasing={true}
					/>
					<p>Lectures</p>
				</div>
				<div className='stat-wrapper'>
					<CountUp
						className='stat-num'
						end={150}
						duration={1.8}
						delay={0.5}
						suffix='+'
						useEasing={true}
					/>
					<p>Sponsors</p>
				</div>
			</div>
		</div>
	)
}

export default HeroText
