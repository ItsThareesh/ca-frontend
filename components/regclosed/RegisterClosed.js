import { useUserContext } from 'context/UserContext'
import styles from './register-closed.module.css'

export default function RegisterClosed() {
	const { isLoggedIn, logout } = useUserContext()

	return (
		<>
			<div className='container'>
				<div className={styles['closed-container']}>
					<p className={styles['regclosed-header']}>Registration Closed</p>
					<p className={styles['regclosed-info']}>Contact us for any queries</p>
					{isLoggedIn && (
						<button type='button' className={styles['regclosed-logout']} onClick={logout}>
							Sign out
						</button>
					)}
				</div>
				<div className='spacerv-md'></div>
				<div className='spacerv-sm'></div>
			</div>
		</>
	)
}
