import { useEffect } from 'react'
import { useRouter } from 'next/router'
import RegisterForm from 'components/register/RegisterForm'
import styles from '../styles/login.module.css'

export default function Register() {
	const router = useRouter()

	useEffect(() => {
		const nextRoot = document.getElementById('__next')
		nextRoot?.classList.add(styles.loginPage)
		return () => {
			nextRoot?.classList.remove(styles.loginPage)
		}
	}, [])

	return <RegisterForm editProfile={router?.query?.editprofile === 'true'} />
}
