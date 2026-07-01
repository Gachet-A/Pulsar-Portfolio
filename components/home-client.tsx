"use client"

import { useRef } from "react"
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
  Linkedin,
} from "lucide-react"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import ContactForm from "@/components/contact-form"
import ServiceCard from "@/components/service-card"
import ScrollReveal from "@/components/scroll-reveal"
import ParallaxSection from "@/components/parallax-section"
import TechBackground from "@/components/tech-background"
import CountUp from "@/components/count-up"
import { faqs } from "@/lib/faqs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export interface FeaturedPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  cover: string
  coverAlt: string
  readingMinutes: number
}

const marqueeItems = [
  "Solutions IA",
  "Cybersécurité",
  "Infrastructure Cloud",
  "Conseil IT",
  "Développement Logiciel",
  "Support réactif",
]

const services = [
  {
    title: "Solutions IA",
    description:
      "Implémentation d'IA personnalisée pour automatiser les processus et obtenir des insights à partir de vos données.",
    icon: <Code className="h-6 w-6" />,
    details:
      "Nous concevons et déployons des solutions d'intelligence artificielle sur mesure pour votre PME. De l'automatisation des tâches répétitives à l'analyse prédictive, nous transformons vos données en véritable avantage concurrentiel — sans complexité inutile.",
    features: [
      "Automatisation des processus métier répétitifs",
      "Assistants et chatbots intelligents",
      "Analyse prédictive et tableaux de bord",
      "Intégration à vos outils existants (Microsoft 365, ERP)",
    ],
  },
  {
    title: "Cybersécurité",
    description: "Audits de sécurité complets, détection des menaces et systèmes de protection.",
    icon: <Shield className="h-6 w-6" />,
    details:
      "Protégez votre entreprise contre les menaces actuelles. Nous évaluons votre exposition, déployons des défenses multicouches et formons vos collaborateurs afin de réduire durablement votre surface d'attaque.",
    features: [
      "Audit de sécurité et tests d'intrusion",
      "Protection des postes et serveurs (EDR)",
      "Sécurisation de la messagerie et anti-phishing",
      "Sensibilisation et formation des équipes",
    ],
  },
  {
    title: "Infrastructure Cloud",
    description: "Solutions cloud sécurisées et évolutives conçues pour les besoins de votre entreprise.",
    icon: <Server className="h-6 w-6" />,
    details:
      "Migrez vers le cloud en toute confiance. Nous concevons des architectures évolutives, sécurisées et maîtrisées côté coûts, avec un hébergement en Suisse lorsque vos exigences de conformité le demandent.",
    features: [
      "Migration vers Microsoft Azure et Microsoft 365",
      "Sauvegarde et plan de reprise d'activité (PRA)",
      "Hébergement souverain en Suisse",
      "Optimisation continue des coûts cloud",
    ],
  },
  {
    title: "Conseil IT",
    description: "Planification technologique stratégique et accompagnement dans la transformation digitale.",
    icon: <Users className="h-6 w-6" />,
    details:
      "Un accompagnement stratégique pour aligner votre informatique sur vos objectifs d'affaires. Nous établissons une feuille de route claire et pilotons votre transformation digitale, à votre rythme.",
    features: [
      "Audit de l'existant et feuille de route IT",
      "Budgétisation et planification technologique",
      "Gestion de projets et des fournisseurs",
      "Direction informatique externalisée (vCIO)",
    ],
  },
  {
    title: "Développement Logiciel",
    description: "Solutions logicielles personnalisées conçues avec sécurité et évolutivité.",
    icon: <Code className="h-6 w-6" />,
    details:
      "Des applications sur mesure pensées pour votre métier. Nous développons des solutions sécurisées, maintenables et évolutives, du portail web aux intégrations internes les plus exigeantes.",
    features: [
      "Applications web et portails métier",
      "Intégrations et API sur mesure",
      "Sécurité intégrée dès la conception",
      "Maintenance et évolutions continues",
    ],
  },
  {
    title: "Support réactif",
    description: "Support technique et surveillance réactive de vos systèmes.",
    icon: <CheckCircle className="h-6 w-6" />,
    details:
      "Une équipe de proximité disponible jour et nuit. Nous surveillons vos systèmes en continu et intervenons rapidement, à distance ou sur site dans la région genevoise.",
    features: [
      "Supervision proactive de vos systèmes",
      "Helpdesk réactif (téléphone et email)",
      "Interventions sur site à Genève et alentours",
      "Temps de réponse garantis par SLA",
    ],
  },
]

