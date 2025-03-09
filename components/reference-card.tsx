"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Quote } from "lucide-react"
import { motion } from "framer-motion"

interface ReferenceCardProps {
  company: string
  project: string
  testimonial: string
}

export default function ReferenceCard({ company, project, testimonial }: ReferenceCardProps) {
  // Generate a random color for each card from tech-themed colors
  const colors = [
    { bg: "bg-blue-100", text: "text-blue-700" },
    { bg: "bg-blue-100", text: "text-blue-800" },
    { bg: "bg-teal-100", text: "text-teal-700" },
    { bg: "bg-cyan-100", text: "text-cyan-700" },
  ]

  const randomColor = colors[Math.floor(Math.random() * colors.length)]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className="transition-all duration-300 border-gray-200 h-full shadow-sm">
        <CardHeader className="pb-2 relative">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{company}</h3>
            <div className={`${randomColor.bg} p-2 rounded-full ${randomColor.text}`}>
              <Quote className="h-5 w-5" />
            </div>
          </div>
          <p className={`text-sm font-medium ${randomColor.text}`}>{project}</p>

          <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-5 bg-blue-900" />
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 italic">"{testimonial}"</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

