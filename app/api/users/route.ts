import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    const data = await req.json();
    const { username } = data;

    if (!username) {
        return NextResponse.json(
            { error: "Username is required" },
            { status: 400 }
        );
    }

    try {
        const user = await prisma.user.findUnique({
            where: { username },
            include: { profile: true }
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        if (!user.profile) {
            return NextResponse.json(
                { error: "User profile not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(user.profile, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}