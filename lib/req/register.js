import axios from 'axios'

export async function completeProfile(token, form) {
	const payload = {
		name: form?.name || '',
		phone: form?.phone || '',
		college: form?.college || '',
		branch: form?.branch || '',
		year: Number(form?.year) || undefined,
		experience: !!form?.experience,
	}

	// Profile completion after sign-up and profile editing are the same
	// operation on this backend — both PUT to /api/user/.
	await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/`, payload, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}