const approcheSteps = [
  {
    title: "Écoute & Audit",
    desc: "Nous analysons votre infrastructure, vos usages et vos objectifs pour identifier les vraies priorités.",
  },
  {
    title: "Conception",
    desc: "Nous élaborons une solution sur mesure, sécurisée et pensée pour votre budget.",
  },
  {
    title: "Déploiement",
    desc: "Nous mettons en œuvre la solution avec un minimum d'interruption pour vos équipes.",
  },
  {
    title: "Support & Suivi",
    desc: "Nous assurons un accompagnement continu et une supervision proactive de vos systèmes.",
  },
]

const whyPulsar = [
  {
    image: "https://images.unsplash.com/photo-1633022326182-1b36700bc49a?auto=format&fit=crop&w=800&q=70",
    alt: "Le Jet d'Eau de Genève",
    title: "Proximité genevoise",
    desc: "Une équipe locale et réactive, qui intervient à distance comme sur site à Genève et alentours.",
  },
  {
    image: "https://images.unsplash.com/photo-1553775282-20af80779df7?auto=format&fit=crop&w=800&q=70",
    alt: "Casque de support et poste de travail",
    title: "Réactivité",
    desc: "Des temps de réponse garantis par SLA et un support réactif.",
  },
  {
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=70",
    alt: "Technicienne travaillant sur du matériel informatique",
    title: "Expertise éprouvée",
    desc: "Plus de 20 ans d'expérience en cybersécurité, cloud et infrastructure informatique.",
  },
  {
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=70",
    alt: "Baie réseau et câblage",
    title: "Données en Suisse",
    desc: "Hébergement souverain et conformité aux exigences suisses de protection des données.",
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
      className={`inline-flex items-baseline gap-3 font-mono text-xl font-medium md:text-2xl ${
        light ? "text-blue-400" : "text-blue-700"
      }`}
    >
      <span>{number}</span>
      {children}
    </h2>
  )
}

