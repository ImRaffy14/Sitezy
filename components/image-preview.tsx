"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Edit3 } from "lucide-react"
import { formatFileSize } from "@/utils/image-utils"

interface ImagePreviewProps {
  src: string
  alt: string
  type: "profile" | "banner"
  onEdit?: () => void
  onRemove?: () => void
  fileSize?: number
  dimensions?: { width: number; height: number }
  className?: string
}

export function ImagePreview({
  src,
  alt,
  type,
  onEdit,
  onRemove,
  fileSize,
  dimensions,
  className = "",
}: ImagePreviewProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
    setImageError(false)
  }

  const handleImageError = () => {
    setImageError(true)
    setImageLoaded(false)
  }

  return (
    <div className={`relative group ${className}`}>
      <div
        className={`
          relative overflow-hidden rounded-xl border-2 border-gray-600 bg-gray-800
          ${type === "banner" ? "aspect-[3/1]" : "aspect-square"}
          ${imageLoaded ? "border-green-500/50" : ""}
          ${imageError ? "border-red-500/50" : ""}
        `}
      >
        {/* Image */}
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />

        {/* Loading overlay */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error overlay */}
        {imageError && (
          <div className="absolute inset-0 bg-red-900/50 flex items-center justify-center">
            <div className="text-center text-red-300">
              <X className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Failed to load</p>
            </div>
          </div>
        )}

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex space-x-2">
            {onEdit && (
              <Button
                variant="secondary"
                size="sm"
                onClick={onEdit}
                className="bg-white/20 hover:bg-white/30 text-white border-white/20"
              >
                <Edit3 className="w-4 h-4 mr-1" />
                Edit
              </Button>
            )}
            {onRemove && (
              <Button
                variant="destructive"
                size="sm"
                onClick={onRemove}
                className="bg-red-500/80 hover:bg-red-500 text-white"
              >
                <X className="w-4 h-4 mr-1" />
                Remove
              </Button>
            )}
          </div>
        </div>

        {/* Status badge */}
        {imageLoaded && <Badge className="absolute top-2 right-2 bg-green-500/80 text-white border-0">✓ Ready</Badge>}
      </div>

      {/* Image info */}
      {(fileSize || dimensions) && imageLoaded && (
        <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
          {dimensions && (
            <span>
              {dimensions.width} × {dimensions.height}px
            </span>
          )}
          {fileSize && <span>{formatFileSize(fileSize)}</span>}
        </div>
      )}
    </div>
  )
}
