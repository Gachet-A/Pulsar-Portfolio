"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"

type Consent = "granted" | "denied"

const STORAGE_KEY = "pulsar-cookie-consent"

interface ConsentContextValue {
  /** null = the visitor hasn't chosen yet */
  consent: Consent | null
  /** true once we've read the stored choice (avoids SSR/hydration flash) */
  ready: boolean
  accept: () => void
  decline: () => void
  /** clears the choice so the banner shows again ("manage cookies") */
  reset: () => void
}

const ConsentContext = createContext<ConsentContextValue | undefined>(undefined)

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === "granted" || stored === "denied") setConsent(stored)
    } catch {
      // localStorage unavailable (private mode etc.) — treat as undecided
    }
    setReady(true)
  }, [])

  const persist = useCallback((value: Consent | null) => {
    try {
      if (value) localStorage.setItem(STORAGE_KEY, value)
      else localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore write failures
    }
    setConsent(value)
  }, [])

  const accept = useCallback(() => persist("granted"), [persist])
  const decline = useCallback(() => persist("denied"), [persist])
  const reset = useCallback(() => persist(null), [persist])

  return (
    <ConsentContext.Provider value={{ consent, ready, accept, decline, reset }}>{children}</ConsentContext.Provider>
  )
}

export function useConsent() {
  const ctx = useContext(ConsentContext)
  if (!ctx) throw new Error("useConsent must be used within a ConsentProvider")
  return ctx
}
