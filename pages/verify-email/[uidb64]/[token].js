import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function VerifyEmailPage() {
	const router = useRouter()
	const { uidb64, token } = router.query

	const [status, setStatus] = useState('Verifying...')

	useEffect(() => {
		if (!uidb64 || !token) return

		const verifyEmail = async () => {
			try {
				const res = await fetch(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/verify-email/${uidb64}/${token}/`,
					{ method: 'GET' }
				)

				const data = await res.json()

				if (res.ok) {
					setStatus(' Email verified successfully!')
					toast.success('Email verified successfully!', { autoClose: 2000 })

					// Redirect to login after 3 seconds
					setTimeout(() => {
						router.push('/login')
					}, 1000)
				} else {
					setStatus(` ${data.message || 'Verification failed!'}`)
					toast.error(data.message || 'Verification failed!', { autoClose: 3000 })
				}
			} catch (err) {
				setStatus(' Something went wrong.')
				toast.error('Something went wrong.', { autoClose: 3000 })
			}
		}

		verifyEmail()
	}, [uidb64, token, router])

	return (
		<div style={{ padding: '2rem', textAlign: 'center' }}>
			<h1>Email Verification</h1>
			<p>{status}</p>
			<ToastContainer position='top-right' />
		</div>
	)
}
