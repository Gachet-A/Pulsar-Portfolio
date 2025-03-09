"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Code, Shield, Zap, Mail, Users, Building, CheckCircle, ArrowDown, Server } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import MobileMenu from "@/components/mobile-menu"
import ContactForm from "@/components/contact-form"
import ServiceCard from "@/components/service-card"
import ReferenceCard from "@/components/reference-card"
import ScrollReveal from "@/components/scroll-reveal"
import ParallaxSection from "@/components/parallax-section"
import TechBackground from "@/components/tech-background"

export default function Home() {
  const scrollRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const handleScrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const handleScrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white" ref={scrollRef}>
      <TechBackground />

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-blue-700"
          >
            Pulsar
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {[
              { id: "home", fr: "Accueil" },
              { id: "about", fr: "À Propos" },
              { id: "services", fr: "Services" },
              { id: "references", fr: "Références" },
              { id: "contact", fr: "Contact" },
            ].map((item, index) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                className="text-gray-700 hover:text-blue-700 transition-colors relative group"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item.fr}
                <motion.span
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 group-hover:w-full transition-all duration-300"
                  whileHover={{ width: "100%" }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Mobile Navigation - Only shown on mobile */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <motion.h1
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Sécuriser Votre Avenir{" "}
                  <motion.span
                    className="text-blue-700 inline-block"
                    animate={{
                      color: [
                        "rgb(29, 78, 216)", // blue-700
                        "rgb(30, 64, 175)", // blue-800
                        "rgb(30, 58, 138)", // blue-900
                        "rgb(8, 145, 178)", // cyan-600
                        "rgb(13, 148, 136)", // teal-600
                        "rgb(29, 78, 216)", // back to blue-700
                      ],
                    }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    Numérique
                  </motion.span>
                </motion.h1>
                <motion.p
                  className="text-lg text-gray-600 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Pulsar propose des solutions d'IA de pointe et des services de cybersécurité pour protéger votre
                  entreprise dans un paysage numérique de plus en plus complexe.
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button size="lg" onClick={handleScrollToContact} className="bg-blue-700 hover:bg-blue-800 group">
                    Contactez-Nous{" "}
                    <motion.div
                      className="ml-2 inline-flex"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <Mail className="h-4 w-4" />
                    </motion.div>
                  </Button>
                  <Button size="lg" variant="outline" onClick={handleScrollToAbout} className="border-blue-700 text-blue-700 hover:bg-blue-50 group">
                    En Savoir Plus{" "}
                    <motion.div
                      className="ml-2 inline-flex"
                      animate={{ y: [0, 3, 0] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>
              <div className="md:w-1/2">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg blur opacity-30 animate-pulse"></div>
                  <motion.div
                    className="relative bg-white rounded-lg overflow-hidden shadow-xl"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="IA et Visualisation de Cybersécurité"
                      className="w-full h-auto"
                    />

                    {/* Floating elements */}
                    <motion.div
                      className="absolute top-10 right-10 w-16 h-16 bg-blue-800 rounded-full opacity-20"
                      animate={{ y: [0, -15, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    />
                    <motion.div
                      className="absolute bottom-10 left-10 w-20 h-20 bg-teal-600 rounded-full opacity-20"
                      animate={{ y: [0, 15, 0] }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-gray-50 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800 rounded-full blur-3xl -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900 rounded-full blur-3xl -ml-48 -mb-48"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">À Propos de Pulsar</h2>
                <div className="w-20 h-1 bg-blue-700 mx-auto"></div>
              </div>
            </ScrollReveal>

            <div className="flex flex-col md:flex-row items-center">
              <ScrollReveal direction="right" className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
                <ParallaxSection speed={-0.2}>
                  <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                    <img
                      src="/placeholder.svg?height=400&width=600"
                      alt="Équipe Pulsar"
                      className="rounded-lg shadow-lg"
                    />
                  </motion.div>
                </ParallaxSection>
              </ScrollReveal>

              <ScrollReveal direction="left" className="md:w-1/2">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Notre Mission</h3>
                <p className="text-gray-600 mb-6">
                  Chez Pulsar, nous nous consacrons à renforcer les entreprises grâce à des solutions technologiques
                  innovantes. Fondée en 2007, notre entreprise est passée d'une petite équipe d'experts en cybersécurité
                  à un fournisseur complet de solutions informatiques spécialisé dans l'intégration de l'IA et les
                  protocoles de sécurité avancés.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <motion.div className="flex items-start" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                      <Shield className="h-5 w-5 text-blue-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Sécurité d'Abord</h4>
                      <p className="text-sm text-gray-600">Nous priorisons la protection de vos données</p>
                    </div>
                  </motion.div>
                  <motion.div className="flex items-start" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <div className="mr-4 mt-1 bg-cyan-100 p-2 rounded-full">
                      <Zap className="h-5 w-5 text-cyan-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Solutions Innovantes</h4>
                      <p className="text-sm text-gray-600">Intégration de technologies de pointe</p>
                    </div>
                  </motion.div>
                  <motion.div className="flex items-start" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <div className="mr-4 mt-1 bg-teal-100 p-2 rounded-full">
                      <Users className="h-5 w-5 text-teal-700" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Équipe d'Experts</h4>
                      <p className="text-sm text-gray-600">Professionnels certifiés</p>
                    </div>
                  </motion.div>
                  <motion.div className="flex items-start" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                    <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                      <Building className="h-5 w-5 text-blue-800" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Portée Mondiale</h4>
                      <p className="text-sm text-gray-600">Service aux clients du monde entier</p>
                    </div>
                  </motion.div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 relative">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/4 left-0 w-64 h-64 bg-blue-800 rounded-full opacity-5"
              style={{ x: -100 }}
            />
            <motion.div
              className="absolute bottom-1/4 right-0 w-64 h-64 bg-blue-900 rounded-full opacity-5"
              style={{ x: 100 }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Services</h2>
                <div className="w-20 h-1 tech-gradient mx-auto mb-6"></div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Nous proposons des solutions informatiques complètes adaptées aux besoins de votre entreprise, avec un
                  accent sur la cybersécurité et l'intégration de l'IA.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ScrollReveal delay={0.1}>
                <ServiceCard
                  title="Solutions IA"
                  description="Implémentation d'IA personnalisée pour automatiser les processus et obtenir des insights à partir de vos données."
                  icon={<Code />}
                />
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <ServiceCard
                  title="Cybersécurité"
                  description="Audits de sécurité complets, détection des menaces et systèmes de protection."
                  icon={<Shield />}
                />
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <ServiceCard
                  title="Infrastructure Cloud"
                  description="Solutions cloud sécurisées et évolutives conçues pour les besoins de votre entreprise."
                  icon={<Server />}
                />
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <ServiceCard
                  title="Conseil IT"
                  description="Planification technologique stratégique et accompagnement dans la transformation digitale."
                  icon={<Users />}
                />
              </ScrollReveal>
              <ScrollReveal delay={0.5}>
                <ServiceCard
                  title="Développement Logiciel"
                  description="Solutions logicielles personnalisées conçues avec sécurité et évolutivité."
                  icon={<Code />}
                />
              </ScrollReveal>
              <ScrollReveal delay={0.6}>
                <ServiceCard
                  title="Support 24/7"
                  description="Support technique et surveillance de vos systèmes 24h/24 et 7j/7."
                  icon={<CheckCircle />}
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* References Section */}
        <section id="references" className="py-16 bg-gray-50 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900/5 to-blue-700/5"></div>
            <div className="absolute inset-0 tech-grid"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Références</h2>
                <div className="w-20 h-1 bg-blue-700 mx-auto mb-6"></div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Nous avons eu le privilège de travailler avec des entreprises de premier plan dans divers secteurs.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  company: "TechCorp Inc.",
                  project: "Système de Sécurité Alimenté par l'IA",
                  testimonial:
                    "Pulsar a transformé notre infrastructure de sécurité avec leurs solutions d'IA innovantes.",
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
                  testimonial:
                    "La solution d'IA développée par Pulsar a réduit nos incidents de fraude de 87% au premier trimestre.",
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
              ].map((reference, index) => (
                <ScrollReveal key={reference.company} delay={index * 0.1}>
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
        <section id="contact" className="py-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800 rounded-full blur-3xl opacity-5 -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-700 rounded-full blur-3xl opacity-5 -ml-48 -mb-48"></div>
            <div className="absolute inset-0 circuit-bg"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contactez-Nous</h2>
                <div className="w-20 h-1 tech-gradient mx-auto mb-6"></div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Prêt à sécuriser votre avenir numérique ? Entrez en contact avec notre équipe d'experts.
                </p>
              </div>
            </ScrollReveal>

            <div className="flex flex-col lg:flex-row gap-12">
              <ScrollReveal direction="right" className="lg:w-1/2">
                <ContactForm />
              </ScrollReveal>

              <ScrollReveal direction="left" className="lg:w-1/2">
                <div className="bg-gray-50 p-8 rounded-lg h-full">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact</h3>
                  <div className="space-y-6">
                    <motion.div className="flex items-start" whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                      <div className="mr-4 mt-1 bg-blue-100 p-2 rounded-full">
                        <Building className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <p className="text-gray-600">CH-1219, Genève (Aïre)</p>
                        <p className="text-gray-600">info@pulsarvoip.ch</p>
                        <p className="text-gray-600">+41 22 510 20 19</p>
                      </div>
                    </motion.div>
                    <div className="mt-8">
                      <h4 className="font-semibold text-gray-900 mb-4">Suivez-Nous</h4>
                      <div className="flex">
                        <motion.a
                          href="#"
                          className="bg-white p-3 rounded-full shadow-sm hover:shadow-md transition-shadow"
                          whileHover={{ y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <span className="sr-only">LinkedIn</span>
                          <div className="w-6 h-6 rounded-full bg-blue-700 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="white"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-linkedin"
                            >
                              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                              <rect width="4" height="12" x="2" y="9"></rect>
                              <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                          </div>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 tech-gradient"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <motion.h3
                className="text-xl font-bold mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Pulsar
              </motion.h3>
              <motion.p
                className="text-gray-400"
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
                className="text-lg font-semibold mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Liens Rapides
              </motion.h4>
              <ul className="space-y-2">
                {[
                  { id: "home", fr: "Accueil" },
                  { id: "about", fr: "À Propos" },
                  { id: "services", fr: "Services" },
                  { id: "references", fr: "Références" },
                  { id: "contact", fr: "Contact" },
                ].map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <a href={`#${item.id}`} className="text-gray-400 hover:text-white transition-colors">
                      {item.fr}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <motion.h4
                className="text-lg font-semibold mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Services
              </motion.h4>
              <ul className="space-y-2">
                {["Solutions IA", "Cybersécurité", "Infrastructure Cloud", "Conseil IT", "Développement Logiciel"].map(
                  (item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    >
                      <a href="#services" className="text-gray-400 hover:text-white transition-colors">
                        {item}
                      </a>
                    </motion.li>
                  ),
                )}
              </ul>
            </div>
          </div>
          <motion.div
            className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <p>© {new Date().getFullYear()} Pulsar. Tous droits réservés.</p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}

