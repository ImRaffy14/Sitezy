"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
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

interface ProfessionalLayoutProps {
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

export function ProfessionalLayout({ userData, colors }: ProfessionalLayoutProps) {
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

      {/* Professional Header */}
      <header
        className="sticky top-0 z-50 backdrop-blur-md border-b shadow-sm"
        style={{
          backgroundColor: colors.background + "95",
          borderColor: colors.secondary + "20",
        }}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/20 overflow-hidden"
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
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <span className="text-xl sm:text-2xl font-bold text-white">
                    {userData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                )}
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: colors.text }}>
                  {userData.name}
                </h1>
                {hasTitle && (
                  <p className="text-lg font-medium" style={{ color: colors.primary }}>
                    {userData.title}
                  </p>
                )}
              </div>
            </div>

            {userData.website && (
              <Button
                className="px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                style={{ backgroundColor: colors.accent, color: "white" }}
                onClick={() => window.open(userData.website, "_blank")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit Website
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Professional Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* About Section */}
          {hasBio && (
            <section className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-8" style={{ color: colors.text }}>
                About Me
              </h2>
              <p className="text-xl leading-relaxed" style={{ color: colors.secondary }}>
                {userData.bio}
              </p>
            </section>
          )}

          {/* Contact Information */}
          {hasContactInfo && (
            <section>
              <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.text }}>
                Get In Touch
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {userData.phone && (
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <CardContent className="p-8 text-center">
                      <div
                        className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: colors.primary }}
                      >
                        <Phone className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                        Phone
                      </h3>
                      <p className="text-lg" style={{ color: colors.secondary }}>
                        {userData.phone}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {userData.location && (
                  <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <CardContent className="p-8 text-center">
                      <div
                        className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-lg"
                        style={{ backgroundColor: colors.accent }}
                      >
                        <MapPin className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                        Location
                      </h3>
                      <p className="text-lg" style={{ color: colors.secondary }}>
                        {userData.location}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </section>
          )}

          {/* Social Links */}
          {activeSocialLinks.length > 0 && (
            <section>
              <h2 className="text-3xl font-bold text-center mb-12" style={{ color: colors.text }}>
                Connect With Me
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-5xl mx-auto">
                {activeSocialLinks.map((social, index) => (
                  <a key={index} href={social.url} target="_blank" rel="noopener noreferrer" className="group">
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105">
                      <CardContent className="p-6 text-center">
                        <div
                          className="w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                          style={{
                            background: social.bgColor.includes("gradient") ? social.bgColor : social.bgColor,
                          }}
                        >
                          <social.icon className="w-7 h-7 text-white" />
                        </div>
                        <p className="font-semibold text-sm" style={{ color: colors.text }}>
                          {social.name}
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* Professional Footer */}
      <footer
        className="py-12 border-t"
        style={{
          backgroundColor: colors.secondary + "05",
          borderColor: colors.secondary + "20",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg" style={{ color: colors.secondary }}>
            © 2024 {userData.name}. Powered by{" "}
            <span className="font-bold" style={{ color: colors.primary }}>
              Sitezy
            </span>
          </p>
        </div>
      </footer>
    </div>
  )
}
