"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { logoMask, navItems, navHref } from "@/lib/nav"

const footerServices = ["Solutions IA", "Cybersécurité", "Infrastructure Cloud", "Conseil IT", "Développement Logiciel"]

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-gray-950 py-14 text-white">
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="tech-gradient absolute inset-0" />
      </div>
      <div className="dot-grid absolute inset-0 opacity-20" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <motion.div
              className="mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/" aria-label="Pulsar — Accueil">
                <span aria-hidden className="block h-12 w-[101px] bg-white" style={logoMask} />
                <span className="sr-only">Pulsar</span>
              </Link>
            </motion.div>
            <motion.p
              className="max-w-xs text-sm leading-relaxed text-gray-400"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Sécuriser votre avenir numérique avec des solutions innovantes d'IA et de cybersécurité.
            </motion.p>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              Liens Rapides
            </h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link href={navHref(item)} className="text-sm text-gray-400 transition-colors hover:text-cyan-300">
                    {item.fr}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">Services</h4>
            <ul className="space-y-3">
              {footerServices.map((item) => (
                <li key={item}>
                  <Link href="/#services" className="text-sm text-gray-400 transition-colors hover:text-cyan-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-8 text-center font-mono text-xs text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Pulsar. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <Link href="/confidentialite" className="text-gray-500 transition-colors hover:text-gray-300">
              Confidentialité &amp; cookies
            </Link>
            <span className="text-gray-600">CH-1219 Genève (Aïre)</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
