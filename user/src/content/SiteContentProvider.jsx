import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '')

const emptyContent = {
  navigation: [],
  pages: {},
  slides: [],
  partnerNotes: [],
  activities: [],
  announcements: [],
  footer: {},
}

const hasObjectPayload = (value) => value && typeof value === 'object' && !Array.isArray(value)

function normalizePayload(payload) {
  if (!hasObjectPayload(payload)) return emptyContent

  return {
    navigation: Array.isArray(payload.navigation) ? payload.navigation : [],
    pages: hasObjectPayload(payload.pages) ? payload.pages : {},
    slides: Array.isArray(payload.home?.hero?.slides) ? payload.home.hero.slides : [],
    partnerNotes: Array.isArray(payload.home?.partner_notes?.items) ? payload.home.partner_notes.items : [],
    activities: Array.isArray(payload.home?.activities?.items) ? payload.home.activities.items : [],
    announcements: Array.isArray(payload.home?.announcements?.items) ? payload.home.announcements.items : [],
    footer: hasObjectPayload(payload.footer) ? payload.footer : {},
  }
}

const SiteContentContext = createContext(null)

export function SiteContentProvider({ children }) {
  const [payload, setPayload] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadToken, setReloadToken] = useState(0)

  const reload = useCallback(() => {
    setReloadToken((current) => current + 1)
  }, [])

  useEffect(() => {
    const controller = new AbortController()

    async function loadContent() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_BASE_URL}/api/site-content/frontend`, {
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`API Laravel membalas status ${response.status}`)
        }

        setPayload(await response.json())
      } catch (caughtError) {
        if (caughtError.name !== 'AbortError') {
          setPayload(null)
          setError(caughtError)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadContent()

    return () => controller.abort()
  }, [reloadToken])

  const normalizedPayload = useMemo(() => normalizePayload(payload), [payload])
  const value = useMemo(() => ({
    ...normalizedPayload,
    loading,
    error,
    isReady: Boolean(payload && !error),
    reload,
  }), [normalizedPayload, loading, error, payload, reload])

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContent() {
  const context = useContext(SiteContentContext)

  if (!context) {
    throw new Error('useSiteContent must be used inside SiteContentProvider')
  }

  return context
}
