"use client"

import {
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Music,
  Palette,
  ShoppingBag,
  MessageCircle,
  Gamepad2,
  Headphones,
  Camera,
  Heart,
  Zap,
} from "lucide-react"

interface UserData {
  name: string
  title?: string
  bio?: string
  email: string
  phone?: string
  location?: string
  profilePicture?: string
  bannerImage?: string
  [key: string]: any
}

interface ThemeColors {
  primary: string
  secondary: string
  background: string
  text: string
  accent: string
}

interface CreativeLayoutProps {
  userData: UserData
  colors: ThemeColors
}

const getSocialIcon = (platform: string) => {
  const iconMap: { [key: string]: { icon: any; color: string; bgColor: string } } = {
    website: { icon: Globe, color: "#6366f1", bgColor: "#6366f1" },
    linkedin: { icon: Linkedin, color: "#0077b5", bgColor: "#0077b5" },
    github: { icon: Github, color: "#333", bgColor: "#333" },
    twitter: { icon: Twitter, color: "#1da1f2", bgColor: "#1da1f2" },
    instagram: {
      icon: Instagram,
      color: "#e4405f",
      bgColor: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
    },
    youtube: { icon: Youtube, color: "#ff0000", bgColor: "#ff0000" },
    behance: { icon: Palette, color: "#1769ff", bgColor: "#1769ff" },
    dribbble: { icon: Palette, color: "#ea4c89", bgColor: "#ea4c89" },
    medium: { icon: Globe, color: "#00ab6c", bgColor: "#00ab6c" },
    spotify: { icon: Music, color: "#1db954", bgColor: "#1db954" },
    soundcloud: { icon: Headphones, color: "#ff5500", bgColor: "#ff5500" },
    bandcamp: { icon: Music, color: "#629aa0", bgColor: "#629aa0" },
    patreon: { icon: Heart, color: "#f96854", bgColor: "#f96854" },
    kofi: { icon: Heart, color: "#ff5f5f", bgColor: "#ff5f5f" },
    shopee: { icon: ShoppingBag, color: "#ee4d2d", bgColor: "#ee4d2d" },
    lazada: { icon: ShoppingBag, color: "#0f146d", bgColor: "#0f146d" },
    etsy: { icon: ShoppingBag, color: "#f16521", bgColor: "#f16521" },
    facebookPage: { icon: Globe, color: "#1877f2", bgColor: "#1877f2" },
    tiktok: { icon: Camera, color: "#000", bgColor: "linear-gradient(45deg, #ff0050, #00f2ea)" },
    discord: { icon: MessageCircle, color: "#5865f2", bgColor: "#5865f2" },
    twitch: { icon: Gamepad2, color: "#9146ff", bgColor: "#9146ff" },
    telegram: { icon: MessageCircle, color: "#0088cc", bgColor: "#0088cc" },
    threads: { icon: Globe, color: "#000", bgColor: "#000" },
    pinterest: { icon: Camera, color: "#bd081c", bgColor: "#bd081c" },
    whatsapp: { icon: MessageCircle, color: "#25d366", bgColor: "#25d366" },
  }
  return iconMap[platform] || { icon: Globe, color: "#6366f1", bgColor: "#6366f1" }
}

const getActiveSocialLinks = (userData: UserData) => {
  const socialPlatforms = [
    { key: "website", name: "Website" },
    { key: "linkedin", name: "LinkedIn" },
    { key: "github", name: "GitHub" },
    { key: "twitter", name: "X" },
    { key: "instagram", name: "Instagram" },
    { key: "youtube", name: "YouTube" },
    { key: "behance", name: "Behance" },
    { key: "dribbble", name: "Dribbble" },
    { key: "medium", name: "Medium" },
    { key: "spotify", name: "Spotify" },
    { key: "soundcloud", name: "SoundCloud" },
    { key: "bandcamp", name: "Bandcamp" },
    { key: "patreon", name: "Patreon" },
    { key: "kofi", name: "Ko-fi" },
    { key: "shopee", name: "Shopee" },
    { key: "lazada", name: "Lazada" },
    { key: "etsy", name: "Etsy" },
    { key: "facebookPage", name: "Facebook" },
    { key: "tiktok", name: "TikTok" },
    { key: "discord", name: "Discord" },
    { key: "twitch", name: "Twitch" },
    { key: "telegram", name: "Telegram" },
    { key: "threads", name: "Threads" },
    { key: "pinterest", name: "Pinterest" },
    { key: "whatsapp", name: "WhatsApp" },
  ]

  return socialPlatforms
    .filter((platform) => userData[platform.key] && userData[platform.key].trim() !== "")
    .map((platform) => {
      const iconData = getSocialIcon(platform.key)
      return {
        ...platform,
        ...iconData,
        url: userData[platform.key],
      }
    })
}

