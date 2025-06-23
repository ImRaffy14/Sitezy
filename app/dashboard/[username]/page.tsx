"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Globe,
  User,
  Palette,
  QrCode,
  ExternalLink,
  Copy,
  Check,
  LogOut,
  Eye,
  Layout,
  Monitor,
  TrendingUp,
  Briefcase,
  Music,
  ShoppingBag,
  Plus,
  Camera,
  Gamepad2,
  Code,
  Paintbrush,
  GraduationCap,
  Zap,
  Sparkles,
} from "lucide-react"
import { QRCode } from "@/components/qr-code"
import { DragDropUpload } from "@/components/drag-drop-upload"
import { ImagePreview } from "@/components/image-preview"
import { EnhancedImageCropper } from "@/components/enhanced-image-cropper"
import { compressImage } from "@/utils/image-utils"

export default function Dashboard() {
  const [copied, setCopied] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "Alex Johnson",
    title: "",
    bio: "",
    email: "alex@example.com",
    phone: "",
    location: "",
    profilePicture: "",
    bannerImage: "",
    // Professional/Creative
    behance: "",
    dribbble: "",
    github: "",
    medium: "",
    linkedin: "",
    // Creators/Artists/Musicians
    spotify: "",
    soundcloud: "",
    bandcamp: "",
    patreon: "",
    kofi: "",
    // Small Business/Sellers
    shopee: "",
    lazada: "",
    etsy: "",
    facebookPage: "",
    // Social Media
    instagram: "",
    twitter: "",
    tiktok: "",
    youtube: "",
    discord: "",
    twitch: "",
    telegram: "",
    threads: "",
    pinterest: "",
    // Optional Extras
    website: "",
    whatsapp: "",
  })

  const [selectedLayout, setSelectedLayout] = useState("modern")
  const [selectedTheme, setSelectedTheme] = useState("professional")
  const [colorSettings, setColorSettings] = useState({
    primary: "#3b82f6",
    secondary: "#64748b",
    background: "#ffffff",
    text: "#1f2937",
    accent: "#f59e0b",
  })

  const [showCropper, setShowCropper] = useState(false)
  const [cropperImage, setCropperImage] = useState("")
  const [cropperType, setCropperType] = useState<"profile" | "banner">("profile")

  const siteUrl = `https://sitezy.com/site/johndoe`

  const themes = [
    {
      id: "professional",
      name: "Professional",
      description: "Clean and corporate for business professionals",
      icon: Briefcase,
      colors: {
        primary: "#2563eb",
        secondary: "#64748b",
        background: "#ffffff",
        text: "#1e293b",
        accent: "#0ea5e9",
      },
      gradient: "from-blue-600 to-blue-800",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Vibrant and artistic for designers and artists",
      icon: Paintbrush,
      colors: {
        primary: "#7c3aed",
        secondary: "#6b7280",
        background: "#ffffff",
        text: "#1f2937",
        accent: "#f59e0b",
      },
      gradient: "from-purple-600 to-pink-600",
    },
    {
      id: "gamer",
      name: "Gamer/Streamer",
      description: "Neon and dark theme for gamers and streamers",
      icon: Gamepad2,
      colors: {
        primary: "#10b981",
        secondary: "#6b7280",
        background: "#0f172a",
        text: "#f1f5f9",
        accent: "#06ffa5",
      },
      gradient: "from-green-400 to-cyan-400",
    },
    {
      id: "developer",
      name: "Tech/Developer",
      description: "Dark and minimal for developers and tech professionals",
      icon: Code,
      colors: {
        primary: "#6366f1",
        secondary: "#9ca3af",
        background: "#111827",
        text: "#f9fafb",
        accent: "#8b5cf6",
      },
      gradient: "from-indigo-600 to-purple-600",
    },
    {
      id: "influencer",
      name: "Influencer",
      description: "Trendy and social media focused",
      icon: Sparkles,
      colors: {
        primary: "#ec4899",
        secondary: "#6b7280",
        background: "#ffffff",
        text: "#1f2937",
        accent: "#f97316",
      },
      gradient: "from-pink-500 to-orange-500",
    },
    {
      id: "business",
      name: "Entrepreneur",
      description: "Modern and professional for business owners",
      icon: Zap,
      colors: {
        primary: "#059669",
        secondary: "#6b7280",
        background: "#ffffff",
        text: "#1f2937",
        accent: "#dc2626",
      },
      gradient: "from-emerald-600 to-teal-600",
    },
    {
      id: "student",
      name: "Student/Academic",
      description: "Clean and scholarly for students and academics",
      icon: GraduationCap,
      colors: {
        primary: "#1d4ed8",
        secondary: "#6b7280",
        background: "#ffffff",
        text: "#1f2937",
        accent: "#7c2d12",
      },
      gradient: "from-blue-700 to-indigo-700",
    },
    {
      id: "artist",
      name: "Artist/Musician",
      description: "Colorful and expressive for artists and musicians",
      icon: Music,
      colors: {
        primary: "#be185d",
        secondary: "#6b7280",
        background: "#ffffff",
        text: "#1f2937",
        accent: "#7c3aed",
      },
      gradient: "from-rose-600 to-purple-600",
    },
  ]

  const layouts = [
    {
      id: "modern",
      name: "Modern",
      description: "Clean and minimal design with focus on content",
      preview: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "creative",
      name: "Creative",
      description: "Bold and artistic layout with visual emphasis",
      preview: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "professional",
      name: "Professional",
      description: "Corporate and elegant design for business",
      preview: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "minimal",
      name: "Minimal",
      description: "Simple and focused with lots of white space",
      preview: "/placeholder.svg?height=200&width=300",
    },
  ]

  const colorSections = [
    { id: "primary", name: "Primary Color", description: "Main brand color" },
    { id: "secondary", name: "Secondary Color", description: "Supporting color" },
    { id: "background", name: "Background", description: "Page background color" },
    { id: "text", name: "Text Color", description: "Main text color" },
    { id: "accent", name: "Accent Color", description: "Highlight and button color" },
  ]

  const socialCategories = [
    {
      id: "professional",
      name: "Professional / Creative",
      icon: Briefcase,
      platforms: [
        { key: "behance", name: "Behance", placeholder: "https://behance.net/username" },
        { key: "dribbble", name: "Dribbble", placeholder: "https://dribbble.com/username" },
        { key: "github", name: "GitHub", placeholder: "https://github.com/username" },
        { key: "medium", name: "Medium", placeholder: "https://medium.com/@username" },
        { key: "linkedin", name: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
      ],
    },
    {
      id: "creators",
      name: "Creators, Artists & Musicians",
      icon: Music,
      platforms: [
        { key: "spotify", name: "Spotify", placeholder: "https://open.spotify.com/artist/ID" },
        { key: "soundcloud", name: "SoundCloud", placeholder: "https://soundcloud.com/username" },
        { key: "bandcamp", name: "Bandcamp", placeholder: "https://username.bandcamp.com" },
        { key: "patreon", name: "Patreon", placeholder: "https://patreon.com/username" },
        { key: "kofi", name: "Ko-fi", placeholder: "https://ko-fi.com/username" },
      ],
    },
    {
      id: "business",
      name: "Small Business / Sellers",
      icon: ShoppingBag,
      platforms: [
        { key: "shopee", name: "Shopee", placeholder: "https://shopee.ph/username" },
        { key: "lazada", name: "Lazada", placeholder: "https://www.lazada.com.ph/shop/username" },
        { key: "etsy", name: "Etsy", placeholder: "https://etsy.com/shop/username" },
        { key: "facebookPage", name: "Facebook Page", placeholder: "https://facebook.com/yourpagename" },
      ],
    },
    {
      id: "social",
      name: "Social Media",
      icon: Globe,
      platforms: [
        { key: "instagram", name: "Instagram", placeholder: "https://instagram.com/username" },
        { key: "twitter", name: "X (Twitter)", placeholder: "https://x.com/username" },
        { key: "tiktok", name: "TikTok", placeholder: "https://tiktok.com/@username" },
        { key: "youtube", name: "YouTube", placeholder: "https://youtube.com/@username" },
        { key: "discord", name: "Discord", placeholder: "https://discord.gg/username" },
        { key: "twitch", name: "Twitch", placeholder: "https://twitch.tv/username" },
        { key: "telegram", name: "Telegram", placeholder: "https://t.me/username" },
        { key: "threads", name: "Threads", placeholder: "https://www.threads.net/@username" },
        { key: "pinterest", name: "Pinterest", placeholder: "https://pinterest.com/username" },
      ],
    },
    {
      id: "extras",
      name: "Optional Extras",
      icon: Plus,
      platforms: [
        { key: "website", name: "Personal Website", placeholder: "https://myname.com" },
        { key: "whatsapp", name: "WhatsApp", placeholder: "https://wa.me/639XXXXXXXXX" },
      ],
    },
  ]

  const handleCopy = () => {
    navigator.clipboard.writeText(siteUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleColorChange = (section: string, color: string) => {
    setColorSettings((prev) => ({ ...prev, [section]: color }))
  }

  const handleThemeChange = (themeId: string) => {
    const theme = themes.find((t) => t.id === themeId)
    if (theme) {
      setSelectedTheme(themeId)
      setColorSettings(theme.colors)
    }
  }

  const handleImageUpload = (type: "profile" | "banner") => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setCropperImage(result)
          setCropperType(type)
          setShowCropper(true)
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const handleCropComplete = (croppedImage: string) => {
    if (cropperType === "profile") {
      setProfileData((prev) => ({ ...prev, profilePicture: croppedImage }))
    } else {
      setProfileData((prev) => ({ ...prev, bannerImage: croppedImage }))
    }
    setShowCropper(false)
    setCropperImage("")
  }

  const handleCropCancel = () => {
    setShowCropper(false)
    setCropperImage("")
  }

  const handleFileSelect = async (file: File, type: "profile" | "banner") => {
    try {
      // Compress the image
      const compressedImage = await compressImage(file, {
        maxWidth: type === "banner" ? 1200 : 400,
        maxHeight: type === "banner" ? 400 : 400,
        quality: 0.8,
        format: "jpeg",
      })

      setCropperImage(compressedImage)
      setCropperType(type)
      setShowCropper(true)
    } catch (error) {
      console.error("Error processing image:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-black/50 backdrop-blur-xl border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-800 to-black rounded-xl flex items-center justify-center shadow-lg border border-gray-600">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Sitezy
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/site/johndoe" target="_blank">
                <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Site
                </Button>
              </Link>
              <Avatar className="ring-2 ring-gray-600">
                <AvatarImage src={profileData.profilePicture || "/placeholder.svg?height=32&width=32"} />
                <AvatarFallback className="bg-gradient-to-r from-gray-700 to-gray-900 text-white">AJ</AvatarFallback>
              </Avatar>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-white/10">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-300">Customize your personal website with advanced controls</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Main Content */}
          <div className="xl:col-span-3">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-white/10 backdrop-blur-sm border border-gray-700">
                <TabsTrigger
                  value="profile"
                  className="flex items-center space-x-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Profile</span>
                </TabsTrigger>
                <TabsTrigger
                  value="theme"
                  className="flex items-center space-x-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  <Palette className="w-4 h-4" />
                  <span className="hidden sm:inline">Theme</span>
                </TabsTrigger>
                <TabsTrigger
                  value="layout"
                  className="flex items-center space-x-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  <Layout className="w-4 h-4" />
                  <span className="hidden sm:inline">Layout</span>
                </TabsTrigger>
                <TabsTrigger
                  value="colors"
                  className="flex items-center space-x-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden sm:inline">Colors</span>
                </TabsTrigger>
                <TabsTrigger
                  value="share"
                  className="flex items-center space-x-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                >
                  <QrCode className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                {/* Image Uploads */}
                <Card className="bg-white/10 backdrop-blur-xl border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Camera className="w-5 h-5 text-gray-400" />
                      <span>Profile Images</span>
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Upload your profile picture and banner image with drag & drop
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Banner Upload */}
                    <div className="space-y-3">
                      <Label className="text-gray-300">Banner Image (1200x400px recommended)</Label>
                      {profileData.bannerImage ? (
                        <ImagePreview
                          src={profileData.bannerImage || "/placeholder.svg"}
                          alt="Banner"
                          type="banner"
                          onEdit={() => handleImageUpload("banner")}
                          onRemove={() => setProfileData((prev) => ({ ...prev, bannerImage: "" }))}
                          className="w-full"
                        />
                      ) : (
                        <DragDropUpload
                          onFileSelect={(file) => handleFileSelect(file, "banner")}
                          type="banner"
                          maxSize={5}
                          className="w-full"
                        />
                      )}
                    </div>

                    {/* Profile Picture Upload */}
                    <div className="space-y-3">
                      <Label className="text-gray-300">Profile Picture (400x400px recommended)</Label>
                      <div className="flex items-start space-x-4">
                        <div className="w-32">
                          {profileData.profilePicture ? (
                            <ImagePreview
                              src={profileData.profilePicture || "/placeholder.svg"}
                              alt="Profile"
                              type="profile"
                              onEdit={() => handleImageUpload("profile")}
                              onRemove={() => setProfileData((prev) => ({ ...prev, profilePicture: "" }))}
                              className="w-full"
                            />
                          ) : (
                            <DragDropUpload
                              onFileSelect={(file) => handleFileSelect(file, "profile")}
                              type="profile"
                              maxSize={2}
                              className="w-full"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-300">Upload Tips</h4>
                            <ul className="text-xs text-gray-400 space-y-1">
                              <li>• Drag & drop images directly</li>
                              <li>• Square images work best for profile pictures</li>
                              <li>• Wide images (3:1 ratio) work best for banners</li>
                              <li>• Images are automatically compressed for web</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Personal Information */}
                <Card className="bg-white/10 backdrop-blur-xl border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <User className="w-5 h-5 text-gray-400" />
                      <span>Personal Information</span>
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Update your personal details (all fields are optional except email)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-gray-300">
                          What you do (optional)
                        </Label>
                        <Input
                          id="title"
                          placeholder="e.g., Artist, Student, Entrepreneur, etc."
                          value={profileData.title}
                          onChange={(e) => handleInputChange("title", e.target.value)}
                          className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio" className="text-gray-300">
                        Bio (optional)
                      </Label>
                      <Textarea
                        id="bio"
                        rows={3}
                        placeholder="Tell people about yourself..."
                        value={profileData.bio}
                        onChange={(e) => handleInputChange("bio", e.target.value)}
                        className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">
                          Email *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-gray-300">
                          Phone (optional)
                        </Label>
                        <Input
                          id="phone"
                          placeholder="+1 (555) 123-4567"
                          value={profileData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-gray-300">
                        Location (optional)
                      </Label>
                      <Input
                        id="location"
                        placeholder="City, Country"
                        value={profileData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Social Links by Category */}
                <div className="space-y-6">
                  {socialCategories.map((category) => (
                    <Card key={category.id} className="bg-white/10 backdrop-blur-xl border border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center space-x-2">
                          <category.icon className="w-5 h-5 text-gray-400" />
                          <span>{category.name}</span>
                        </CardTitle>
                        <CardDescription className="text-gray-300">
                          Add your {category.name.toLowerCase()} profiles (all optional)
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {category.platforms.map((platform) => (
                            <div key={platform.key} className="space-y-2">
                              <Label htmlFor={platform.key} className="text-gray-300">
                                {platform.name}
                              </Label>
                              <Input
                                id={platform.key}
                                placeholder={platform.placeholder}
                                value={profileData[platform.key as keyof typeof profileData]}
                                onChange={(e) => handleInputChange(platform.key, e.target.value)}
                                className="bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:border-gray-400 focus:ring-gray-400/20"
                              />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="theme" className="space-y-6">
                <Card className="bg-white/10 backdrop-blur-xl border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Palette className="w-5 h-5 text-gray-400" />
                      <span>Choose Your Theme</span>
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Select a theme that matches your personality and profession
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {themes.map((theme) => (
                        <div
                          key={theme.id}
                          className={`p-6 border-2 rounded-xl cursor-pointer transition-all backdrop-blur-sm group ${
                            selectedTheme === theme.id
                              ? "border-gray-400 bg-gray-700/50 shadow-lg scale-105"
                              : "border-gray-600 hover:border-gray-500 bg-white/5 hover:scale-102"
                          }`}
                          onClick={() => handleThemeChange(theme.id)}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div
                              className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-r ${theme.gradient} shadow-lg group-hover:scale-110 transition-transform`}
                            >
                              <theme.icon className="w-6 h-6 text-white" />
                            </div>
                            {selectedTheme === theme.id && (
                              <Badge className="bg-gray-700 text-white border border-gray-600">Selected</Badge>
                            )}
                          </div>
                          <h3 className="font-bold text-white text-lg mb-2">{theme.name}</h3>
                          <p className="text-sm text-gray-300 mb-4">{theme.description}</p>
                          <div className="flex space-x-2">
                            {Object.values(theme.colors).map((color, index) => (
                              <div
                                key={index}
                                className="w-6 h-6 rounded-full border-2 border-white/20"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="layout" className="space-y-6">
                <Card className="bg-white/10 backdrop-blur-xl border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Layout className="w-5 h-5 text-gray-400" />
                      <span>Choose Layout</span>
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Select a layout that best represents your style
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {layouts.map((layout) => (
                        <div
                          key={layout.id}
                          className={`p-4 border-2 rounded-xl cursor-pointer transition-all backdrop-blur-sm ${
                            selectedLayout === layout.id
                              ? "border-gray-400 bg-gray-700/50 shadow-lg"
                              : "border-gray-600 hover:border-gray-500 bg-white/5"
                          }`}
                          onClick={() => setSelectedLayout(layout.id)}
                        >
                          <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center border border-gray-600">
                            <Monitor className="w-8 h-8 text-gray-400" />
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-white text-lg">{layout.name}</h3>
                            {selectedLayout === layout.id && (
                              <Badge className="bg-gray-700 text-white border border-gray-600">Selected</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-300">{layout.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="colors" className="space-y-6">
                <Card className="bg-white/10 backdrop-blur-xl border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <Sparkles className="w-5 h-5 text-gray-400" />
                      <span>Custom Colors</span>
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Fine-tune your theme colors or create a completely custom palette
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {colorSections.map((section) => (
                      <div
                        key={section.id}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-gray-600"
                      >
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{section.name}</h4>
                          <p className="text-gray-400 text-sm">{section.description}</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div
                            className="w-10 h-10 rounded-lg border-2 border-gray-500"
                            style={{ backgroundColor: colorSettings[section.id as keyof typeof colorSettings] }}
                          />
                          <Input
                            type="color"
                            value={colorSettings[section.id as keyof typeof colorSettings]}
                            onChange={(e) => handleColorChange(section.id, e.target.value)}
                            className="w-16 h-10 p-1 bg-transparent border-gray-600"
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="share" className="space-y-6">
                <Card className="bg-white/10 backdrop-blur-xl border border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center space-x-2">
                      <QrCode className="w-5 h-5 text-gray-400" />
                      <span>Share Your Website</span>
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Your personal website is ready to share with the world
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Website URL</Label>
                      <div className="flex items-center space-x-2">
                        <Input value={siteUrl} readOnly className="flex-1 bg-white/10 border-gray-600 text-white" />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCopy}
                          className="border-gray-600 text-gray-300 hover:bg-gray-800"
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          <span className="ml-2 hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
                        </Button>
                        <Link href="/site/johndoe" target="_blank">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300 hover:bg-gray-800"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <div className="text-center">
                        <div className="w-56 h-56 bg-white/10 backdrop-blur-sm border-2 border-gray-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg p-4">
                          <QRCode value={siteUrl} size={200} />
                        </div>
                        <p className="text-gray-300 font-medium">Scan this QR code to visit your website</p>
                        <p className="text-gray-400 text-sm mt-1">Perfect for business cards and networking</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Live Preview */}
          <div className="xl:col-span-2">
            <div className="sticky top-8">
              <Card className="bg-white/10 backdrop-blur-xl border border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <Monitor className="w-5 h-5 text-gray-400" />
                    <span>Live Preview</span>
                  </CardTitle>
                  <CardDescription className="text-gray-300">See your changes in real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-[4/5] bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
                    <iframe
                      src={`/site/johndoe?layout=${selectedLayout}&theme=${selectedTheme}&colors=${encodeURIComponent(JSON.stringify(colorSettings))}&profile=${encodeURIComponent(JSON.stringify(profileData))}`}
                      className="w-full h-full"
                      style={{ transform: "scale(0.8)", transformOrigin: "top left", width: "125%", height: "125%" }}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-xl border border-gray-700 mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <TrendingUp className="w-5 h-5 text-gray-400" />
                    <span>Website Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Status</span>
                      <Badge className="bg-green-700 text-white border border-green-600">🟢 Live</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Theme</span>
                      <span className="text-sm font-medium text-white capitalize">{selectedTheme}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Layout</span>
                      <span className="text-sm font-medium text-white capitalize">{selectedLayout}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Last Updated</span>
                      <span className="text-sm font-medium text-white">Just now</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">Views Today</span>
                      <span className="text-sm font-medium text-green-400">+24</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {showCropper && (
        <EnhancedImageCropper
          image={cropperImage}
          aspectRatio={cropperType === "banner" ? 3 : 1}
          onCropComplete={handleCropComplete}
          onCancel={handleCropCancel}
          title={cropperType === "banner" ? "Crop Banner Image" : "Crop Profile Picture"}
          outputWidth={cropperType === "banner" ? 1200 : 400}
        />
      )}
    </div>
  )
}
