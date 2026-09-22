// Campus Ambassador registration window (local time). The hero's seat countdown
// and the "Registrations close in" timer both key off these dates.
export const REGISTRATION_START = new Date(2026, 8, 15)
export const REGISTRATION_END = new Date(2026, 9, 8)

export const NEW_REGISTRATIONS_ENABLED =
	process.env.NEXT_PUBLIC_NEW_REGISTRATIONS_ENABLED !== 'false'

export const REGISTRATION_ROUTE = NEW_REGISTRATIONS_ENABLED ? '/register' : '/regclosed'
