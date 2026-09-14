import Spinner from 'components/common/Spinner'

// The actual `?token=` handling lives in context/UserContext.js (it runs
// globally, since the backend's OAuth redirect target isn't guaranteed to be
// this specific route). This page just shows a spinner while that happens,
// in case the backend does land the user here.
export default function GoogleCallbackPage() {
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
