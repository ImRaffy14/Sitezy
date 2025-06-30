import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  context: any, // 👈 bypass typing bug (TEMPORARY)
) {

  const data = await req.json();
  console.log("Received data:", data);

  try {

    // Validate input data
    if (!data.username) {
      return NextResponse.json(
        { error: "username are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { username: data.username },
      select: {
        id: true,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const existingUserProfile = await prisma.userProfile.findUnique({
        where: { userId: existingUser.id },
        select: {
            id: true,
        },
    })

    if (!existingUserProfile) {
      return NextResponse.json(
        { error: "User profile not found" },
        { status: 404 }
      );
    }

    const updateUserProfile = await prisma.userProfile.update({
        where: { userId: existingUser.id },
        data: {
            name: data.name || '',
            title: data.title || '',
            bio: data.bio || '',
            email: data.email || '',
            location: data.location || '',
            selectedLayout: data.selectedLayout || 'modern',
            selectedTheme: data.selectedTheme || 'professional',
            customColors: data.customColors || {
            primary: '#2563eb',
            secondary: '#64748b',
            background: '#ffffff',
            text: '#1e293b',
            accent: '#0ea5e9'
            },

            //Professional Links
            behance: data.behance || '',
            dribbble: data.dribbble || '',
            github: data.github || '',
            medium: data.medium || '',
            linkedin: data.linkedin || '',

            //Creators Links
            spotify: data.spotify || '',
            soundCloud: data.soundCloud || '',
            bandCamp: data.bandCamp || '',
            patreon: data.patreon || '',
            kofi: data.kofi || '',

            //Small Business Links
            shopee: data.shopee || '',
            lazada: data.lazada || '',
            Etsy: data.etsy || '',
            facebookPage: data.facebookPage || '',

            //Social Media Links
            instagram: data.instagram || '',
            twitch: data.twitch || '',
            twitter: data.twitter || '',
            tiktok: data.tiktok || '',
            youtube: data.youtube || '',
            discord: data.discord || '',
            telegram: data.telegram || '',
            threads: data.threads || '',
            pinterest: data.pinterest || '',

            //Other Links
            website: data.website || '',
            whatsApp: data.whatsApp || '',

        },
    })


    return NextResponse.json(updateUserProfile, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

