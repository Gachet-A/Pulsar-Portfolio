"use client"

import { useConsent } from "./consent-provider"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Cookie } from "lucide-react"

export default function CookieConsent() {
  const { consent, ready, accept, decline } = useConsent()
  const show = ready && consent === null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6"
          role="dialog"
          aria-live="polite"
          aria-label="Consentement aux cookies"
        >
          <div className="surface-card mx-auto flex max-w-4xl flex-col gap-4 p-5 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-start gap-3">
              <Cookie className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
              <p className="text-sm leading-relaxed text-gray-600">
                Nous utilisons des cookies de mesure d'audience (Google Analytics, Microsoft Clarity) pour comprendre
                l'utilisation du site et l'améliorer. Aucun cookie n'est déposé sans votre accord.{" "}
                <a
                  href="/confidentialite"
                  className="font-medium text-blue-700 underline underline-offset-2 hover:text-blue-900"
                >
                  En savoir plus
                </a>
              </p>
            </div>

            <div className="flex shrink-0 gap-3 sm:ml-auto">
              <Button variant="outline" onClick={decline} className="flex-1 sm:flex-none">
                Refuser
              </Button>
              <Button onClick={accept} className="flex-1 bg-blue-800 hover:bg-blue-900 sm:flex-none">
                Accepter
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
