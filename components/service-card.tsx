"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { motion } from "framer-motion"

interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
  color?: string
}

export default function ServiceCard({
  title,
  description,
  icon,
  color = "bg-blue-100 text-blue-700",
}: ServiceCardProps) {
  const iconColors = {
    "Solutions IA": "bg-blue-100 text-blue-700",
    Cybersécurité: "bg-blue-100 text-blue-800",
    "Infrastructure Cloud": "bg-cyan-100 text-cyan-700",
    "Conseil IT": "bg-blue-100 text-blue-900",
    "Développement Logiciel": "bg-teal-100 text-teal-700",
    "Support 24/7": "bg-blue-100 text-blue-700",
  }

  const getColor = () => {
    // @ts-ignore
    return iconColors[title] || color
  }

  const [iconColor, textColor] = getColor().split(" ")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="transition-all duration-300 border-gray-200 overflow-hidden shadow-sm">
        <CardHeader className="pb-2 relative">
          <motion.div
            className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center ${textColor} mb-4 z-10`}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            {icon}
          </motion.div>

          <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-5 bg-blue-900" />

          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

