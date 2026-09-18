import { useEffect, useState } from 'react'
import { useUserContext } from 'context/UserContext'
import Spinner from 'components/common/Spinner'

// OAuth landing page. The backend sets the httpOnly `auth` cookie and
// redirects here with no token in the URL — the session is already
// established (or restored) by UserContextWrapper on mount. This page just
// waits for that and routes accordingly.
export default function GoogleCallbackPage() {
	const { user, isLoggedIn, authLoading, fetchCookieSession } = useUserContext()
	const [checking, setChecking] = useState(true)

	// Re-check the cookie session on landing: a full-page redirect from the
	// backend remounts the app, but an explicit check here covers the case
	// where the cookie was just set and context hasn't settled yet.
	useEffect(() => {
		let cancelled = false
		fetchCookieSession()
			.catch(() => {})
			.finally(() => {
				if (!cancelled) setChecking(false)
			})
		return () => {
			cancelled = true
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (authLoading || checking) return

		if (!isLoggedIn) {
			window.location.replace('/login')
			return
		}

		const redirectTo = sessionStorage.getItem('redirectTo') || '/profile'
		sessionStorage.removeItem('redirectTo')

		if (!user?.name) {
			window.location.replace('/register')
		} else {
			window.location.replace(redirectTo)
		}
	}, [authLoading, checking, isLoggedIn, user])

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'grid',
				placeContent: 'center',
			}}
		>
			<Spinner />
		</div>
	)
}
