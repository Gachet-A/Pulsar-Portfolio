"use client"

import { useEffect, useRef } from "react"

interface TechBackgroundProps {
  className?: string
}

export default function TechBackground({ className = "" }: TechBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create curved lines
    class CurvedLine {
      points: { x: number; y: number }[]
      color: string
      speed: number
      amplitude: number
      phase: number

      constructor() {
        this.points = []
        // Generate points along the x-axis
        const numPoints = Math.floor(Math.random() * 5) + 3 // 3-7 points
        for (let i = 0; i < numPoints; i++) {
          this.points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
          })
        }

        // Sort points by x coordinate for smoother curves
        this.points.sort((a, b) => a.x - b.x)

        // Tech-themed colors - shades of blue
        const colors = [
          "rgba(10, 35, 66, 0.4)", // Dark navy
          "rgba(14, 67, 119, 0.4)", // Dark blue
          "rgba(18, 106, 143, 0.4)", // Teal blue
          "rgba(12, 66, 113, 0.4)", // Medium blue
        ]

        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.speed = Math.random() * 0.5 + 0.1 // Animation speed
        this.amplitude = Math.random() * 20 + 10 // Wave amplitude
        this.phase = Math.random() * Math.PI * 2 // Starting phase
      }

      update() {
        // Animate the phase to create movement
        this.phase += this.speed * 0.01
        if (this.phase > Math.PI * 2) {
          this.phase = 0
        }

        // Move points slightly for animation
        for (let i = 0; i < this.points.length; i++) {
          // Only move the y-coordinate in a sin wave
          const originalY = this.points[i].y
          this.points[i].y = originalY + Math.sin(this.phase + i) * this.amplitude
        }
      }

      draw() {
        if (!ctx) return

        ctx.strokeStyle = this.color
        ctx.lineWidth = Math.random() * 1.5 + 0.5

        // Draw curved line through points
        ctx.beginPath()
        ctx.moveTo(this.points[0].x, this.points[0].y)

        for (let i = 1; i < this.points.length - 1; i++) {
          // Use quadratic curves for smooth lines
          const xc = (this.points[i].x + this.points[i + 1].x) / 2
          const yc = (this.points[i].y + this.points[i + 1].y) / 2
          ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc)
        }

        // Draw the last segment
        if (this.points.length > 1) {
          const lastPoint = this.points[this.points.length - 1]
          ctx.lineTo(lastPoint.x, lastPoint.y)
        }

        ctx.stroke()
      }

      // Reset position if off-screen
      reset() {
        // Check if line is completely off-screen
        const allOffScreen = this.points.every(
          (point) => point.x < 0 || point.x > canvas.width || point.y < 0 || point.y > canvas.height,
        )

        if (allOffScreen) {
          // Generate new points
          this.points = []
          const numPoints = Math.floor(Math.random() * 5) + 3
          for (let i = 0; i < numPoints; i++) {
            this.points.push({
              x: Math.random() * canvas.width,
              y: Math.random() * canvas.height,
            })
          }
          this.points.sort((a, b) => a.x - b.x)
        }
      }
    }

    // Create circuit nodes
    class CircuitNode {
      x: number
      y: number
      size: number
      color: string
      pulseSpeed: number
      pulsePhase: number

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1

        const colors = [
          "rgba(14, 67, 119, 0.7)", // Dark blue
          "rgba(18, 106, 143, 0.7)", // Teal blue
          "rgba(12, 66, 113, 0.7)", // Medium blue
        ]

        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.pulseSpeed = Math.random() * 0.05 + 0.01
        this.pulsePhase = Math.random() * Math.PI * 2
      }

      update() {
        this.pulsePhase += this.pulseSpeed
        if (this.pulsePhase > Math.PI * 2) {
          this.pulsePhase = 0
        }
      }

      draw() {
        if (!ctx) return

        // Pulse effect
        const pulseSize = this.size + Math.sin(this.pulsePhase) * 0.5

        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, pulseSize, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create lines and nodes
    const curvedLines: CurvedLine[] = []
    const numberOfLines = Math.min(15, Math.floor((canvas.width * canvas.height) / 50000))
    for (let i = 0; i < numberOfLines; i++) {
      curvedLines.push(new CurvedLine())
    }

    const circuitNodes: CircuitNode[] = []
    const numberOfNodes = Math.min(40, Math.floor((canvas.width * canvas.height) / 25000))
    for (let i = 0; i < numberOfNodes; i++) {
      circuitNodes.push(new CircuitNode())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw tech grid background
      drawTechGrid()

      // Update and draw curved lines
      for (let i = 0; i < curvedLines.length; i++) {
        curvedLines[i].update()
        curvedLines[i].draw()
        curvedLines[i].reset()
      }

      // Update and draw circuit nodes
      for (let i = 0; i < circuitNodes.length; i++) {
        circuitNodes[i].update()
        circuitNodes[i].draw()
      }

      requestAnimationFrame(animate)
    }

    // Draw tech grid
    const drawTechGrid = () => {
      if (!ctx) return

      const gridSize = 40

      ctx.strokeStyle = "rgba(30, 64, 175, 0.05)" // Light blue color
      ctx.lineWidth = 1

      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className={`fixed top-0 left-0 w-full h-full -z-10 opacity-25 ${className}`} />
}

