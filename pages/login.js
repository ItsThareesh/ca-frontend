import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from 'context/UserContext'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import styles from '../styles/login.module.css'

export default function Login() {
	const router = useRouter()
	const { login, loginWithGoogle, isLoggedIn } = useUserContext()

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})
	const [isLoading, setIsLoading] = useState(false)

	// Redirect if already logged in
	useEffect(() => {
		if (isLoggedIn) {
			const redirectTo = sessionStorage.getItem('redirectTo') || '/profile'
			sessionStorage.removeItem('redirectTo')
			router.push(redirectTo)
		}
	}, [isLoggedIn])

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setIsLoading(true)


		const result = await login(formData.email, formData.password)

		setIsLoading(false)

		if (result.success) {
			const redirectTo = sessionStorage.getItem('redirectTo') || '/profile'
			sessionStorage.removeItem('redirectTo')
			router.push(redirectTo)
		}
	}

	return (
		<div className={styles.container}>
			<div className={styles.loginBox}>
				<div className={styles.logoSection}>
					<p className={styles.subtitle}>Sign in to your account</p>
				</div>

				<form onSubmit={handleSubmit} className={styles.form}>
					<div className={styles.inputGroup}>
						<label htmlFor='email' className={styles.label}>
							Email Address
						</label>
						<input
							type='email'
							id='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
							className={styles.input}
							placeholder='your.email@example.com'
							required
						/>
					</div>

					<div className={styles.inputGroup}>
						<label htmlFor='password' className={styles.label}>
							Password
						</label>
						<input
							type='password'
							id='password'
							name='password'
							value={formData.password}
							onChange={handleChange}
							className={styles.input}
							placeholder='Enter your password'
							required
						/>
					</div>

					<div className={styles.forgotPassword}>
						{/* <Link href='/reset-password' className={styles.link}>
							Forgot password?
						</Link> */}
					</div>

					<button type='submit' className={styles.submitButton} disabled={isLoading}>
						{isLoading ? 'Signing in...' : 'Sign In'}
					</button>
				</form>

				<div className={styles.divider}>or</div>

				<button
					type='button'
					className={styles.googleButton}
					onClick={loginWithGoogle}
				>
					<FcGoogle size={20} />
					Sign in with Google
				</button>

				<div className={styles.footer}>
					<p className={styles.footerText}>
						<Link href='/register' className={styles.link}>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
