"use client"

import { useRouter } from 'next/router'
import PageHeader from 'components/common/PageHeader'
import RegisterForm from 'components/register/RegisterForm'

export default function Register() {
	const router = useRouter()

	return (
		<>
			<PageHeader
				title={router?.query?.editprofile === 'true' ? 'Edit profile' : 'Register'}
				icon='/images/pen.png'
			/>
			<RegisterForm editProfile={router?.query?.editprofile === 'true'} />
		</>
	)
}
