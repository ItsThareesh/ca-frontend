import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { FcGoogle } from 'react-icons/fc'
import { completeProfile } from 'lib/req/register'
import { useUserContext } from 'context/UserContext'

import authStyles from 'styles/login.module.css'
import styles from './register-form.module.css'

export default function RegisterForm({ editProfile }) {
	const { user, accessToken, isLoggedIn, authLoading, loginWithGoogle, fetchUserProfile } =
		useUserContext()
	const router = useRouter()
	const [form, setForm] = useState(null)
	const [submitting, setSubmitting] = useState(false)

	// Prefill once we know who the signed-in user is
	useEffect(() => {
		if (!user) return
		setForm({
			name: user.name || '',
			phone: user.phone || '',
			college: user.college || '',
			branch: user.branch || '',
			year: user.year ? String(user.year) : '',
			experience: user.experience || false,
		})
	}, [user])

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setSubmitting(true)
		try {
			await completeProfile(accessToken, form)
			await fetchUserProfile(accessToken)
			toast.success(editProfile ? 'Profile updated!' : 'Profile completed! Welcome aboard.')
			router.push('/profile')
		} catch (err) {
			console.error(err)
			const errors = err.response?.data
			if (errors && typeof errors === 'object') {
				const messages = Object.values(errors).flat().join(' | ')
				toast.error(messages || 'Something went wrong!')
			} else {
				toast.error('Something went wrong!')
			}
		} finally {
			setSubmitting(false)
		}
	}

	// Still restoring a possibly-existing session — avoid flashing the wrong state.
	// Render the empty container so the footer stays pinned to the bottom.
	if (authLoading) return <div className={authStyles.container} />

	// Guest with no Google session yet — this is the "sign up" entry point itself
	if (!isLoggedIn) {
		return (
			<div className={authStyles.container}>
				<div className={authStyles.loginBox}>
					<div className={authStyles.logoSection}>
						<h1 className={authStyles.title}>Create your account</h1>
						<p className={authStyles.subtitle}>
							Sign up with Google to get started as a Campus Ambassador
						</p>
					</div>

					<button type='button' className={authStyles.googleButton} onClick={loginWithGoogle}>
						<FcGoogle size={20} />
						Sign up with Google
					</button>

					<p className={authStyles.disclaimer}>
						By continuing, you agree to Tathva&apos;s terms and privacy policy.
					</p>
				</div>
			</div>
		)
	}

	// Authenticated, profile not hydrated from context yet
	if (!form) return <div className={authStyles.container} />

	return (
		<div className={authStyles.container}>
			<form className={`${authStyles.loginBox} ${styles['register-form']}`} onSubmit={handleSubmit}>
				<div className={authStyles.logoSection}>
					<h1 className={authStyles.title}>
						{editProfile ? 'Edit profile' : 'Complete your profile'}
					</h1>
					<p className={`${authStyles.subtitle} ${styles['register-form-email']}`}>
						{user?.email}
					</p>
				</div>

				<fieldset>
					<label>Name</label>
					<input
						type='text'
						name='name'
						placeholder='Enter your name'
						value={form.name}
						onChange={handleChange}
						required
					/>
				</fieldset>

				<fieldset>
					<label>Whatsapp no.</label>
					<input
						type='text'
						name='phone'
						placeholder='Enter your whatsapp no.'
						value={form.phone}
						onChange={handleChange}
						required
					/>
				</fieldset>

				<fieldset>
					<label>Institute*</label>
					<input
						type='text'
						name='college'
						placeholder='Enter your institute'
						value={form.college}
						required
						onChange={handleChange}
					/>
				</fieldset>

				<fieldset>
					<label>Branch</label>
					<input
						type='text'
						name='branch'
						placeholder='Enter your branch'
						value={form.branch}
						onChange={handleChange}
					/>
				</fieldset>

				<fieldset>
					<label>Year of study</label>
					<select name='year' value={form.year} onChange={handleChange}>
						<option value=''>Choose year of study</option>
						<option value='1'>Year 1</option>
						<option value='2'>Year 2</option>
						<option value='3'>Year 3</option>
						<option value='4'>Year 4</option>
						<option value='5'>Year 5</option>
					</select>
				</fieldset>

				<fieldset>
					<label>Have you been a CA before?</label>
					<select
						name='experience'
						value={form.experience ? 'true' : 'false'}
						onChange={(e) => setForm({ ...form, experience: e.target.value === 'true' })}
					>
						<option value='false'>No</option>
						<option value='true'>Yes</option>
					</select>
				</fieldset>

				<button
					type='submit'
					className={`${authStyles.googleButton} ${styles['register-form-submit']}`}
					disabled={submitting}
				>
					{submitting ? 'Saving...' : editProfile ? 'Save' : 'Complete Sign Up'}
				</button>
			</form>
		</div>
	)
}
