"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Upload, X, FileImage } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DragDropUploadProps {
  onFileSelect: (file: File) => void
  accept?: string
  maxSize?: number // in MB
  className?: string
  children?: React.ReactNode
  type?: "profile" | "banner"
}

export function DragDropUpload({
  onFileSelect,
  accept = "image/*",
  maxSize = 5,
  className = "",
  children,
  type = "profile",
}: DragDropUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!file.type.startsWith("image/")) {
      return "Please select an image file"
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxSize) {
      return `File size must be less than ${maxSize}MB`
    }

    return null
  }

  const handleFile = (file: File) => {
    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      setTimeout(() => setError(null), 3000)
      return
    }

    setError(null)
    onFileSelect(file)
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFile(files[0])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFile(files[0])
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          relative border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer
          ${isDragOver ? "border-blue-400 bg-blue-400/10 scale-105" : "border-gray-600 hover:border-gray-500"}
          ${error ? "border-red-400 bg-red-400/10" : ""}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        {children || (
          <div
            className={`flex flex-col items-center justify-center p-8 text-center ${
              type === "banner" ? "h-32 sm:h-40" : "h-32"
            }`}
          >
            <div
              className={`
              w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-all duration-300
              ${isDragOver ? "bg-blue-500 scale-110" : "bg-gray-700"}
            `}
            >
              {isDragOver ? <FileImage className="w-6 h-6 text-white" /> : <Upload className="w-6 h-6 text-gray-400" />}
            </div>
            <p className={`font-medium mb-2 transition-colors ${isDragOver ? "text-blue-400" : "text-gray-300"}`}>
              {isDragOver ? "Drop your image here" : `Upload ${type} image`}
            </p>
            <p className="text-sm text-gray-400">Drag & drop or click to browse</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to {maxSize}MB</p>
          </div>
        )}

        {/* Drag overlay */}
        {isDragOver && (
          <div className="absolute inset-0 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <div className="text-blue-400 text-center">
              <FileImage className="w-8 h-8 mx-auto mb-2" />
              <p className="font-medium">Drop to upload</p>
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-red-400 text-sm">{error}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-300 h-auto p-1"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept={accept} onChange={handleFileInput} className="hidden" />
    </div>
  )
}
