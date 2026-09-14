/**
 * DiceBear Glyphs Avatar Utility
 * Generates deterministic SVG avatars using the glyphs style from @dicebear/styles.
 * Runs only on the client side (browser).
 */

let _styleInstance = null

/**
 * Lazily load & cache the Style + definition.
 * Returns null on SSR (no window).
 */
async function getGlyphsStyle() {
  if (typeof window === 'undefined') return null
  if (_styleInstance) return _styleInstance

  const [{ Style }, definition] = await Promise.all([
    import('@dicebear/core'),
    import('@dicebear/styles/glyphs.json'),
  ])

  _styleInstance = new Style(definition.default ?? definition)
  return _styleInstance
}

/**
 * Generate a DiceBear Glyphs SVG data-URL from a seed string (e.g. user name).
 * Returns a data: URL string, or null while loading / on SSR.
 *
 * @param {string} seed  - The seed string (e.g. user's name or id)
 * @param {object} opts  - Additional DiceBear options
 * @returns {Promise<string|null>}
 */
export async function getGlyphsAvatarDataUrl(seed = 'default', opts = {}) {
  try {
    const style = await getGlyphsStyle()
    if (!style) return null

    const { Avatar } = await import('@dicebear/core')
    const avatar = new Avatar(style, {
      seed,
      size: 160,
      ...opts,
    })
    const svg = avatar.toString()
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
  } catch (err) {
    console.warn('[DiceBear] Failed to generate avatar:', err)
    return null
  }
}

/**
 * A synchronous fallback URL while the async avatar is loading.
 * Uses the DiceBear CDN (no network needed if already cached).
 *
 * @param {string} seed
 */
export function getGlyphsAvatarUrl(seed = 'default') {
  return `https://api.dicebear.com/10.x/pixelbot/svg?seed=${encodeURIComponent(seed)}&size=160&backgroundColor=120c05&glowColor=ffb020`
}
