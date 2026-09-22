// Campus Ambassador registration window (local time). The hero's seat countdown
// and the "Registrations close in" timer both key off these dates.
export const REGISTRATION_START = new Date(2026, 8, 15)
export const REGISTRATION_END = new Date(2026, 9, 8)

export const NEW_REGISTRATIONS_ENABLED =
	process.env.NEXT_PUBLIC_NEW_REGISTRATIONS_ENABLED !== 'false'

export const REGISTRATION_ROUTE = NEW_REGISTRATIONS_ENABLED ? '/register' : '/regclosed'

// A signed-in profile may keep using the site while new sign-ups are off only
// when it is a fully-registered CA (every CA detail filled in). An incomplete
// profile is indistinguishable from a fresh sign-up, so it stays gated behind
// the registration-closed page.
export const canAccessProfile = (user) => NEW_REGISTRATIONS_ENABLED || !!user?.isComplete
