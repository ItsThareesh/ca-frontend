import { useEffect, useState } from 'react'
import { useContext, createContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { getGlyphsAvatarUrl } from 'lib/dicebear'

const UserContext = createContext()

export default function UserContextWrapper({ children }) {
	const router = useRouter()

	const [user, setUser] = useState(null)
	const [accessToken, setAccessToken] = useState(null)
	const [refreshToken, setRefreshToken] = useState(null)
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	// True until the initial session-restore-from-localStorage attempt finishes.
	// Pages that gate on `user`/`isLoggedIn` on mount (e.g. redirecting guests to
	// /login) should wait for this to go false first, otherwise a refresh of an
	// already-authenticated user briefly looks logged-out and bounces them.
	const [authLoading, setAuthLoading] = useState(true)

	// Initialize session on mount. Cookie-only: the browser sends the httpOnly
	// `auth` cookie automatically; no token is ever read from JS.
	useEffect(() => {
		fetchCookieSession()
			.catch(() => {})
			.finally(() => setAuthLoading(false))
	}, [])

	// Fetch user profile. Cookie-only: the httpOnly `auth` cookie authenticates
	// the request. `withCredentials` must always be set so the browser sends it.
	const fetchUserProfile = async () => {
		try {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/`, {
				withCredentials: true,
			})

			const currentUser = {
				userId: data?.id,
				tathvaId: data?.tathvaId || data?.tathva_id,
				is_ca: data?.is_ca || false,
				name: data?.name,
				email: data?.email,
				phone: data?.phone || '',
				college: data?.college || '',
				branch: data?.branch || '',
				year: data?.year || '',
				district: data?.district || '',
				state: data?.state || '',
				refCode: data?.referralCode || data?.ref_code || '',
				totalPoints: data?.totalPoints || data?.total_points || 0,
			}
			console.log(data)

			setUser(currentUser)
			setIsLoggedIn(true)
			return currentUser
		} catch (err) {
			console.error('Error fetching user profile:', err)

			// If token is invalid, try to refresh
			if (err.response?.status === 401) {
				const refreshed = await refreshAccessToken()
				if (!refreshed) {
					logout()
				}
			}
		}
	}

	// Cookie-only session check. No side effects (no refresh attempt, no
	// logout toast) — returns the user or null. Used on mount and on the
	// OAuth callback landing page.
	const fetchCookieSession = async () => {
		const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/`, {
			withCredentials: true,
		})

		// A 200 without an identity means "no session" — don't mark logged-in.
		if (!data?.id && !data?.email) {
			throw new Error('No active session')
		}

		const currentUser = {
			userId: data?.id,
			tathvaId: data?.tathvaId || data?.tathva_id,
			is_ca: data?.is_ca || false,
			name: data?.name,
			email: data?.email,
			phone: data?.phone || '',
			college: data?.college || '',
			district: data?.district || '',
			state: data?.state || '',
			semester: data?.semester || '',
			branch: data?.branch || '',
			year: data?.year || '',
			experience: data?.experience || false,
			refCode: data?.referralCode || data?.ref_code || data?.refCode || '',
			totalPoints: data?.totalPoints || data?.total_points || 0,
			imageUrl: data?.avatarUrl || data?.imageUrl || getGlyphsAvatarUrl(data?.name || 'CA'),
		}

		setUser(currentUser)
		setIsLoggedIn(true)
		return currentUser
	}

	// Refresh access token using refresh token

	// const refreshAccessToken = async () => {
	// 	try {
	// 		const storedRefreshToken = localStorage.getItem('refresh_token')
	// 		if (!storedRefreshToken) return false

	// 		const { data } = await axios.post(
	// 			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/token/refresh/`,
	// 			{ refresh: storedRefreshToken }
	// 		)

	// 		const newAccessToken = data.access
	// 		localStorage.setItem('access_token', newAccessToken)
	// 		setAccessToken(newAccessToken)

	// 		await fetchUserProfile()
	// 		return true
	// 	} catch (err) {
	// 		console.error('Error refreshing token:', err)
	// 		return false
	// 	}
	// }

	// Sign up new user
	// const signUp = async (userData) => {
	// 	try {
	// 		const { data } = await axios.post(
	// 			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register/`,
	// 			userData
	// 		)

	// 		toast.success('Registration successful! Please check your email to verify your account.')
	// 		return { success: true, data }
	// 	} catch (err) {
	// 		const errorMsg =
	// 			err.response?.data?.message ||
	// 			err.response?.data?.error ||
	// 			'Registration failed. Please try again.'
	// 		toast.error(errorMsg)
	// 		console.error('Signup error:', err)
	// 		return { success: false, error: errorMsg }
	// 	}
	// }

	// Login user
	// const login = async (email, password) => {
	// 	try {
	// 		const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login/`, {
	// 			email,
	// 			password,
	// 		})

	// 		// Store tokens
	// 		localStorage.setItem('access_token', data.access)
	// 		localStorage.setItem('refresh_token', data.refresh)

	// 		setAccessToken(data.access)
	// 		setRefreshToken(data.refresh)

	// 		// Fetch user profile (cookie session)
	// 		await fetchUserProfile()

	// 		toast.success('Logged in successfully!')
	// 		return { success: true }
	// 	} catch (err) {
	// 		const errorMsg =
	// 			err.response?.data?.message ||
	// 			err.response?.data?.error ||
	// 			'Login failed. Please check your credentials.'
	// 		toast.error(errorMsg)
	// 		console.error('Login error:', err)
	// 		return { success: false, error: errorMsg }
	// 	}
	// }

	// Start the Google OAuth flow. GET /api/auth/google returns
	// { url: <Google consent screen URL> } rather than redirecting itself,
	// so we fetch it and then navigate the browser there. Google then returns
	// to the backend's own /api/auth/callback, which sets the httpOnly `auth`
	// cookie and redirects back to `redirect` (must be allowlisted in the
	// backend's ALLOWED_ORIGINS). No token ever travels in the URL.
	const loginWithGoogle = async () => {
		try {
			const redirect = `${window.location.origin}/auth/google/callback`
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`, {
				params: { redirect },
			})
			if (!data?.url) throw new Error('Missing Google auth URL in response')

			window.location.href = data.url
		} catch (err) {
			console.error('Failed to start Google sign-in:', err)
			toast.error('Could not start Google sign-in. Please try again.')
		}
	}

	// Logout user — clear the server cookie (best effort), then local state.
	async function logout() {
		try {
			await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
				{},
				{ withCredentials: true }
			)
		} catch (err) {
			console.error('Server logout failed:', err)
		}
		setUser(null)
		setIsLoggedIn(false)
		setAccessToken(null)
		setRefreshToken(null)
		toast.success('Signed out successfully')
	}

	// Get current user (async, cookie session)
	function getUser() {
		return fetchCookieSession().catch(() => null)
	}

	// Authenticated axios instance. Cookie-only: the browser attaches the
	// session cookie, so no Authorization header is ever set here.
	const createAuthAxios = () => {
		const instance = axios.create({
			baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
			withCredentials: true,
		})

		return instance
	}

	return (
		<UserContext.Provider
			value={{
				user,
				accessToken,
				refreshToken,
				isLoggedIn,
				authLoading,
				signUp,
				login,
				loginWithGoogle,
				logout,
				getUser,
				fetchUserProfile,
				fetchCookieSession,
				refreshAccessToken,
				createAuthAxios,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export function useUserContext() {
	return useContext(UserContext)
}
