import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
    try {
        const { email, name, password, username } = await req.json()
        

        if (!email || !name || !password || !username) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 422 }
            )
        }
        
        if (password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters long" },
                { status: 422 }
            )
        }
        
        if (!email.includes("@")) {
            return NextResponse.json(
                { error: "Invalid email" },
                { status: 422 }
            )
        }
        
        const existingUser = await prisma.user.findUnique({ where: { email } })
            if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 422 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                username
            }
        })

        // Create empty user profile after user creation
        await prisma.userProfile.create({
            data: {
                userId: user.id,
                selectedLayout: 'modern',
                selectedTheme: 'professional',
                customColors: {
                  primary: '#2563eb',
                  secondary: '#64748b',
                  background: '#ffffff',
                  text: '#1e293b',
                  accent: '#0ea5e9'
                }
            }
        })

        return NextResponse.json(
            { data: user },
            { status: 201 }
        )
        
    } catch (error) {
        console.error("Signup error:", error)
        return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
        )
    }
}