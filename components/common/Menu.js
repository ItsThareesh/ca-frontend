import Link from 'next/link'
import { IoMdClose } from 'react-icons/io'
import Image from 'next/image'

import styles from './menu.module.css'

export default function Menu({ show, onClose }) {
	return (
		<div className={`${styles['menu']} ${show ? styles['menu-visible'] : styles['menu-hidden']}`}>
			<div className={styles['navbar']}>
				<div className={styles['logo-wrapper']}>
					<IoMdClose className={styles['menu-icon']} onClick={onClose} />
					<Link href='/'>
						<img src='/images/logoNew.png' alt='Tathva 2026' className={styles['nav-logo']} />
					</Link>
				</div>
			</div>

			<ul className={styles['menu-links']} onClick={onClose}>
				<li>
					<Link href='/'>Home</Link>
				</li>
				<li>
					<Link href='/leaderboard'>Leaderboard</Link>
				</li>
				<li>
					<Link href='/contact'>Contact</Link>
				</li>
			</ul>
		</div>
	)
}
