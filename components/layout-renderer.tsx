"use client"

import { ModernLayout } from "./layouts/modern-layout"
import { CreativeLayout } from "./layouts/creative-layout"
import { ProfessionalLayout } from "./layouts/professional-layout"
import { MinimalLayout } from "./layouts/minimal-layout"

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

interface LayoutRendererProps {
  layout: string
  userData: UserData
  colors: ThemeColors
}

export function LayoutRenderer({ layout, userData, colors }: LayoutRendererProps) {
  // Render the appropriate layout based on user's saved preference
  switch (layout) {
    case "modern":
      return <ModernLayout userData={userData} colors={colors} />
    case "creative":
      return <CreativeLayout userData={userData} colors={colors} />
    case "professional":
      return <ProfessionalLayout userData={userData} colors={colors} />
    case "minimal":
      return <MinimalLayout userData={userData} colors={colors} />
    default:
      // Fallback to modern layout if unknown layout is specified
      return <ModernLayout userData={userData} colors={colors} />
  }
}
