"use client"

import type { MouseEvent, ReactNode } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Check, X } from "lucide-react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ServiceCardProps {
  title: string
  description: string
  details: string
  features: string[]
  icon: ReactNode
  index?: number
  darkMode?: boolean
}

export default function ServiceCard({
  title,
  description,
  details,
  features,
  icon,
  index = 0,
  darkMode = false,
}: ServiceCardProps) {
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          onMouseMove={handleMove}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -8 }}
          role="button"
          tabIndex={0}
          className={`spotlight group relative w-full cursor-pointer overflow-hidden rounded-2xl p-7 outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan-400/60 ${
            darkMode
              ? "spotlight-dark border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:border-cyan-300/40 hover:bg-white/[0.06]"
              : "surface-card hover:border-blue-300/60"
          }`}
        >
          <span
            className={`absolute left-0 top-0 h-px w-0 transition-all duration-500 group-hover:w-full ${
              darkMode
                ? "bg-gradient-to-r from-cyan-300/0 via-cyan-300 to-cyan-300/0"
                : "bg-gradient-to-r from-blue-500/0 via-blue-500 to-blue-500/0"
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

            <p className={`text-sm leading-relaxed ${darkMode ? "text-blue-100/75" : "text-gray-600"}`}>
              {description}
            </p>

            <span
              className={`mt-5 inline-flex items-center gap-1 font-mono text-[0.7rem] uppercase tracking-wider transition-colors ${
                darkMode ? "text-cyan-200/60 group-hover:text-cyan-200" : "text-blue-400 group-hover:text-blue-600"
              }`}
            >
              En savoir plus →
            </span>
          </div>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-lg overflow-hidden rounded-2xl border-blue-900/10 p-0 [&>button]:hidden">
        <div className="relative bg-gradient-to-br from-blue-900 to-blue-950 px-7 pb-7 pt-8 text-white">
          <DialogClose className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white/80 ring-1 ring-white/15 transition-colors hover:bg-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60">
            <X className="h-4 w-4" />
            <span className="sr-only">Fermer</span>
          </DialogClose>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-cyan-200 ring-1 ring-white/15">
            {icon}
          </div>
          <p className="mb-1 font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">
            {`Service // ${String(index + 1).padStart(2, "0")}`}
          </p>
          <DialogHeader>
            <DialogTitle className="font-heading text-2xl font-bold tracking-tight text-white">{title}</DialogTitle>
          </DialogHeader>
        </div>

        <div className="px-7 pb-7 pt-5">
          <DialogDescription className="text-[0.95rem] leading-relaxed text-gray-600">{details}</DialogDescription>

          <ul className="mt-5 space-y-3">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 ring-1 ring-blue-100">
                  <Check className="h-3 w-3" />
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <DialogClose asChild>
            <a href="#contact">
              <Button className="mt-7 w-full bg-blue-800 transition-colors hover:bg-blue-900">
                Discuter de ce service
              </Button>
            </a>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}
