"use client"

import { useEffect, useRef } from "react"

interface QRCodeProps {
  value: string
  size?: number
  className?: string
}

export function QRCode({ value, size = 200, className = "" }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !value) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Simple QR code generation (for demo purposes)
    // In production, you'd use a proper QR code library like qrcode
    const generateQRCode = async () => {
      try {
        // Using QR Server API to generate QR code
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&format=png&margin=10`

        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, size, size)
        }
        img.onerror = () => {
          // Fallback: draw a simple pattern
          drawFallbackQR(ctx, size)
        }
        img.src = qrUrl
      } catch (error) {
        // Fallback: draw a simple pattern
        drawFallbackQR(ctx, size)
      }
    }

    const drawFallbackQR = (ctx: CanvasRenderingContext2D, size: number) => {
      const moduleSize = size / 25
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, size, size)

      ctx.fillStyle = "#FFFFFF"
      ctx.fillRect(moduleSize, moduleSize, size - 2 * moduleSize, size - 2 * moduleSize)

      ctx.fillStyle = "#000000"
      // Draw a simple pattern
      for (let i = 0; i < 25; i++) {
        for (let j = 0; j < 25; j++) {
          if ((i + j) % 3 === 0 || i === 0 || i === 24 || j === 0 || j === 24) {
            ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize)
          }
        }
      }

      // Add center pattern
      const center = Math.floor(25 / 2)
      for (let i = center - 2; i <= center + 2; i++) {
        for (let j = center - 2; j <= center + 2; j++) {
          if (
            i === center - 2 ||
            i === center + 2 ||
            j === center - 2 ||
            j === center + 2 ||
            (i === center && j === center)
          ) {
            ctx.fillRect(i * moduleSize, j * moduleSize, moduleSize, moduleSize)
          }
        }
      }
    }

    generateQRCode()
  }, [value, size])

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={`rounded-lg ${className}`}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  )
}
