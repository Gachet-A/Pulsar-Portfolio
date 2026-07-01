"use client"

import { useConsent } from "./consent-provider"
import { Button } from "@/components/ui/button"

export default function ManageCookiesButton() {
  const { reset, consent } = useConsent()

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button onClick={reset} className="bg-blue-800 hover:bg-blue-900">
        Gérer mes préférences de cookies
      </Button>
      {consent && (
        <span className="text-sm text-gray-500">
          Choix actuel : {consent === "granted" ? "Cookies acceptés" : "Cookies refusés"}
        </span>
      )}
    </div>
  )
}
