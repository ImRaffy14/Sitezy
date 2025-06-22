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
  Star,
  Sparkles,
  Heart,
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

interface ModernLayoutProps {
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

export function ModernLayout({ userData, colors }: ModernLayoutProps) {
  const activeSocialLinks = getActiveSocialLinks(userData)
  const hasContactInfo = userData.phone || userData.location
  const hasTitle = userData.title && userData.title.trim() !== ""
  const hasBio = userData.bio && userData.bio.trim() !== ""
  const hasProfilePicture = userData.profilePicture && userData.profilePicture.trim() !== ""
  const hasBannerImage =
    userData.bannerImage && userData.bannerImage.trim() !== "" && userData.bannerImage !== "/placeholder.svg"

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
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

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ backgroundColor: colors.primary }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-20 blur-3xl animate-pulse"
          style={{ backgroundColor: colors.accent }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse"
          style={{ backgroundColor: colors.secondary }}
        />
      </div>

      {/* Hero Section */}
      <section
        className={`relative flex items-center justify-center px-4 ${hasBannerImage ? "py-12" : "py-20 min-h-screen"}`}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Avatar */}
          <div className={`relative mb-8 ${hasBannerImage ? "-mt-16 sm:-mt-20" : ""}`}>
            <div
              className="w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 mx-auto rounded-full shadow-2xl border-4 border-white/20 backdrop-blur-sm relative overflow-hidden group"
              style={{
                background: hasProfilePicture
                  ? "transparent"
                  : `linear-gradient(135deg, ${colors.primary}, ${colors.accent})`,
              }}
            >
              {hasProfilePicture ? (
                <img
                  src={userData.profilePicture || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  <div className="relative w-full h-full flex items-center justify-center text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </>
              )}
              <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            {/* Floating elements around avatar */}
            {!hasBannerImage && (
              <>
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 animate-bounce delay-100 flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 animate-bounce delay-300 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              </>
            )}
          </div>

          {/* Name with gradient text */}
          <h1
            className="text-4xl sm:text-6xl lg:text-8xl font-black mb-6 leading-tight bg-gradient-to-r bg-clip-text text-transparent animate-fade-in"
            style={{
              backgroundImage: `linear-gradient(135deg, ${colors.text}, ${colors.primary})`,
            }}
          >
            {userData.name}
          </h1>

          {/* Title with animated underline */}
          {hasTitle && (
            <div className="relative mb-8">
              <p className="text-xl sm:text-2xl lg:text-3xl font-semibold" style={{ color: colors.accent }}>
                {userData.title}
              </p>
              <div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-24 rounded-full animate-pulse"
                style={{ backgroundColor: colors.accent }}
              />
            </div>
          )}

          {/* Bio with better typography */}
          {hasBio && (
            <p
              className="text-lg sm:text-xl lg:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto font-light"
              style={{ color: colors.secondary }}
            >
              {userData.bio}
            </p>
          )}

          {/* Social Links - Floating Cards */}
          {activeSocialLinks.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 max-w-4xl mx-auto mb-12">
              {activeSocialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group transform hover:scale-110 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <div
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-lg flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:shadow-2xl transition-all duration-300"
                      style={{
                        background: social.bgColor.includes("gradient")
                          ? social.bgColor
                          : `linear-gradient(135deg, ${social.bgColor}, ${social.bgColor}dd)`,
                      }}
                    >
                      <social.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-20 blur transition-opacity duration-300" />
                    <p className="text-xs sm:text-sm font-medium mt-2 text-center" style={{ color: colors.text }}>
                      {social.name}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Contact Info - Elegant Cards */}
          {hasContactInfo && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {userData.phone && (
                <div
                  className="p-6 rounded-2xl backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  style={{ backgroundColor: colors.background + "80" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-lg mb-1" style={{ color: colors.text }}>
                    Phone
                  </p>
                  <p className="text-sm" style={{ color: colors.secondary }}>
                    {userData.phone}
                  </p>
                </div>
              )}

              {userData.location && (
                <div
                  className="p-6 rounded-2xl backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  style={{ backgroundColor: colors.background + "80" }}
                >
                  <div
                    className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-semibold text-lg mb-1" style={{ color: colors.text }}>
                    Location
                  </p>
                  <p className="text-sm" style={{ color: colors.secondary }}>
                    {userData.location}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 text-center">
        <div className="absolute inset-0 backdrop-blur-sm" style={{ backgroundColor: colors.primary + "10" }} />
        <div className="relative">
          <p style={{ color: colors.secondary }}>
            © 2024 {userData.name}. Built with{" "}
            <span className="font-semibold" style={{ color: colors.primary }}>
              Sitezy
            </span>
          </p>
        </div>
      </footer>
    </div>
  )
}
