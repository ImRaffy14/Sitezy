"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { RotateCcw, RotateCw, ZoomIn, ZoomOut, Crop, X, Check } from "lucide-react"

interface ImageCropperProps {
  image: string
  aspectRatio?: number
  onCropComplete: (croppedImage: string) => void
  onCancel: () => void
  title?: string
}

export function ImageCropper({
  image,
  aspectRatio = 1,
  onCropComplete,
  onCancel,
  title = "Crop Image",
}: ImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    const img = imageRef.current
    if (!canvas || !img || !imageLoaded) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const canvasSize = 300
    canvas.width = canvasSize
    canvas.height = canvasSize

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize, canvasSize)

    // Save context
    ctx.save()

    // Move to center
    ctx.translate(canvasSize / 2, canvasSize / 2)

    // Apply rotation
    ctx.rotate((rotation * Math.PI) / 180)

    // Apply scale and position
    ctx.scale(scale, scale)
    ctx.translate(position.x, position.y)

    // Draw image centered
    ctx.drawImage(img, -img.width / 2, -img.height / 2)

    // Restore context
    ctx.restore()

    // Draw crop overlay
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])

    const cropSize = Math.min(canvasSize * 0.8, canvasSize * 0.8)
    const cropX = (canvasSize - cropSize) / 2
    const cropY = (canvasSize - cropSize) / 2

    ctx.strokeRect(cropX, cropY, cropSize, cropSize / aspectRatio)
  }, [scale, rotation, position, imageLoaded, aspectRatio])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleCrop = () => {
    const canvas = canvasRef.current
    const img = imageRef.current
    if (!canvas || !img) return

    // Create a new canvas for the cropped image
    const cropCanvas = document.createElement("canvas")
    const cropCtx = cropCanvas.getContext("2d")
    if (!cropCtx) return

    const outputSize = 400
    cropCanvas.width = outputSize
    cropCanvas.height = outputSize / aspectRatio

    // Save context
    cropCtx.save()

    // Move to center
    cropCtx.translate(outputSize / 2, outputSize / aspectRatio / 2)

    // Apply rotation
    cropCtx.rotate((rotation * Math.PI) / 180)

    // Apply scale and position
    cropCtx.scale(scale, scale)
    cropCtx.translate(position.x, position.y)

    // Draw image centered
    cropCtx.drawImage(img, -img.width / 2, -img.height / 2)

    // Restore context
    cropCtx.restore()

    // Get the cropped image as data URL
    const croppedImage = cropCanvas.toDataURL("image/jpeg", 0.9)
    onCropComplete(croppedImage)
  }

  const resetTransform = () => {
    setScale(1)
    setRotation(0)
    setPosition({ x: 0, y: 0 })
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-white/10 backdrop-blur-xl border border-gray-700 max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Crop className="w-5 h-5" />
              <span>{title}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancel} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Canvas for cropping */}
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={300}
              height={300}
              className="border border-gray-600 rounded-lg cursor-move bg-gray-800"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            <img
              ref={imageRef}
              src={image || "/placeholder.svg"}
              alt="Crop preview"
              className="hidden"
              onLoad={() => {
                setImageLoaded(true)
              }}
              crossOrigin="anonymous"
            />
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Scale */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300">Zoom</label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setScale(Math.max(0.5, scale - 0.1))}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <ZoomOut className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setScale(Math.min(3, scale + 0.1))}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <ZoomIn className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <Slider
                value={[scale]}
                onValueChange={(value) => setScale(value[0])}
                min={0.5}
                max={3}
                step={0.1}
                className="w-full"
              />
            </div>

            {/* Rotation */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-300">Rotation</label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRotation(rotation - 15)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRotation(rotation + 15)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <RotateCw className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <Slider
                value={[rotation]}
                onValueChange={(value) => setRotation(value[0])}
                min={-180}
                max={180}
                step={15}
                className="w-full"
              />
            </div>

            {/* Reset button */}
            <Button
              variant="outline"
              onClick={resetTransform}
              className="w-full border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Reset
            </Button>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCrop}
              className="flex-1 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Crop & Save
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
