"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import MobileMenu from "@/components/mobile-menu"
import { logoMask, navItems, navHref } from "@/lib/nav"

export default function SiteHeader() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Transparent only when overlaying the homepage hero; solid otherwise.
  const solid = !isHome || scrolled

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          solid ? "border-b border-blue-900/[0.06] bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href="/" className="group flex items-center" aria-label="Pulsar — Accueil">
            <span
              aria-hidden
              className={`block h-10 w-[84px] transition-colors duration-300 group-hover:opacity-90 ${
                solid ? "bg-blue-800" : "bg-white"
              }`}
              style={logoMask}
            />
            <span className="sr-only">Pulsar</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <Link
                  href={navHref(item)}
                  className={`group relative text-sm font-medium transition-colors ${
                    solid ? "text-gray-600 hover:text-blue-800" : "text-white/85 hover:text-white"
                  }`}
                >
                  <span
                    className={`mr-1 font-mono text-[0.7rem] transition-colors ${
                      solid ? "text-blue-400" : "text-cyan-300/80"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.fr}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/#contact"
              className="group relative inline-flex items-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-700 to-cyan-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-900/20 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-900/30"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
              />
              <span className="relative z-10 flex items-center">
                Contactez-Nous
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          <div className={`transition-colors md:hidden ${solid ? "text-gray-900" : "text-white"}`}>
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* Spacer so content isn't hidden under the fixed header on pages without a hero */}
      {!isHome && <div aria-hidden className="h-[72px]" />}
    </>
  )
}
