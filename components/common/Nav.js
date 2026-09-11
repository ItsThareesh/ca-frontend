import { useState } from 'react'
import Link from 'next/link'
import { BiMenu } from 'react-icons/bi'
import { useUserContext } from 'context/UserContext'
import Menu from 'components/common/Menu'
import styles from './nav.module.css'

export default function Nav() {
	const { isLoggedIn, user } = useUserContext()
	const [showMenu, setShowMenu] = useState(false)

	const handleSignInOrDashboard = () => {
		if (!isLoggedIn) {
			// Redirect to login page
			window.location.href = '/login'
		} else {
			// Redirect to dashboard
			window.location.href = '/dashboard/profile'
		}
	}

	return (
		<nav className={styles.navbar}>
			<div className={styles['logo-wrapper']}>
				<BiMenu className={styles['menu-icon']} onClick={() => setShowMenu(true)} />
				<Link href='/'>
					<img src='/images/logoNew.png' alt='Tathva 2026' className={styles['nav-logo']} />
				</Link>
			</div>

			<div className={styles['nav-right']}>
				<ul className={styles['nav-links']}>
					<li>
						<Link href='/' className={styles['nav-text']}>
							Home
						</Link>
					</li>
					<li>
						<Link href='/leaderboard' className={styles['nav-text']}>
							Leaderboard
						</Link>
					</li>
					<li>
						<Link href='/contact' className={styles['nav-text']}>
							Contact
						</Link>
					</li>
					<li>
						{!isLoggedIn ? (
							<div className={styles['sign-in-desktop']} onClick={handleSignInOrDashboard}>
								Sign in
							</div>
						) : (
							<div className={styles['sign-out-desktop']} onClick={handleSignInOrDashboard}>
								<div
									className={styles.avatar}
									style={{ backgroundImage: `url(${user?.imageUrl})` }}
								/>
							</div>
						)}
					</li>
				</ul>

				{!isLoggedIn ? (
					<div className={styles['sign-in-mobile']} onClick={handleSignInOrDashboard}>
						Sign in
					</div>
				) : (
					<div onClick={handleSignInOrDashboard}>Profile</div>
				)}
			</div>

			<Menu show={showMenu} onClose={() => setShowMenu(false)} />
		</nav>
	)
}
