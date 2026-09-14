import { useEffect } from 'react'
import ContactUs from 'components/contact/ContactUs'
import SpaceBackground from 'components/common/SpaceBackground'

export default function Contact() {
	useEffect(() => {
		// Remove the normal grid background while on the contact page
		document.body.classList.add('leaderboard-page')

		// Put the normal background back when leaving the contact page
		return () => {
			document.body.classList.remove('leaderboard-page')
		}
	}, [])

	return (
		<div className='leaderboard-page relative min-h-[calc(100vh-220px)] overflow-hidden flex flex-col justify-center'>
			{/* GhostFibers full-page background */}
			<SpaceBackground />
			{/* Page content above GhostFibers */}
			<div className='relative z-10 w-full pt-20 pb-4 sm:pt-24 sm:pb-6'>
				<ContactUs />
			</div>
		</div>
	)
}
