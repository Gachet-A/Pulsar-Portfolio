"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  ChevronDown,
  Code,
  Shield,
  Zap,
  Mail,
  Users,
  Building,
  CheckCircle,
  Server,
  ArrowRight,
  MapPin,
  Phone,
  Terminal,
  Linkedin,
} from "lucide-react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import MobileMenu from "@/components/mobile-menu"
import ContactForm from "@/components/contact-form"
import ServiceCard from "@/components/service-card"
import ReferenceCard from "@/components/reference-card"
import ScrollReveal from "@/components/scroll-reveal"
import ParallaxSection from "@/components/parallax-section"
import TechBackground from "@/components/tech-background"
import CountUp from "@/components/count-up"

const navItems = [
  { id: "home", fr: "Accueil" },
  { id: "about", fr: "À Propos" },
  { id: "services", fr: "Services" },
  { id: "references", fr: "Références" },
  { id: "contact", fr: "Contact" },
]

const marqueeItems = [
  "Solutions IA",
  "Cybersécurité",
  "Infrastructure Cloud",
  "Conseil IT",
  "Développement Logiciel",
  "Support 24/7",
]

const services = [
  {
    title: "Solutions IA",
    description:
      "Implémentation d'IA personnalisée pour automatiser les processus et obtenir des insights à partir de vos données.",
    icon: <Code className="h-6 w-6" />,
  },
  {
    title: "Cybersécurité",
    description: "Audits de sécurité complets, détection des menaces et systèmes de protection.",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    title: "Infrastructure Cloud",
    description: "Solutions cloud sécurisées et évolutives conçues pour les besoins de votre entreprise.",
    icon: <Server className="h-6 w-6" />,
  },
  {
    title: "Conseil IT",
    description: "Planification technologique stratégique et accompagnement dans la transformation digitale.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Développement Logiciel",
    description: "Solutions logicielles personnalisées conçues avec sécurité et évolutivité.",
    icon: <Code className="h-6 w-6" />,
  },
  {
    title: "Support 24/7",
    description: "Support technique et surveillance de vos systèmes 24h/24 et 7j/7.",
    icon: <CheckCircle className="h-6 w-6" />,
  },
]

const references = [
  {
    company: "TechCorp Inc.",
    project: "Système de Sécurité Alimenté par l'IA",
    testimonial: "Pulsar a transformé notre infrastructure de sécurité avec leurs solutions d'IA innovantes.",
  },
  {
    company: "Global Finance",
    project: "Migration Cloud Sécurisée",
    testimonial:
      "L'équipe de Pulsar a assuré la protection de nos données financières sensibles tout au long de notre transition vers le cloud.",
  },
  {
    company: "HealthTech Solutions",
    project: "Systèmes Conformes RGPD",
    testimonial:
      "L'expertise de Pulsar dans les réglementations de sécurité des soins de santé a été inestimable pour nos besoins de conformité.",
  },
  {
    company: "E-commerce Géant",
    project: "Système de Détection de Fraude",
    testimonial: "La solution d'IA développée par Pulsar a réduit nos incidents de fraude de 87% au premier trimestre.",
  },
  {
    company: "Agence Gouvernementale",
    project: "Protection des Infrastructures Critiques",
    testimonial:
      "Les protocoles de cybersécurité de Pulsar dépassent nos exigences strictes pour les systèmes de sécurité nationale.",
  },
  {
    company: "Institution Éducative",
    project: "Plateforme d'Apprentissage Sécurisée",
    testimonial:
      "Les données de nos étudiants et de notre corps enseignant n'ont jamais été aussi sécurisées grâce à l'approche globale de Pulsar.",
  },
]

const aboutPoints = [
  { icon: <Shield className="h-5 w-5" />, title: "Sécurité d'Abord", desc: "Nous priorisons la protection de vos données" },
  { icon: <Zap className="h-5 w-5" />, title: "Solutions Innovantes", desc: "Intégration de technologies de pointe" },
  { icon: <Users className="h-5 w-5" />, title: "Équipe d'Experts", desc: "Professionnels certifiés" },
  { icon: <Building className="h-5 w-5" />, title: "Portée Mondiale", desc: "Service aux clients du monde entier" },
]

