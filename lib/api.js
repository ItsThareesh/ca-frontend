import axios from 'axios'

// Shared API instance. Auth is cookie-only: the browser attaches the
// better-auth session cookie itself, so no Authorization header and no token
// in JS/localStorage — ever. Every caller must use this instance (or another
// `withCredentials: true` call) or the session won't be sent.
const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	withCredentials: true,
	headers: { 'Content-Type': 'application/json' },
})

export default api
