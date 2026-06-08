"use client"

import type { MouseEvent } from "react"
import { Quote, Star } from "lucide-react"
import { motion } from "framer-motion"

interface ReferenceCardProps {
  company: string
  project: string
  testimonial: string
}

export default function ReferenceCard({ company, project, testimonial }: ReferenceCardProps) {
  const initials = company
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`)
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="spotlight surface-card group relative flex h-full w-full flex-col p-7 transition-colors duration-300 hover:border-blue-300/60"
    >
      <Quote className="absolute right-6 top-6 h-9 w-9 text-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-200" />

      <p className="label-mono mb-4 text-[0.65rem] text-blue-500/80">{project}</p>

      <div className="mb-5 flex gap-0.5 text-amber-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-current" />
        ))}
      </div>

      <p className="relative z-10 mb-6 flex-1 text-[15px] leading-relaxed text-gray-700">"{testimonial}"</p>

      <div className="flex items-center gap-3 border-t border-blue-900/[0.06] pt-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-700 to-blue-900 text-sm font-semibold text-white transition-transform duration-300 group-hover:scale-110">
          {initials}
        </div>
        <h3 className="truncate font-semibold tracking-tight text-gray-900">{company}</h3>
      </div>
    </motion.div>
  )
}
