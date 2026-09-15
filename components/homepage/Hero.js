import { useEffect, useState } from 'react'
import Sponsors from './Sponsors'
import HeroText from './HeroText'
import { REGISTRATION_START, REGISTRATION_END } from 'lib/registration'

const MAX_SEATS = 300
const DAY_MS = 1000 * 60 * 60 * 24

// Countdown starts at MAX_SEATS on REGISTRATION_START and runs out (0 seats) on
// REGISTRATION_END. Depends on the current time and performance.now(), so it
// must only run on the client — calling it during render makes the server HTML
// differ from the client's and breaks hydration.
const vacancyLogic = () => {
	const TOTAL_DAYS = Math.round((REGISTRATION_END - REGISTRATION_START) / DAY_MS)
	const now = new Date()
	const daysSinceStart = Math.floor((now - REGISTRATION_START) / DAY_MS)
	if (daysSinceStart >= TOTAL_DAYS) return 0
	const day = Math.max(0, daysSinceStart)
	const progress = day / TOTAL_DAYS
	const baseSeats = MAX_SEATS * (1 - progress)
	const random = Math.abs(Math.sin(daysSinceStart * 12.9898 + performance.now() * 0.0001)) % 1
	const variation = (random - 0.5) * 12
	// Never show 0 before the end date
	return Math.round(Math.max(1, Math.min(MAX_SEATS, baseSeats + variation)))
}

export default function Hero() {
	const [seats, setSeats] = useState(null)

	useEffect(() => {
		setSeats(vacancyLogic())
	}, [])

	return (
		<div className='hero'>
			<div className='spacerv-lg'></div>

			<div className='hero-content'>
				<HeroText />
			</div>
			<div className='spacerv-lg'></div>

			<div className='vacancy-banner-container'>
				<div className='vacancy-banner'>
					<span className='vacancy-number'>{seats ?? ' '}</span>
					<span className='vacancy-label'>SEATS LEFT</span>
				</div>
			</div>
		</div>
	)
}
