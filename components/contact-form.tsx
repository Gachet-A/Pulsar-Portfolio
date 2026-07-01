"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Send } from "lucide-react"
import { motion } from "framer-motion"

export default function ContactForm() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error ?? "L'envoi a échoué.")
      }

      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
        duration: 5000,
      })

      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Échec de l'envoi",
        description: err instanceof Error ? err.message : "Veuillez réessayer plus tard.",
        duration: 6000,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-blue-900/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Nom Complet
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jean Dupont"
            required
            className="w-full focus:ring-2 focus:ring-blue-800 transition-all duration-300"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Adresse Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jean@exemple.com"
            required
            className="w-full focus:ring-2 focus:ring-blue-800 transition-all duration-300"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="company" className="text-sm font-medium text-gray-700">
          Entreprise (Facultatif)
        </label>
        <Input
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Votre Entreprise"
          className="w-full focus:ring-2 focus:ring-blue-800 transition-all duration-300"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-gray-700">
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Comment pouvons-nous vous aider ?"
          required
          className="w-full min-h-[150px] focus:ring-2 focus:ring-blue-800 transition-all duration-300"
        />
      </div>

      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          type="submit"
          className="w-full bg-blue-800 hover:bg-blue-900 transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Envoi en cours...
            </span>
          ) : (
            <motion.span
              className="flex items-center"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 0.5 }}
            >
              Envoyer le Message <Send className="ml-2 h-4 w-4" />
            </motion.span>
          )}
        </Button>
      </motion.div>
    </motion.form>
  )
}

