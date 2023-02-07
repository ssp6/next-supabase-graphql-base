import createCache from '@emotion/cache'

/**
 * Creates a new Emotion cache instance for SSR
 */
export const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true })
}