export default function HomeClient({ featuredPosts }: { featuredPosts: FeaturedPost[] }) {
  const { scrollYProgress } = useScroll()
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  // Hero scroll parallax
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress: heroProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroTextY = useTransform(heroProgress, [0, 1], [0, 80])
  const heroTextOpacity = useTransform(heroProgress, [0, 0.7], [1, 0])
  const heroBgY = useTransform(heroProgress, [0, 1], [0, 120])
  const heroBgScale = useTransform(heroProgress, [0, 1], [1, 1.12])

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

              <h1 className="font-heading text-3xl font-bold leading-[1.08] tracking-tight text-white sm:text-4xl md:text-6xl lg:text-[4.2rem]">
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
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-900/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 sm:w-auto"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                  />
                  <span className="relative z-10 flex items-center justify-center">
                    Contactez-Nous
                    <Mail className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  </span>
                </Button>
                <button
                  type="button"
                  onClick={handleScrollToAbout}
                  className="group relative flex h-11 w-full rounded-xl bg-gradient-to-r from-blue-500/60 to-cyan-400/60 p-px shadow-lg shadow-blue-950/20 outline-none transition-all duration-300 hover:from-blue-400 hover:to-cyan-300 focus-visible:ring-2 focus-visible:ring-cyan-400/60 sm:inline-flex sm:w-auto"
                >
                  <span className="flex h-full w-full items-center justify-center gap-2 rounded-[11px] bg-blue-950/50 px-7 text-sm font-medium text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-blue-950/20">
                    <span className="font-mono text-xs text-cyan-300 transition-colors group-hover:text-cyan-200">./</span>
                    En Savoir Plus
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                  </span>
                </button>
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
                  <CheckCircle className="h-4 w-4 text-cyan-400" /> Support réactif
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
                <span className="font-mono text-sm font-medium uppercase tracking-[0.2em] text-gray-600">{item}</span>
                <span className="text-[0.6rem] text-cyan-500/40">✦</span>
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
                        className="h-64 w-full object-cover sm:h-80 lg:h-[440px]"
                      />
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-4 -right-2 rounded-2xl border border-blue-900/[0.06] bg-white px-5 py-3 shadow-xl sm:-bottom-6 sm:-right-6 sm:px-6 sm:py-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    >
                      <p className="font-heading text-3xl font-bold text-gradient">
                        <CountUp to={20} suffix="+" /> ans
                      </p>
                      <p className="font-mono text-xs uppercase tracking-wider text-gray-500">d'expertise IT</p>
                    </motion.div>
                  </div>
                </ParallaxSection>
              </ScrollReveal>

              <ScrollReveal direction="left">
                <SectionLabel number="// 01">À Propos</SectionLabel>
                <h3 className="mb-3 mt-5 text-lg font-semibold text-gray-900 sm:text-xl">Notre Mission</h3>
                <p className="mb-8 leading-relaxed text-gray-600">
                  Chez Pulsar, nous nous consacrons à renforcer les entreprises grâce à des solutions technologiques
                  innovantes. Fondée en 2006, notre entreprise est passée d'une petite équipe d'experts en cybersécurité
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
                  details={service.details}
                  features={service.features}
                  icon={service.icon}
                  darkMode
                />
              ))}
            </div>
          </div>
        </section>

        {/* Approach Section */}
        <section id="approche" className="relative overflow-hidden bg-gray-50/80 py-20 md:py-28">
          <div className="absolute inset-0 tech-grid opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/[0.03] to-cyan-800/[0.03]" />

          <div className="container relative z-10 mx-auto px-4">
            <ScrollReveal>
              <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center">
                <SectionLabel number="// 03">Notre Approche</SectionLabel>
                <p className="mt-4 text-gray-600">
                  Une méthode claire et éprouvée, de la première rencontre au support continu, pour des projets
                  maîtrisés de bout en bout.
                </p>
              </div>
            </ScrollReveal>

            <div className="mx-auto max-w-3xl">
              {approcheSteps.map((step, index) => {
                const isLeft = index % 2 === 0
                const isLast = index === approcheSteps.length - 1
                return (
                  <div
                    key={step.title}
                    className="group grid cursor-default grid-cols-[auto_1fr] gap-x-6 md:grid-cols-[1fr_auto_1fr] md:gap-x-12"
                  >
                    {/* Center rail: node + connecting line share one flex column,
                        so the line always runs through the middle of every circle */}
                    <div className="col-start-1 row-start-1 flex flex-col items-center md:col-start-2">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, amount: 0.8 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="relative shrink-0 transition-transform duration-300 ease-out group-hover:scale-110"
                      >
                        {/* Soft glow on hover */}
                        <span className="absolute -inset-2 rounded-full bg-blue-500/30 opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-100" />
                        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-blue-900 font-mono text-lg font-semibold text-white shadow-lg shadow-blue-900/25 ring-4 ring-white/70 transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-blue-900/40">
                          0{index + 1}
                        </span>
                      </motion.div>
                      {!isLast && <div className="w-px flex-1 bg-gradient-to-b from-blue-300 to-cyan-300" />}
                    </div>

                    {/* Content: right of the node on mobile; alternating sides on desktop */}
                    <div
                      className={`col-start-2 row-start-1 pb-14 pt-1.5 md:pb-16 ${
                        isLeft ? "md:col-start-1 md:pr-12 md:text-right" : "md:col-start-3 md:pl-12"
                      }`}
                    >
                      <ScrollReveal direction={isLeft ? "right" : "left"}>
                        <div
                          className={`transition-transform duration-300 ease-out ${
                            isLeft ? "group-hover:translate-x-1.5" : "group-hover:-translate-x-1.5"
                          }`}
                        >
                          <p className="label-mono mb-2 text-[0.7rem] text-blue-500/80 transition-colors duration-300 group-hover:text-blue-600">
                            Étape 0{index + 1}
                          </p>
                          <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-blue-700">
                            {step.title}
                          </h3>
                          <p className="leading-relaxed text-gray-600">{step.desc}</p>
                        </div>
                      </ScrollReveal>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Why Pulsar Section */}
        <section id="pourquoi" className="relative overflow-hidden py-20 md:py-28">
          <div className="absolute inset-0 tech-grid opacity-40" />

          <div className="container relative z-10 mx-auto px-4">
            <ScrollReveal>
              <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center">
                <SectionLabel number="// 04">Pourquoi Pulsar</SectionLabel>
                <p className="mt-4 text-gray-600">
                  Un partenaire IT de proximité, engagé sur la durée et à vos côtés à chaque étape.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {whyPulsar.map((item, index) => (
                <ScrollReveal key={item.title} delay={index * 0.08}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="surface-card group flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-blue-300/60 hover:shadow-[0_1px_3px_rgba(15,23,42,0.04),0_24px_48px_-16px_rgba(30,64,175,0.25)]"
                  >
                    {/* Top image */}
                    <div className="relative h-40 w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.12]"
                      />
                      {/* Blue duotone filter — lightens on hover so the photo comes alive */}
                      <div className="absolute inset-0 bg-blue-800/55 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-50" />
                      {/* Depth gradient for legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-900/20 to-transparent" />
                      {/* Cyan sheen on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="label-mono absolute bottom-3 left-4 text-[0.6rem] text-white/90">
                        0{index + 1}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="mb-2 font-semibold tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-blue-700">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-gray-600">{item.desc}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Blog / Featured Articles Section */}
        {featuredPosts.length > 0 && (
          <section id="blog" className="relative overflow-hidden bg-blue-950 py-20 md:py-28">
            <div className="absolute inset-0 tech-gradient opacity-90" />
            <div className="dot-grid absolute inset-0 opacity-40" />
            <div className="absolute right-0 top-1/4 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute bottom-1/4 left-0 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

            <div className="container relative z-10 mx-auto px-4">
              <ScrollReveal>
                <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center">
                  <SectionLabel number="// 05" light>
                    Ressources &amp; Blog
                  </SectionLabel>
                  <p className="mt-4 text-blue-100/80">
                    Conseils pratiques en infogérance et cybersécurité pour les PME genevoises.
                  </p>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {featuredPosts.map((post, index) => (
                  <ScrollReveal key={post.slug} delay={index * 0.08}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="surface-card group flex h-full flex-col overflow-hidden transition-colors duration-300 hover:border-blue-300/60 hover:shadow-[0_1px_3px_rgba(15,23,42,0.04),0_24px_48px_-16px_rgba(30,64,175,0.25)]"
                    >
                      {post.cover && (
                        <div className="relative h-44 w-full overflow-hidden">
                          <img
                            src={post.cover}
                            alt={post.coverAlt}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-[1.08]"
                          />
                          <div className="absolute inset-0 bg-blue-800/45 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-60" />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-6">
                        <div className="mb-3 flex items-center gap-3 text-xs text-gray-500">
                          <span className="rounded-full bg-blue-50 px-2.5 py-1 font-medium text-blue-700">
                            {post.category}
                          </span>
                          <span>{post.readingMinutes} min</span>
                        </div>
                        <h3 className="mb-2 text-lg font-semibold leading-snug tracking-tight text-gray-900 transition-colors duration-300 group-hover:text-blue-700">
                          {post.title}
                        </h3>
                        <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">{post.description}</p>
                        <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-700">
                          Lire l'article
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-900 shadow-lg shadow-blue-950/30 transition-colors hover:bg-blue-50"
                >
                  Voir tous les articles
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        <section id="faq" className="relative overflow-hidden bg-gray-100 py-20 md:py-28">
          <div className="absolute inset-0 tech-grid opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/[0.04] to-cyan-800/[0.04]" />

          <div className="container relative z-10 mx-auto px-4">
            <ScrollReveal>
              <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center">
                <SectionLabel number="// 06">Questions fréquentes</SectionLabel>
                <p className="mt-4 text-gray-600">
                  Les réponses aux questions que se posent le plus souvent les PME genevoises.
                </p>
              </div>
            </ScrollReveal>

            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <ScrollReveal key={faq.question} delay={index * 0.05}>
                    <AccordionItem
                      value={`faq-${index}`}
                      className="surface-card overflow-hidden border-none px-6"
                    >
                      <AccordionTrigger className="py-5 text-left text-base font-semibold text-gray-900 hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-[15px] leading-relaxed text-gray-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </ScrollReveal>
                ))}
              </Accordion>
            </div>
          </div>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.question,
                  acceptedAnswer: { "@type": "Answer", text: faq.answer },
                })),
              }),
            }}
          />
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative overflow-hidden py-20 md:py-28">
          <div className="hero-glow absolute inset-0" />
          <div className="circuit-bg absolute inset-0" />

          <div className="container relative z-10 mx-auto px-4">
            <ScrollReveal>
              <div className="mx-auto mb-14 flex max-w-2xl flex-col items-center text-center">
                <SectionLabel number="// 07">Contact</SectionLabel>
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
    </div>
  )
}
