"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { LayoutRenderer } from "@/components/layout-renderer"

// Mock database - In real app, this would come from your database
const mockUserDatabase = {
  johndoe: {
    id: "johndoe",
    name: "Alex Johnson",
    title: "Full Stack Developer & UI/UX Designer",
    bio: "Passionate about creating beautiful, functional digital experiences. I love turning complex problems into simple, elegant solutions.",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    profilePicture: "",
    bannerImage: "",
    // Social links
    website: "https://alexjohnson.dev",
    linkedin: "https://linkedin.com/in/alexjohnson",
    github: "https://github.com/alexjohnson",
    twitter: "https://x.com/alexjohnson",
    instagram: "https://instagram.com/alexjohnson",
    youtube: "https://youtube.com/@alexjohnson",
    behance: "https://behance.net/alexjohnson",
    dribbble: "https://dribbble.com/alexjohnson",
    medium: "https://medium.com/@alexjohnson",
    spotify: "https://open.spotify.com/user/alexjohnson",
    // Layout and theme preferences
    selectedLayout: "modern",
    selectedTheme: "professional",
    customColors: {
      primary: "#2563eb",
      secondary: "#64748b",
      background: "#ffffff",
      text: "#1e293b",
      accent: "#0ea5e9",
    },
  },
  janedoe: {
    id: "janedoe",
    name: "Jane Smith",
    title: "Digital Artist & Creative Director",
    bio: "Creating visual stories that inspire and connect. Specializing in brand identity, illustration, and digital art.",
    email: "jane@example.com",
    phone: "+1 (555) 987-6543",
    location: "New York, NY",
    profilePicture: "",
    bannerImage: "",
    // Social links
    website: "https://janesmith.art",
    instagram: "https://instagram.com/janesmithart",
    behance: "https://behance.net/janesmith",
    dribbble: "https://dribbble.com/janesmith",
    etsy: "https://etsy.com/shop/janesmithart",
    patreon: "https://patreon.com/janesmith",
    // Layout and theme preferences
    selectedLayout: "creative",
    selectedTheme: "artist",
    customColors: {
      primary: "#be185d",
      secondary: "#6b7280",
      background: "#ffffff",
      text: "#1f2937",
      accent: "#7c3aed",
    },
  },
  mikegamer: {
    id: "mikegamer",
    name: "Mike Chen",
    title: "Pro Gamer & Streamer",
    bio: "Competitive esports player and content creator. Streaming daily on Twitch and creating gaming content.",
    email: "mike@example.com",
    phone: "",
    location: "Los Angeles, CA",
    profilePicture: "",
    bannerImage: "",
    // Social links
    twitch: "https://twitch.tv/mikegamer",
    youtube: "https://youtube.com/@mikegamer",
    discord: "https://discord.gg/mikegamer",
    twitter: "https://x.com/mikegamer",
    instagram: "https://instagram.com/mikegamer",
    // Layout and theme preferences
    selectedLayout: "modern",
    selectedTheme: "gamer",
    customColors: {
      primary: "#10b981",
      secondary: "#6b7280",
      background: "#0f172a",
      text: "#f1f5f9",
      accent: "#06ffa5",
    },
  },
  sarahbiz: {
    id: "sarahbiz",
    name: "Sarah Williams",
    title: "Business Consultant & Entrepreneur",
    bio: "Helping startups and small businesses grow through strategic planning and digital transformation.",
    email: "sarah@example.com",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    profilePicture: "",
    bannerImage: "",
    // Social links
    website: "https://sarahwilliams.biz",
    linkedin: "https://linkedin.com/in/sarahwilliams",
    twitter: "https://x.com/sarahbiz",
    medium: "https://medium.com/@sarahwilliams",
    // Layout and theme preferences
    selectedLayout: "professional",
    selectedTheme: "business",
    customColors: {
      primary: "#059669",
      secondary: "#6b7280",
      background: "#ffffff",
      text: "#1f2937",
      accent: "#dc2626",
    },
  },
}

// Default user data
const defaultUserData = {
  name: "Alex Johnson",
  title: "",
  bio: "",
  email: "alex@example.com",
  phone: "",
  location: "",
  profilePicture: "",
  bannerImage: "",
  selectedLayout: "modern",
  selectedTheme: "professional",
  customColors: {
    primary: "#3b82f6",
    secondary: "#64748b",
    background: "#ffffff",
    text: "#1f2937",
    accent: "#f59e0b",
  },
}

const themes = {
  professional: {
    primary: "#2563eb",
    secondary: "#64748b",
    background: "#ffffff",
    text: "#1e293b",
    accent: "#0ea5e9",
  },
  creative: {
    primary: "#7c3aed",
    secondary: "#6b7280",
    background: "#ffffff",
    text: "#1f2937",
    accent: "#f59e0b",
  },
  gamer: {
    primary: "#10b981",
    secondary: "#6b7280",
    background: "#0f172a",
    text: "#f1f5f9",
    accent: "#06ffa5",
  },
  developer: {
    primary: "#6366f1",
    secondary: "#9ca3af",
    background: "#111827",
    text: "#f9fafb",
    accent: "#8b5cf6",
  },
  influencer: {
    primary: "#ec4899",
    secondary: "#6b7280",
    background: "#ffffff",
    text: "#1f2937",
    accent: "#f97316",
  },
  business: {
    primary: "#059669",
    secondary: "#6b7280",
    background: "#ffffff",
    text: "#1f2937",
    accent: "#dc2626",
  },
  student: {
    primary: "#1d4ed8",
    secondary: "#6b7280",
    background: "#ffffff",
    text: "#1f2937",
    accent: "#7c2d12",
  },
  artist: {
    primary: "#be185d",
    secondary: "#6b7280",
    background: "#ffffff",
    text: "#1f2937",
    accent: "#7c3aed",
  },
}

export default function PersonalWebsite({ params }: { params: { username: string } }) {
  const searchParams = useSearchParams()
  const [userData, setUserData] = useState(defaultUserData)
  const [layout, setLayout] = useState("modern")
  const [colors, setColors] = useState(themes.professional)

  useEffect(() => {
    // Get user data from mock database
    const dbUser = mockUserDatabase[params.username as keyof typeof mockUserDatabase]

    // URL parameters override database values (for live preview)
    const layoutParam = searchParams.get("layout")
    const themeParam = searchParams.get("theme")
    const colorsParam = searchParams.get("colors")
    const profileParam = searchParams.get("profile")

    // Start with database user or default
    let finalUserData = dbUser ? { ...dbUser } : { ...defaultUserData }
    let finalLayout = dbUser?.selectedLayout || "modern"
    let finalColors = dbUser?.customColors || themes.professional

    // Override with URL parameters if present (for live preview)
    if (profileParam) {
      try {
        const parsedProfile = JSON.parse(decodeURIComponent(profileParam))
        finalUserData = { ...finalUserData, ...parsedProfile }
      } catch (e) {
        console.error("Failed to parse profile:", e)
      }
    }

    if (layoutParam) {
      finalLayout = layoutParam
    }

    if (themeParam && themes[themeParam as keyof typeof themes]) {
      finalColors = themes[themeParam as keyof typeof themes]
    }

    if (colorsParam) {
      try {
        const parsedColors = JSON.parse(decodeURIComponent(colorsParam))
        finalColors = parsedColors
      } catch (e) {
        console.error("Failed to parse colors:", e)
      }
    }

    setUserData(finalUserData)
    setLayout(finalLayout)
    setColors(finalColors)
  }, [searchParams, params.username])

  return <LayoutRenderer layout={layout} userData={userData} colors={colors} />
}
