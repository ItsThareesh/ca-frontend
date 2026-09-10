import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useUserContext } from 'context/UserContext'
import axios from 'axios'

import styles from '../../styles/profile.module.css'

export default function ProfilePage() {
	const { user, accessToken, logout } = useUserContext()
	const router = useRouter()
	const [form, setForm] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!user || !accessToken) {
			router.push('/login')
			return
		}
		fetchProfile()
	}, [accessToken, user])

	const fetchProfile = async () => {
		try {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/`, {
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			})
			setForm(data)
			setLoading(false)
		} catch (err) {
			console.error(err)
			toast.error('Failed to load profile')
			setLoading(false)
		}
	}

	if (loading) {
		return (
			<div className='container'>
				<div className={styles['profile-loading']}>Loading profile...</div>
			</div>
		)
	}

	return (
		<div className='container'>
			<div className={styles['profile-wrapper']}>
				<div className={styles['profile-header']}>

					<div className={styles['profile-header-info']}>
						<h1 className={styles['profile-name']}>{form?.name}</h1>
						<p className={styles['profile-email']}>{form?.email}</p>
						{form?.tathvaId && <p className={styles['profile-id']}>Tathva ID: {form.tathvaId}</p>}
						{form?.is_ca && <span className={styles['profile-ca-badge']}>Campus Ambassador</span>}
					</div>
				</div>

				<div className={styles['profile-details']}>
					<div className={styles['profile-section']}>
						<h2 className={styles['profile-section-title']}>Personal Information</h2>
						<div className={styles['profile-info-grid']}>
							<div className={styles['profile-info-item']}>
								<span className={styles['profile-info-label']}>Name</span>
								<span className={styles['profile-info-value']}>
									{form?.name || 'Not provided'}
								</span>
							</div>
							<div className={styles['profile-info-item']}>
								<span className={styles['profile-info-label']}>Email</span>
								<span className={styles['profile-info-value']}>
									{form?.email || 'Not provided'}
								</span>
							</div>
							<div className={styles['profile-info-item']}>
								<span className={styles['profile-info-label']}>Phone</span>
								<span className={styles['profile-info-value']}>
									{form?.phone || 'Not provided'}
								</span>
							</div>
						</div>
					</div>

					<div className={styles['profile-section']}>
						<h2 className={styles['profile-section-title']}>Academic Information</h2>
						<div className={styles['profile-info-grid']}>
							<div className={styles['profile-info-item']}>
								<span className={styles['profile-info-label']}>Institute</span>
								<span className={styles['profile-info-value']}>
									{form?.college || 'Not provided'}
								</span>
							</div>
							<div className={styles['profile-info-item']}>
								<span className={styles['profile-info-label']}>Branch</span>
								<span className={styles['profile-info-value']}>
									{form?.branch || 'Not provided'}
								</span>
							</div>
							<div className={styles['profile-info-item']}>
								<span className={styles['profile-info-label']}>Year of Study</span>
								<span className={styles['profile-info-value']}>
									{form?.year || 'Not provided'}
								</span>
							</div>
							<div className={styles['profile-info-item']}>
								<span className={styles['profile-info-label']}>Previous CA Experience</span>
								<span className={styles['profile-info-value']}>
									{form?.experience ? 'Yes' : 'No'}
								</span>
							</div>
						</div>
					</div>

					<div className={styles['profile-actions']}>
						<button className='btn-secondary' onClick={logout}>
							Logout
						</button>
					</div>
				</div>
			</div>
			<div className='spacerv-md'></div>
		</div>
	)
}