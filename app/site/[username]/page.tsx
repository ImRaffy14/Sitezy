"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios from "axios"
import { LayoutRenderer } from "@/components/layout-renderer"

const defaultUserData = {
  name: "",
  title: "",
  bio: "",
  email: "",
  phone: "",
  location: "",
  profilePicture: "",
  bannerImage: "",
  selectedLayout: "modern",
  selectedTheme: "professional",
  customColors: {
    primary: "#2563eb",
    secondary: "#64748b",
    background: "#ffffff",
    text: "#1e293b",
    accent: "#0ea5e9",
  },
  // ...other social fields as needed...
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
    const fetchProfile = async () => {
      try {
        const res = await axios.post("/api/users", { username: params.username })
        const profile = res.data
        if (profile) {
          setUserData(profile)
          setLayout(profile.selectedLayout || "modern")
          setColors(profile.customColors || themes.professional)
        }
      } catch (e) {
        setUserData(defaultUserData)
        setLayout("modern")
        setColors(themes.professional)
      }
    }
    fetchProfile()
  }, [params.username])

  // URL params for live preview (optional)
  useEffect(() => {
    const layoutParam = searchParams.get("layout")
    const themeParam = searchParams.get("theme")
    const colorsParam = searchParams.get("colors")
    const profileParam = searchParams.get("profile")

    let finalUserData = { ...userData }
    let finalLayout = layout
    let finalColors = colors

    if (profileParam) {
      try {
        const parsedProfile = JSON.parse(decodeURIComponent(profileParam))
        finalUserData = { ...finalUserData, ...parsedProfile }
      } catch (e) {}
    }
    if (layoutParam) finalLayout = layoutParam
    if (themeParam && themes[themeParam as keyof typeof themes]) finalColors = themes[themeParam as keyof typeof themes]
    if (colorsParam) {
      try {
        finalColors = JSON.parse(decodeURIComponent(colorsParam))
      } catch (e) {}
    }
    setUserData(finalUserData)
    setLayout(finalLayout)
    setColors(finalColors)
  }, [searchParams])

  return <LayoutRenderer layout={layout} userData={userData} colors={colors} />
}
