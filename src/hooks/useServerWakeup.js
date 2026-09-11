import { useEffect } from 'react'
import apiClient from '../api/axios'

/**
 * useServerWakeup
 *
 * Fires a single lightweight GET request to the backend as soon as the app
 * mounts.  This "wakes up" the Render free-tier server (which sleeps after
 * ~15 min of inactivity) so it is ready by the time the user clicks Analyze.
 *
 * The ping hits GET /health (or falls back to GET /) — both return quickly
 * and produce no side-effects.  Errors are intentionally swallowed; a
 * sleeping server is expected to time-out or return a 502 on the first call
 * before it finishes booting, and that is perfectly fine.
 */
export function useServerWakeup() {
  useEffect(() => {
    const controller = new AbortController()

    const ping = async () => {
      try {
        // Try a dedicated /health endpoint first (common FastAPI pattern).
        // If your backend exposes a different wake-up route, change it here.
        await apiClient.get('/health', {
          signal: controller.signal,
          timeout: 10_000, // wait up to 10 s — more than enough for a cold start ping
        })
        console.info('[SmartCV] Server is awake ✅')
      } catch (err) {
        if (err.name === 'CanceledError' || err.name === 'AbortError') return
        // A network error / 502 just means the server is still booting — that's fine.
        console.info('[SmartCV] Server wake-up ping sent (server may still be starting…)')
      }
    }

    ping()

    // Cancel the in-flight request if the component unmounts before it settles.
    return () => controller.abort()
  }, []) // run only once on mount
}
