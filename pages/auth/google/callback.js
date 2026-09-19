import { useEffect } from 'react'
import { useUserContext } from 'context/UserContext'
import Spinner from 'components/common/Spinner'

// OAuth landing page. Google returns to the backend callback, which sets the
// httpOnly session cookie and redirects here with no token in the URL.
// better-auth restores the session and this context loads the profile — this
// page just waits for that and routes: guest -> /login, else /profile (which
// opens the edit form itself while the profile is incomplete).
export default function GoogleCallbackPage() {
	const { isLoggedIn, authLoading } = useUserContext()

	useEffect(() => {
		if (authLoading) return

		window.location.replace(isLoggedIn ? '/profile' : '/login')
	}, [authLoading, isLoggedIn])

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
