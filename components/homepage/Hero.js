import { useEffect, useState } from 'react'

import axios from 'axios'

import HeroText from './HeroText'

/* ─────────────────────────────────────────────────────────────
   SEAT COUNTDOWN

   These are the same per-day values the backend's seatCountController
   serves, mirrored here as a fallback. GET /api/seat_count is currently
   unreachable in production: src/app.js mounts it *after* the catch-all
   404 middleware, which answers every request without calling next(), so
   the route never runs and the banner had nothing to render.

   We still ask the API first, so the moment that mount is moved above the
   catch-all this file starts using the live value with no change here.
   ───────────────────────────────────────────────────────────── */
const SEAT_COUNT_BY_DATE = {
	'2026-09-16': 300,
	'2026-09-17': 285,
	'2026-09-18': 272,
	'2026-09-19': 252,
	'2026-09-20': 236,
	'2026-09-21': 228,
	'2026-09-22': 214,
	'2026-09-23': 204,
	'2026-09-24': 188,
	'2026-09-25': 168,
	'2026-09-26': 155,
	'2026-09-27': 146,
	'2026-09-28': 126,
	'2026-09-29': 108,
	'2026-09-30': 98,
	'2026-10-01': 90,
	'2026-10-02': 76,
	'2026-10-03': 59,
	'2026-10-04': 44,
	'2026-10-05': 39,
	'2026-10-06': 26,
	'2026-10-07': 7,
	'2026-10-08': 0,
}

const SEAT_FIRST_DATE = '2026-09-16'
const SEAT_LAST_DATE = '2026-10-08'

// YYYY-MM-DD in IST, so the count drops at midnight IST for every visitor
// rather than at their own local midnight — matches the backend exactly.
function getIstDateKey() {
	return new Intl.DateTimeFormat('en-CA', {
		timeZone: 'Asia/Kolkata',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(new Date())
}

export function getSeatCountForToday() {
	const today = getIstDateKey()
	if (today < SEAT_FIRST_DATE) return SEAT_COUNT_BY_DATE[SEAT_FIRST_DATE]
	if (today > SEAT_LAST_DATE) return 0
	return SEAT_COUNT_BY_DATE[today] ?? 0
}

export default function Hero() {
	const [seats, setSeats] = useState(null)

	// Resolved on the client only — reading the clock during render would make
	// the server HTML disagree with the client's and break hydration.
	useEffect(() => {
		let cancelled = false

		async function loadSeatCount() {
			try {
				const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/seat_count`)
				if (!cancelled && typeof data?.count === 'number') {
					setSeats(data.count)
					return
				}
			} catch (error) {
				console.warn('Seat count API unavailable, using local schedule:', error.message)
			}

			if (!cancelled) setSeats(getSeatCountForToday())
		}

		loadSeatCount()

		return () => {
			cancelled = true
		}
	}, [])

	return (
		<div className='hero'>
			<div className='spacerv-lg' />

			<div className='hero-content'>
				<HeroText />
			</div>

			<div className='spacerv-lg' />

			{seats !== null && seats !== 0 && (
				<div className='vacancy-banner-container'>
					<div className='vacancy-banner'>
						<span className='vacancy-number'>{seats}</span>
						<span className='vacancy-label'>SEATS LEFT</span>
					</div>
				</div>
			)}
		</div>
	)
}
