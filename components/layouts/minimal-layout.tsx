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

interface MinimalLayoutProps {
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

export function MinimalLayout({ userData, colors }: MinimalLayoutProps) {
  const activeSocialLinks = getActiveSocialLinks(userData)
  const hasContactInfo = userData.phone || userData.location
  const hasTitle = userData.title && userData.title.trim() !== ""
  const hasBio = userData.bio && userData.bio.trim() !== ""
  const hasProfilePicture = userData.profilePicture && userData.profilePicture.trim() !== ""
  const hasBannerImage =
    userData.bannerImage && userData.bannerImage.trim() !== "" && userData.bannerImage !== "/placeholder.svg"

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-20"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-2xl mx-auto text-center space-y-12">
        {/* Banner Section */}
        {hasBannerImage && (
          <div className="relative h-32 sm:h-40 rounded-2xl overflow-hidden mb-8 -mt-12">
            <img
              src={userData.bannerImage || "/placeholder.svg"}
              alt="Banner"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        )}

        {/* Minimal Profile */}
        <div className="space-y-8">
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full shadow-2xl border-4 border-white/10 flex items-center justify-center relative overflow-hidden group"
            style={{
              background: hasProfilePicture
                ? "transparent"
                : `linear-gradient(135deg, ${colors.primary}40, ${colors.accent}40)`,
              backdropFilter: "blur(20px)",
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
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                <span className="relative text-2xl sm:text-3xl font-bold" style={{ color: colors.text }}>
                  {userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </>
            )}
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light" style={{ color: colors.text }}>
              {userData.name}
            </h1>

            {hasTitle && (
              <p className="text-xl sm:text-2xl font-medium" style={{ color: colors.primary }}>
                {userData.title}
              </p>
            )}

            {hasBio && (
              <p className="text-lg leading-relaxed max-w-xl mx-auto" style={{ color: colors.secondary }}>
                {userData.bio}
              </p>
            )}
          </div>
        </div>

        {/* Minimal Contact */}
        {hasContactInfo && (
          <div className="flex flex-wrap justify-center gap-6">
            {userData.phone && (
              <div
                className="flex items-center space-x-3 px-6 py-3 rounded-full border-2 hover:shadow-lg transition-all duration-300"
                style={{
                  borderColor: colors.primary + "40",
                  backgroundColor: colors.primary + "10",
                }}
              >
                <Phone className="w-5 h-5" style={{ color: colors.primary }} />
                <span className="font-medium" style={{ color: colors.text }}>
                  {userData.phone}
                </span>
              </div>
            )}

            {userData.location && (
              <div
                className="flex items-center space-x-3 px-6 py-3 rounded-full border-2 hover:shadow-lg transition-all duration-300"
                style={{
                  borderColor: colors.accent + "40",
                  backgroundColor: colors.accent + "10",
                }}
              >
                <MapPin className="w-5 h-5" style={{ color: colors.accent }} />
                <span className="font-medium" style={{ color: colors.text }}>
                  {userData.location}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Minimal Social Links */}
        {activeSocialLinks.length > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            {activeSocialLinks.slice(0, 8).map((social, index) => (
              <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="group">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110 border-2 border-white/10"
                  style={{
                    background: social.bgColor.includes("gradient") ? social.bgColor : social.bgColor + "20",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <social.icon
                    className="w-6 h-6 sm:w-7 sm:h-7"
                    style={{
                      color: social.bgColor.includes("gradient") ? "white" : social.color,
                    }}
                  />
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Minimal Footer */}
        <div className="pt-12">
          <p className="text-sm" style={{ color: colors.secondary }}>
            Built with{" "}
            <span className="font-medium" style={{ color: colors.primary }}>
              Sitezy
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
