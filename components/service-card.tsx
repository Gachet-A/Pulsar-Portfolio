"use client"

import type { MouseEvent, ReactNode } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

interface ServiceCardProps {
  title: string
  description: string
  icon: ReactNode
  index?: number
  darkMode?: boolean
}

export default function ServiceCard({ title, description, icon, index = 0, darkMode = false }: ServiceCardProps) {
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
      className={`spotlight group relative w-full overflow-hidden rounded-2xl p-7 transition-colors duration-300 ${
        darkMode
          ? "spotlight-dark border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:border-cyan-300/40 hover:bg-white/[0.06]"
          : "surface-card hover:border-blue-300/60"
      }`}
    >
      {/* top accent line draws in on hover */}
      <span
        className={`absolute left-0 top-0 h-px w-0 transition-all duration-500 group-hover:w-full ${
          darkMode ? "bg-gradient-to-r from-cyan-300/0 via-cyan-300 to-cyan-300/0" : "bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0"
        }`}
      />

      <div className="relative z-10">
        <div className="mb-6 flex items-start justify-between">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${
              darkMode
                ? "bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-cyan-200 ring-1 ring-white/10"
                : "bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700 ring-1 ring-blue-900/5"
            }`}
          >
            {icon}
          </div>
          <span className={`font-mono text-xs ${darkMode ? "text-cyan-200/50" : "text-blue-300"}`}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mb-2 flex items-center gap-1.5">
          <h3 className={`text-lg font-semibold tracking-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
            {title}
          </h3>
          <ArrowUpRight
            className={`h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${
              darkMode ? "text-cyan-200" : "text-blue-600"
            }`}
          />
        </div>

        <p className={`text-sm leading-relaxed ${darkMode ? "text-blue-100/75" : "text-gray-600"}`}>{description}</p>
      </div>
    </motion.div>
  )
}
