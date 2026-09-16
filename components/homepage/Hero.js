import { useEffect, useState } from 'react'

import axios from 'axios'

import HeroText from './HeroText'

export default function Hero() {
	const [seats, setSeats] = useState(null)

	useEffect(() => {
		async function fetchSeatCount() {
			try {
				const response = await axios.get('/api/seat_count')
				setSeats(response.data.count)
			} catch (error) {
				console.error('Failed to fetch seat count:', error)
			}
		}

		fetchSeatCount()
	}, [])

	return (
		<div className='hero'>
			<div className='spacerv-lg' />

			<div className='hero-content'>
				<HeroText />
			</div>

			<div className='spacerv-lg' />

			{(seats !== null || seats !== 0) && (
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
