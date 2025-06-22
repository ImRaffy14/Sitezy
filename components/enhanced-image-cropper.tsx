"use client"

import type React from "react"
import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { RotateCcw, RotateCw, ZoomIn, ZoomOut, Crop, X, Check, RefreshCw, Move, Maximize } from "lucide-react"

interface EnhancedImageCropperProps {
  image: string
  aspectRatio?: number
  onCropComplete: (croppedImage: string) => void
  onCancel: () => void
  title?: string
  outputWidth?: number
  outputHeight?: number
}

export function EnhancedImageCropper({
  image,
  aspectRatio = 1,
  onCropComplete,
  onCancel,
  title = "Crop Image",
  outputWidth = 400,
  outputHeight,
}: EnhancedImageCropperProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const [scale, setScale] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 })
  const [cropPreview, setCropPreview] = useState<string | null>(null)

  const finalOutputHeight = outputHeight || outputWidth / aspectRatio

  useEffect(() => {
    if (imageLoaded) {
      drawCanvas()
      generatePreview()
    }
  }, [scale, rotation, position, imageLoaded])

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

    const cropWidth = Math.min(canvasSize * 0.8, canvasSize * 0.8)
    const cropHeight = cropWidth / aspectRatio
    const cropX = (canvasSize - cropWidth) / 2
    const cropY = (canvasSize - cropHeight) / 2

    ctx.strokeRect(cropX, cropY, cropWidth, cropHeight)

    // Draw corner handles
    ctx.fillStyle = "#ffffff"
    ctx.setLineDash([])
    const handleSize = 8
    const corners = [
      [cropX, cropY],
      [cropX + cropWidth, cropY],
      [cropX, cropY + cropHeight],
      [cropX + cropWidth, cropY + cropHeight],
    ]

    corners.forEach(([x, y]) => {
      ctx.fillRect(x - handleSize / 2, y - handleSize / 2, handleSize, handleSize)
    })
  }, [scale, rotation, position, imageLoaded, aspectRatio])

  const generatePreview = useCallback(() => {
    const canvas = canvasRef.current
    const img = imageRef.current
    if (!canvas || !img) return

    // Create a new canvas for the preview
    const previewCanvas = document.createElement("canvas")
    const previewCtx = previewCanvas.getContext("2d")
    if (!previewCtx) return

    const previewSize = 120
    previewCanvas.width = previewSize
    previewCanvas.height = previewSize / aspectRatio

    // Save context
    previewCtx.save()

    // Move to center
    previewCtx.translate(previewSize / 2, previewSize / aspectRatio / 2)

    // Apply rotation
    previewCtx.rotate((rotation * Math.PI) / 180)

    // Apply scale and position
    previewCtx.scale(scale, scale)
    previewCtx.translate(position.x, position.y)

    // Draw image centered
    previewCtx.drawImage(img, -img.width / 2, -img.height / 2)

    // Restore context
    previewCtx.restore()

    setCropPreview(previewCanvas.toDataURL("image/jpeg", 0.9))
  }, [scale, rotation, position, aspectRatio])

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

    cropCanvas.width = outputWidth
    cropCanvas.height = finalOutputHeight

    // Save context
    cropCtx.save()

    // Move to center
    cropCtx.translate(outputWidth / 2, finalOutputHeight / 2)

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

  const fitToFrame = () => {
    if (!imageRef.current) return

    const img = imageRef.current
    const canvasSize = 300
    const cropSize = canvasSize * 0.8

    // Calculate scale to fit image in crop area
    const scaleX = cropSize / img.width
    const scaleY = cropSize / aspectRatio / img.height
    const newScale = Math.min(scaleX, scaleY)

    setScale(newScale)
    setPosition({ x: 0, y: 0 })
    setRotation(0)
  }

  const handleImageLoad = () => {
    const img = imageRef.current
    if (img) {
      setImageDimensions({ width: img.width, height: img.height })
      setImageLoaded(true)
      // Auto-fit image when loaded
      setTimeout(fitToFrame, 100)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="bg-white/10 backdrop-blur-xl border border-gray-700 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Crop className="w-5 h-5" />
              <span>{title}</span>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                {outputWidth} × {Math.round(finalOutputHeight)}px
              </Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancel} className="text-gray-400 hover:text-white">
              <X className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Canvas */}
            <div className="lg:col-span-2 space-y-4">
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={300}
                  height={300}
                  className={`
                    border border-gray-600 rounded-lg bg-gray-800 mx-auto
                    ${isDragging ? "cursor-grabbing" : "cursor-grab"}
                  `}
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
                  onLoad={handleImageLoad}
                  crossOrigin="anonymous"
                />

                {/* Drag instruction */}
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center">
                  <Move className="w-3 h-3 mr-1" />
                  Drag to reposition
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fitToFrame}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <Maximize className="w-3 h-3 mr-1" />
                  Fit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetTransform}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  Reset
                </Button>
              </div>
            </div>

            {/* Controls & Preview */}
            <div className="space-y-6">
              {/* Preview */}
              {cropPreview && (
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-300">Preview</h3>
                  <div className="relative">
                    <img
                      src={cropPreview || "/placeholder.svg"}
                      alt="Crop preview"
                      className="w-full rounded-lg border border-gray-600"
                      style={{ aspectRatio }}
                    />
                    <Badge className="absolute top-2 right-2 bg-green-500/80 text-white border-0 text-xs">
                      {outputWidth}×{Math.round(finalOutputHeight)}
                    </Badge>
                  </div>
                </div>
              )}

              {/* Controls */}
              <div className="space-y-4">
                {/* Scale */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-300">Zoom</label>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setScale(Math.max(0.1, scale - 0.1))}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 h-7 w-7 p-0"
                      >
                        <ZoomOut className="w-3 h-3" />
                      </Button>
                      <span className="text-xs text-gray-400 w-12 text-center">{Math.round(scale * 100)}%</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setScale(Math.min(5, scale + 0.1))}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 h-7 w-7 p-0"
                      >
                        <ZoomIn className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <Slider
                    value={[scale]}
                    onValueChange={(value) => setScale(value[0])}
                    min={0.1}
                    max={5}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                {/* Rotation */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-300">Rotation</label>
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRotation(rotation - 15)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 h-7 w-7 p-0"
                      >
                        <RotateCcw className="w-3 h-3" />
                      </Button>
                      <span className="text-xs text-gray-400 w-12 text-center">{rotation}°</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setRotation(rotation + 15)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 h-7 w-7 p-0"
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

                {/* Image Info */}
                {imageDimensions.width > 0 && (
                  <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Original Image</h4>
                    <div className="text-xs text-gray-400 space-y-1">
                      <div>
                        Size: {imageDimensions.width} × {imageDimensions.height}px
                      </div>
                      <div>Aspect: {(imageDimensions.width / imageDimensions.height).toFixed(2)}:1</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex space-x-3 pt-4 border-t border-gray-700">
            <Button
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCrop}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
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
