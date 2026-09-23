import Link from 'next/link'
import { useUserContext } from 'context/UserContext'
import styles from './register-closed.module.css'

export default function RegisterClosed() {
	const { isLoggedIn, logout } = useUserContext()

	return (
		<div className='container'>
			<div className={styles['closed-container']}>
				<div className={styles['closed-icon']} aria-hidden='true'>
					<svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
						<rect x='4.5' y='10.5' width='15' height='10' rx='2.25' stroke='url(#lockGradient)' strokeWidth='1.5' />
						<path
							d='M8 10.5V7.5a4 4 0 0 1 8 0v3'
							stroke='url(#lockGradient)'
							strokeWidth='1.5'
							strokeLinecap='round'
						/>
						<circle cx='12' cy='15' r='1.4' fill='url(#lockGradient)' />
						<defs>
							<linearGradient id='lockGradient' x1='4.5' y1='7.5' x2='19.5' y2='20.5' gradientUnits='userSpaceOnUse'>
								<stop offset='0%' stopColor='#d4af37' />
								<stop offset='100%' stopColor='#f5f5f5' />
							</linearGradient>
						</defs>
					</svg>
				</div>

				<p className={styles['regclosed-header']}>Registrations Closed</p>
				<p className={styles['regclosed-info']}>
					Campus Ambassador registrations for this event have closed and new sign-ups are no longer
					accepted. If you think this is a mistake, reach out and we&apos;ll sort it out.
				</p>

				<div className={styles['regclosed-actions']}>
					<Link href='/contact' className={styles['regclosed-contact-link']}>
						Contact page
					</Link>
				</div>

				{isLoggedIn && (
					<button type='button' className={styles['regclosed-logout']} onClick={logout}>
						Sign out
					</button>
				)}
			</div>
			<div className='spacerv-md'></div>
			<div className='spacerv-sm'></div>
		</div>
	)
}
