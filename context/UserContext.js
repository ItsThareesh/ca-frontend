import { useEffect, useState, useRef } from 'react'
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

	// Initialize user from stored tokens on mount
	useEffect(() => {
		const storedAccessToken = localStorage.getItem('access_token')
		const storedRefreshToken = localStorage.getItem('refresh_token')

		// Google sign-in only ever stores an access token (no refresh token),
		// so only the access token is required to restore a session.
		if (storedAccessToken) {
			setAccessToken(storedAccessToken)
			if (storedRefreshToken) setRefreshToken(storedRefreshToken)
			fetchUserProfile(storedAccessToken).finally(() => setAuthLoading(false))
		} else {
			setAuthLoading(false)
		}
	}, [])

	// Fetch user profile
	const fetchUserProfile = async (token) => {
		try {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
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
				experience: data?.experience || false,
				refCode: data?.refCode || data?.ref_code || '',
				totalPoints: data?.totalPoints || data?.total_points || 0,
				imageUrl: data?.avatarUrl || data?.imageUrl || getGlyphsAvatarUrl(data?.name || 'Hamood Habibi'),
			}

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

	// Refresh access token using refresh token
	const refreshAccessToken = async () => {
		try {
			const storedRefreshToken = localStorage.getItem('refresh_token')
			if (!storedRefreshToken) return false

			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/token/refresh/`,
				{ refresh: storedRefreshToken }
			)

			const newAccessToken = data.access
			localStorage.setItem('access_token', newAccessToken)
			setAccessToken(newAccessToken)

			await fetchUserProfile(newAccessToken)
			return true
		} catch (err) {
			console.error('Error refreshing token:', err)
			return false
		}
	}

	// Sign up new user
	const signUp = async (userData) => {
		try {
			const { data } = await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register/`,
				userData
			)

			toast.success('Registration successful! Please check your email to verify your account.')
			return { success: true, data }
		} catch (err) {
			const errorMsg =
				err.response?.data?.message ||
				err.response?.data?.error ||
				'Registration failed. Please try again.'
			toast.error(errorMsg)
			console.error('Signup error:', err)
			return { success: false, error: errorMsg }
		}
	}

	// Login user
	const login = async (email, password) => {
		try {
			const { data } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login/`, {
				email,
				password,
			})

			// Store tokens
			localStorage.setItem('access_token', data.access)
			localStorage.setItem('refresh_token', data.refresh)

			setAccessToken(data.access)
			setRefreshToken(data.refresh)

			// Fetch user profile
			await fetchUserProfile(data.access)

			toast.success('Logged in successfully!')
			return { success: true }
		} catch (err) {
			const errorMsg =
				err.response?.data?.message ||
				err.response?.data?.error ||
				'Login failed. Please check your credentials.'
			toast.error(errorMsg)
			console.error('Login error:', err)
			return { success: false, error: errorMsg }
		}
	}

	// Start the Google OAuth flow. GET /api/auth/google returns
	// { url: <Google consent screen URL> } rather than redirecting itself,
	// so we fetch it and then navigate the browser there. Google then returns
	// to the backend's own /api/auth/callback, which redirects back to
	// /auth/google/callback with a `?token=` JWT.
	const loginWithGoogle = async () => {
		try {
			const redirect = encodeURIComponent(`${window.location.origin}/profile`)

			const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/ca/google?redirect=${redirect}`
			)
			if (!data?.url) throw new Error('Missing Google auth URL in response')

			window.location.href = data.url
		} catch (err) {
			console.error('Failed to start Google sign-in:', err)
			toast.error('Could not start Google sign-in. Please try again.')
		}
	}

	// Complete sign-in using the JWT handed back by the Google OAuth callback redirect
	const loginWithToken = async (token) => {
		try {
			localStorage.setItem('access_token', token)
			localStorage.removeItem('refresh_token')

			setAccessToken(token)
			setRefreshToken(null)

			const currentUser = await fetchUserProfile(token)
			if (!currentUser) throw new Error('Failed to fetch user profile')

			return { success: true, user: currentUser }
		} catch (err) {
			console.error('Google login error:', err)
			toast.error('Google sign-in failed. Please try again.')
			return { success: false }
		}
	}

	// Google hands the JWT back as a `?token=` query param after OAuth completes.
	// Which page the backend redirects to is backend-configured, not something
	// this app controls — it may land on a dedicated callback route, or on the
	// site root, or anywhere else. So this has to run globally (every page goes
	// through UserContextWrapper) rather than living on one specific route.
	const processedUrlToken = useRef(false)
	useEffect(() => {
		if (!router.isReady) return
		const token = router.query.token
		if (!token || typeof token !== 'string' || processedUrlToken.current) return
		processedUrlToken.current = true

		// Strip the token out of the address bar immediately so it never lingers
		// there or in browser history.
		const url = new URL(window.location.href)
		url.searchParams.delete('token')
		window.history.replaceState({}, '', url.pathname + url.search)

		const completeGoogleLogin = async () => {
			const result = await loginWithToken(token)

			if (!result.success) {
				window.location.replace('/login')
				return
			}

			toast.success('Logged in successfully!')

			const redirectTo = sessionStorage.getItem('redirectTo') || '/profile'
			sessionStorage.removeItem('redirectTo')

			if (!result.user?.name) {
				window.location.replace('/register')
			} else {
				window.location.replace(redirectTo)
			}
		}

		completeGoogleLogin()
	}, [router.isReady, router.query.token])

	// Logout user
	function logout() {
		setUser(null)
		setIsLoggedIn(false)
		setAccessToken(null)
		setRefreshToken(null)
		localStorage.removeItem('access_token')
		localStorage.removeItem('refresh_token')
		toast.success('Signed out successfully')
		router.push('/')
	}

	// Get current user (async)
	function getUser() {
		return new Promise(async (resolve, reject) => {
			try {
				const token = localStorage.getItem('access_token')
				if (token) {
					const userData = await fetchUserProfile(token)
					resolve(userData)
				} else {
					resolve(null)
				}
			} catch (err) {
				reject(err)
			}
		})
	}

	// Create axios instance with auto token refresh
	const createAuthAxios = () => {
		const instance = axios.create({
			baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
		})

		instance.interceptors.request.use(
			(config) => {
				if (accessToken) {
					config.headers.Authorization = `Bearer ${accessToken}`
				}
				return config
			},
			(error) => Promise.reject(error)
		)

		instance.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error.config

				if (error.response?.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true

					const refreshed = await refreshAccessToken()
					if (refreshed) {
						originalRequest.headers.Authorization = `Bearer ${accessToken}`
						return instance(originalRequest)
					}
				}

				return Promise.reject(error)
			}
		)

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
				loginWithToken,
				logout,
				getUser,
				fetchUserProfile,
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
