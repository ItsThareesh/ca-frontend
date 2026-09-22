import { useEffect } from 'react'
import { useUserContext } from 'context/UserContext'
import { canAccessProfile } from 'lib/registration'
import Spinner from 'components/common/Spinner'

// OAuth landing page. Google returns to the backend callback, which sets the
// httpOnly session cookie and redirects here with no token in the URL.
// better-auth restores the session and this context loads the profile — this
// page just waits for that and routes: guest -> /login, blocked account (new
// sign-up while registrations are off) -> /regclosed, else /profile (which
// opens the edit form itself while the profile is incomplete).
export default function GoogleCallbackPage() {
	const { user, isLoggedIn, authLoading } = useUserContext()

	useEffect(() => {
		if (authLoading) return

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
	}, [authLoading, isLoggedIn, user])

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
