import axios from 'axios'

export async function completeProfile(form) {
	// Exactly the fields the backend's PUT /api/user/ accepts
	const { name, phone, college, district, state, semester, branch, year } = form
	const payload = { name, phone, college, district, state, semester, branch, year }

	// Profile completion after sign-up and profile editing are the same
	// operation on this backend — both PUT to /api/user/. Cookie-only auth.
	await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/`, payload, {
		withCredentials: true,
	})
}