export function CreativeLayout({ userData, colors }: CreativeLayoutProps) {
  const activeSocialLinks = getActiveSocialLinks(userData)
  const hasContactInfo = userData.phone || userData.location
  const hasTitle = userData.title && userData.title.trim() !== ""
  const hasBio = userData.bio && userData.bio.trim() !== ""
  const hasProfilePicture = userData.profilePicture && userData.profilePicture.trim() !== ""
  const hasBannerImage =
    userData.bannerImage && userData.bannerImage.trim() !== "" && userData.bannerImage !== "/placeholder.svg"

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: colors.background }}>
      {/* Banner Section */}
      {hasBannerImage && (
        <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
          <img
            src={userData.bannerImage || "/placeholder.svg"}
            alt="Banner"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      {/* Creative Background Pattern */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, ${colors.primary}20 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, ${colors.accent}20 0%, transparent 50%)`,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(45deg, transparent 40%, ${colors.secondary}05 50%, transparent 60%)`,
          }}
        />
      </div>

      <div className="relative min-h-screen flex items-center">
        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="text-center lg:text-left space-y-8">
              {/* Creative Profile Section */}
              <div className={`relative ${hasBannerImage ? "-mt-16 sm:-mt-20" : ""}`}>
                <div
                  className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl mx-auto lg:mx-0 shadow-2xl relative overflow-hidden group transform rotate-3 hover:rotate-0 transition-transform duration-500"
                  style={{
                    background: hasProfilePicture
                      ? "transparent"
                      : `conic-gradient(from 0deg, ${colors.primary}, ${colors.accent}, ${colors.primary})`,
                  }}
                >
                  {hasProfilePicture ? (
                    <img
                      src={userData.profilePicture || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  ) : (
                    <div
                      className="absolute inset-2 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl font-black text-white"
                      style={{ backgroundColor: colors.background }}
                    >
                      <span style={{ color: colors.text }}>
                        {userData.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  )}
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full animate-ping"
                    style={{ backgroundColor: colors.accent }}
                  />
                </div>
              </div>

              {/* Creative Typography */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                  <span
                    className="block bg-gradient-to-r bg-clip-text text-transparent"
                    style={{ backgroundImage: `linear-gradient(135deg, ${colors.text}, ${colors.primary})` }}
                  >
                    {userData.name.split(" ")[0]}
                  </span>
                  <span
                    className="block text-3xl sm:text-4xl lg:text-5xl font-light"
                    style={{ color: colors.secondary }}
                  >
                    {userData.name.split(" ").slice(1).join(" ")}
                  </span>
                </h1>

                {hasTitle && (
                  <div className="relative">
                    <p className="text-2xl sm:text-3xl font-bold" style={{ color: colors.accent }}>
                      {userData.title}
                    </p>
                    <div
                      className="absolute -bottom-1 left-0 lg:left-0 h-1 w-20 rounded-full"
                      style={{ backgroundColor: colors.accent }}
                    />
                  </div>
                )}

                {hasBio && (
                  <p
                    className="text-lg sm:text-xl leading-relaxed max-w-lg mx-auto lg:mx-0"
                    style={{ color: colors.secondary }}
                  >
                    {userData.bio}
                  </p>
                )}
              </div>

              {/* Contact Info - Creative Cards */}
              {hasContactInfo && (
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  {userData.phone && (
                    <div
                      className="flex items-center space-x-3 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      style={{ backgroundColor: colors.primary }}
                    >
                      <Phone className="w-5 h-5 text-white" />
                      <span className="text-white font-medium">{userData.phone}</span>
                    </div>
                  )}
                  {userData.location && (
                    <div
                      className="flex items-center space-x-3 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      style={{ backgroundColor: colors.accent }}
                    >
                      <MapPin className="w-5 h-5 text-white" />
                      <span className="text-white font-medium">{userData.location}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column - Social Links Mosaic */}
            <div className="relative">
              {activeSocialLinks.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-w-md mx-auto">
                  {activeSocialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative"
                      style={{
                        animationDelay: `${index * 150}ms`,
                        transform: `rotate(${((index % 4) - 1.5) * 5}deg)`,
                      }}
                    >
                      <div
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-0"
                        style={{
                          background: social.bgColor.includes("gradient") ? social.bgColor : social.bgColor,
                        }}
                      >
                        <social.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                      </div>
                      <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-300" />
                      <p
                        className="text-xs font-medium mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: colors.text }}
                      >
                        {social.name}
                      </p>
                    </a>
                  ))}
                </div>
              )}

              {/* Decorative Elements */}
              <div
                className="absolute -top-8 -right-8 w-16 h-16 rounded-full opacity-20 animate-pulse"
                style={{ backgroundColor: colors.primary }}
              />
              <div
                className="absolute -bottom-8 -left-8 w-12 h-12 rounded-full opacity-20 animate-pulse delay-1000"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Creative Footer */}
      <footer className="relative py-12">
        <div className="container mx-auto px-4 text-center">
          <div
            className="inline-block px-8 py-4 rounded-full backdrop-blur-sm border border-white/20 shadow-lg"
            style={{ backgroundColor: colors.background + "80" }}
          >
            <p style={{ color: colors.secondary }}>
              © 2024 {userData.name} • Crafted with{" "}
              <Zap className="inline w-4 h-4 mx-1" style={{ color: colors.accent }} />{" "}
              <span className="font-semibold" style={{ color: colors.primary }}>
                Sitezy
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
