import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from 'context/UserContext'
import { canAccessProfile } from 'lib/registration'
import Spinner from 'components/common/Spinner'

// Backend error codes that mean "registrations are closed", routed to the
// same /regclosed page as the frontend's own NEW_REGISTRATIONS_ENABLED gate
// below, so a closed-registrations block always looks the same regardless of
// which side caught it.
const REGISTRATIONS_CLOSED_CODES = new Set(['CA_REGISTRATIONS_CLOSED'])

// OAuth landing page. Google returns to the backend callback, which sets the
// httpOnly session cookie and redirects here with no token in the URL.
// better-auth restores the session and this context loads the profile — this
// page just waits for that and routes: guest -> /login, blocked account (new
// sign-up while registrations are off) -> /regclosed, else /profile (which
// opens the edit form itself while the profile is incomplete).
//
// The backend can also redirect here on failure (`errorCallbackURL`, e.g. a
// closed-registrations block issued after the session cookie was already
// written) with `?error=<code>`. It also clears that cookie server-side, but
// `logout()` is called anyway as defense in depth.
export default function GoogleCallbackPage() {
	const { user, isLoggedIn, authLoading, logout } = useUserContext()
	const router = useRouter()

	useEffect(() => {
		if (!router.isReady) return
		const { error } = router.query
		if (!error) return

		const target = REGISTRATIONS_CLOSED_CODES.has(error) ? '/regclosed' : '/login'
		logout().finally(() => window.location.replace(target))
	}, [router.isReady, router.query, logout])

	useEffect(() => {
		if (authLoading || router.query.error) return

		if (!isLoggedIn) {
			window.location.replace('/login')
			return
		}

		// New sign-ups are locked: only a fully-registered CA keeps going to
		// /profile. A fresh Google account (incomplete CA profile) is not a
		// confirmed CA, so send it to the registration-closed page instead of
		// letting it finish registering through the profile form.
		if (!canAccessProfile(user)) {
			window.location.replace('/regclosed')
			return
		}

		window.location.replace('/profile')
	}, [authLoading, isLoggedIn, user, router.query.error])

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
