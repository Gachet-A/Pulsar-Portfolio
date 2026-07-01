"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { navItems, navHref, type NavItem } from "@/lib/nav"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)

  const menuItems = navItems

  const handleNavigation = (item: NavItem) => {
    setIsOpen(false)
    // In-page section on the homepage: smooth-scroll without navigating.
    if (!item.href && pathname === "/") {
      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
      return
    }
    window.location.href = navHref(item)
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.1,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    closed: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  const colors = ["bg-blue-700", "bg-blue-800", "bg-blue-900", "bg-cyan-600", "bg-teal-600"]

  return (
    <div>
      <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu" className="relative z-50">
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Menu className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-white"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 tech-gradient opacity-10"></div>
              <div className="absolute inset-0 tech-grid"></div>

              {/* Circuit lines */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-blue-900/10 h-px"
                  style={{
                    width: `${Math.random() * 200 + 100}px`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transformOrigin: "left center",
                  }}
                  animate={{
                    scaleX: [1, 1.5, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>

            <div className="container mx-auto px-4 h-full flex flex-col justify-center">
              <div className="flex flex-col items-center space-y-6 py-8">
                {menuItems.map((item, index) => (
                  <motion.div key={item.id} variants={itemVariants} className="w-full" custom={index}>
                    <Button
                      variant="ghost"
                      className="w-full text-2xl sm:text-3xl py-5 sm:py-7 justify-start text-gray-800 hover:text-blue-800 hover:bg-blue-50 transition-all duration-300 transform hover:translate-x-2"
                      onClick={() => handleNavigation(item)}
                    >
                      <span
                        className={`inline-block w-8 h-8 mr-4 rounded-full ${colors[index % colors.length]}`}
                      ></span>
                      {item.fr}
                    </Button>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                className="absolute bottom-0 left-0 right-0 p-8 text-center text-gray-500"
              >
                <p className="text-sm">© {new Date().getFullYear()} Pulsar</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