function SectionLabel({ number, children, light = false }: { number: string; children: string; light?: boolean }) {
  return (
    <h2
      className={`inline-flex items-baseline gap-3 font-heading text-4xl font-bold tracking-tight md:text-5xl ${
        light ? "text-white" : "text-gray-900"
      }`}
    >
      <span className={`font-mono text-lg font-medium md:text-xl ${light ? "text-cyan-300" : "text-blue-700"}`}>
        {number}
      </span>
      {children}
    </h2>
  )
}

export default function Home() {
  const { scrollYProgress } = useScroll()
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  const [scrolled, setScrolled] = useState(false)

  // Hero scroll parallax
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroTextY = useTransform(heroProgress, [0, 1], [0, 80])
  const heroTextOpacity = useTransform(heroProgress, [0, 0.7], [1, 0])
  const heroBgY = useTransform(heroProgress, [0, 1], [0, 120])
  const heroBgScale = useTransform(heroProgress, [0, 1], [1, 1.12])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleScrollToAbout = () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  const handleScrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })

  return (
    <div className="min-h-screen bg-white">
      <TechBackground />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-gradient-to-r from-blue-700 via-cyan-500 to-teal-500"
        style={{ scaleX: progressScaleX }}
      />

      {/* Navigation */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "border-b border-blue-900/[0.06] bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <motion.a
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="group flex items-center gap-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-700 to-blue-900 text-white shadow-sm transition-transform duration-300 group-hover:rotate-12">
              <Terminal className="h-5 w-5" />
            </span>
            <span
              className={`font-heading text-xl font-bold tracking-tight transition-colors ${
                scrolled ? "text-blue-900" : "text-white"
              }`}
            >
              Pulsar
            </span>
          </motion.a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className={`group relative text-sm font-medium transition-colors ${
                  scrolled ? "text-gray-600 hover:text-blue-800" : "text-white/85 hover:text-white"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <span
                  className={`mr-1 font-mono text-[0.7rem] transition-colors ${
                    scrolled ? "text-blue-400" : "text-cyan-300/80"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.fr}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-gradient-to-r from-blue-700 to-cyan-500 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              onClick={handleScrollToContact}
              className={`group transition-all ${
                scrolled
                  ? "bg-blue-800 text-white shadow-sm hover:bg-blue-900 hover:shadow-md"
                  : "bg-white text-blue-900 shadow-md hover:bg-blue-50"
              }`}
            >
              Contactez-Nous
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className={`transition-colors md:hidden ${scrolled ? "text-gray-900" : "text-white"}`}>
            <MobileMenu />
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="home"
          ref={heroRef}
          className="relative flex h-[100svh] items-center overflow-hidden pt-24"
        >
          {/* Background image with scroll parallax */}
          <motion.div style={{ y: heroBgY, scale: heroBgScale }} className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2000&q=80"
              alt="Infrastructure réseau et cybersécurité Pulsar"
              className="h-full w-full object-cover"
            />
          </motion.div>
          {/* Overlays for legibility + brand tint */}
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-950/95 via-blue-950/80 to-blue-900/55" />
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-blue-950/90 via-transparent to-blue-950/40" />
          <div className="dot-grid absolute inset-0 z-0 opacity-20" />

          <div className="container relative z-10 mx-auto px-4">
            <motion.div style={{ y: heroTextY, opacity: heroTextOpacity }} className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>
                <span className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-cyan-100">
                  Infogérance · Genève · PME
                </span>
              </motion.div>

              <h1 className="font-heading text-4xl font-bold leading-[1.06] tracking-tight text-white md:text-6xl lg:text-[4.2rem]">
                {"Sécuriser Votre Avenir ".split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
                <span className="relative inline-flex items-baseline whitespace-nowrap">
                  <motion.span
                    className="text-gradient-light"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  >
                    Numérique
                  </motion.span>
                  <motion.span
                    aria-hidden
                    className="ml-1.5 inline-block h-[0.78em] w-[0.5ch] translate-y-[0.04em] rounded-[2px] bg-cyan-400"
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{
                      duration: 1.1,
                      times: [0, 0.5, 0.5, 1],
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                </span>
              </h1>

              <motion.p
                className="mt-7 max-w-xl text-lg leading-relaxed text-blue-100/90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                Pulsar propose des solutions d'IA de pointe et des services de cybersécurité pour protéger votre
                entreprise dans un paysage numérique de plus en plus complexe.
              </motion.p>

              <motion.div
                className="mt-8 flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 }}
              >
                <Button
                  size="lg"
                  onClick={handleScrollToContact}
                  className="group bg-white text-blue-900 shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
                >
                  Contactez-Nous
                  <Mail className="ml-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-white/30 bg-white/5 text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10"
                  onClick={handleScrollToAbout}
                >
                  En Savoir Plus
                  <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </Button>
              </motion.div>

              <motion.div
                className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-xs text-blue-100/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-cyan-400" /> Experts certifiés
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-cyan-400" /> Support 24/7
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-cyan-400" /> Proximité genevoise
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll cue */}
          <motion.button
            onClick={handleScrollToAbout}
            aria-label="Défiler vers le bas"
            className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70 transition-colors hover:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.span
              className="flex flex-col items-center gap-1"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em]">Scroll</span>
              <ChevronDown className="h-5 w-5" />
            </motion.span>
          </motion.button>
        </section>

        {/* Expertise marquee */}
        <div className="relative overflow-hidden border-y border-blue-900/[0.06] bg-white/70 py-5 backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />
          <div className="marquee flex w-max items-center gap-10">
            {[...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className="flex items-center gap-10">
                <span className="font-mono text-sm font-semibold uppercase tracking-wider text-gray-900">{item}</span>
                <span className="text-cyan-500/50">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* About Section */}
        <section id="about" className="relative overflow-hidden bg-gray-50/80 py-20 md:py-28">
          <div className="absolute inset-0 opacity-[0.07]">
            <div className="absolute right-0 top-0 -mr-48 -mt-48 h-96 w-96 rounded-full bg-blue-900 blur-3xl" />
            <div className="absolute bottom-0 left-0 -mb-48 -ml-48 h-96 w-96 rounded-full bg-cyan-700 blur-3xl" />
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <ScrollReveal direction="right">
                <ParallaxSection speed={-0.15}>
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-blue-200/50 to-cyan-200/40 blur-xl" />
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4 }}
                      className="relative overflow-hidden rounded-3xl border border-white/60 shadow-xl"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1100&q=80"
                        alt="L'équipe d'experts Pulsar"
                        className="h-[440px] w-full object-cover"
                      />
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-6 -right-4 rounded-2xl border border-blue-900/[0.06] bg-white px-6 py-4 shadow-xl sm:-right-6"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <p className="font-heading text-3xl font-bold text-gradient">
                        <CountUp to={19} suffix="+" /> ans
                      </p>
                      <p className="font-mono text-xs uppercase tracking-wider text-gray-500">d'expertise IT</p>
                    </motion.div>
                  </div>
                </ParallaxSection>
              </ScrollReveal>

              <ScrollReveal direction="left">
                <SectionLabel number="// 01">À Propos</SectionLabel>
                <h3 className="mb-3 mt-5 text-xl font-semibold text-gray-900">Notre Mission</h3>
                <p className="mb-8 leading-relaxed text-gray-600">
                  Chez Pulsar, nous nous consacrons à renforcer les entreprises grâce à des solutions technologiques
                  innovantes. Fondée en 2007, notre entreprise est passée d'une petite équipe d'experts en cybersécurité
                  à un fournisseur complet de solutions informatiques spécialisé dans l'intégration de l'IA et les
                  protocoles de sécurité avancés.
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {aboutPoints.map((item, index) => (
                    <motion.div
                      key={item.title}
                      className="group flex items-start gap-3 rounded-xl border border-transparent p-3 transition-all hover:border-blue-900/[0.06] hover:bg-white hover:shadow-sm"
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700 ring-1 ring-blue-900/5 transition-transform group-hover:-rotate-6 group-hover:scale-110">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="relative overflow-hidden bg-blue-950 py-20 md:py-28">
          <div className="absolute inset-0 tech-gradient opacity-90" />
          <div className="dot-grid absolute inset-0 opacity-40" />
          <div className="absolute left-0 top-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-0 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

          <div className="container relative z-10 mx-auto px-4">
            <ScrollReveal>
              <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center">
                <SectionLabel number="// 02" light>
                  Nos Services
                </SectionLabel>
                <p className="mt-4 text-blue-100/80">
                  Nous proposons des solutions informatiques complètes adaptées aux besoins de votre entreprise, avec un
                  accent sur la cybersécurité et l'intégration de l'IA.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <ServiceCard
                  key={service.title}
                  index={index}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  darkMode
                />
              ))}
            </div>
          </div>
        </section>

        {/* References Section */}
        <section id="references" className="relative overflow-hidden bg-gray-50/80 py-20 md:py-28">
          <div className="absolute inset-0 tech-grid opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/[0.03] to-cyan-800/[0.03]" />

          <div className="container relative z-10 mx-auto px-4">
            <ScrollReveal>
              <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center">
                <SectionLabel number="// 03">Nos Références</SectionLabel>
                <p className="mt-4 text-gray-600">
                  Nous avons eu le privilège de travailler avec des entreprises de premier plan dans divers secteurs.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {references.map((reference, index) => (
                <ScrollReveal key={reference.company} delay={index * 0.08}>
                  <ReferenceCard
                    company={reference.company}
                    project={reference.project}
                    testimonial={reference.testimonial}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative overflow-hidden py-20 md:py-28">
          <div className="hero-glow absolute inset-0" />
          <div className="circuit-bg absolute inset-0" />

          <div className="container relative z-10 mx-auto px-4">
            <ScrollReveal>
              <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center">
                <SectionLabel number="// 04">Contact</SectionLabel>
                <p className="mt-4 text-gray-600">
                  Prêt à sécuriser votre avenir numérique ? Entrez en contact avec notre équipe d'experts.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid items-stretch gap-8 lg:grid-cols-5">
              <ScrollReveal direction="right" className="lg:col-span-3">
                <ContactForm />
              </ScrollReveal>

              <ScrollReveal direction="left" className="lg:col-span-2">
                <div className="surface-card flex h-full flex-col p-8">
                  <h3 className="mb-6 text-2xl font-semibold text-gray-900">Coordonnées</h3>
                  <div className="space-y-5">
                    {[
                      { icon: <Building className="h-5 w-5" />, label: "Pulsar ICT", value: "CH-1219 Genève (Aïre)" },
                      { icon: <Mail className="h-5 w-5" />, label: "Email", value: "info@pulsarvoip.ch" },
                      { icon: <Phone className="h-5 w-5" />, label: "Téléphone", value: "+41 (0) 22 510 20 19" },
                      { icon: <MapPin className="h-5 w-5" />, label: "Région", value: "Genève & alentours" },
                    ].map((item) => (
                      <motion.div
                        key={item.label}
                        className="group flex items-start gap-4"
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700 ring-1 ring-blue-900/5 transition-transform group-hover:scale-110">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.label}</h4>
                          <p className="text-gray-600">{item.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-blue-900/[0.06] pt-6">
                    <h4 className="mb-4 font-semibold text-gray-900">Suivez-Nous</h4>
                    <motion.a
                      href="https://www.linkedin.com/company/pulsar-ict"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-800 text-white shadow-sm transition-all hover:bg-blue-900 hover:shadow-md"
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="sr-only">LinkedIn</span>
                      <Linkedin className="h-5 w-5" />
                    </motion.a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-gray-950 py-14 text-white">
        <div className="absolute inset-0 opacity-[0.08]">
          <div className="tech-gradient absolute inset-0" />
        </div>
        <div className="dot-grid absolute inset-0 opacity-20" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div>
              <motion.div
                className="mb-4 flex items-center gap-2.5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
                  <Terminal className="h-5 w-5" />
                </span>
                <h3 className="font-heading text-xl font-bold">Pulsar</h3>
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
              <motion.h4
                className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gray-400"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Liens Rapides
              </motion.h4>
              <ul className="space-y-3">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                  >
                    <a href={`#${item.id}`} className="text-sm text-gray-400 transition-colors hover:text-cyan-300">
                      {item.fr}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <motion.h4
                className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-gray-400"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Services
              </motion.h4>
              <ul className="space-y-3">
                {["Solutions IA", "Cybersécurité", "Infrastructure Cloud", "Conseil IT", "Développement Logiciel"].map(
                  (item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.08 }}
                    >
                      <a href="#services" className="text-sm text-gray-400 transition-colors hover:text-cyan-300">
                        {item}
                      </a>
                    </motion.li>
                  ),
                )}
              </ul>
            </div>
          </div>

          <motion.div
            className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-8 text-center font-mono text-xs text-gray-500 sm:flex-row"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p>© {new Date().getFullYear()} Pulsar. Tous droits réservés.</p>
            <p className="text-gray-600">CH-1219 Genève (Aïre)</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
