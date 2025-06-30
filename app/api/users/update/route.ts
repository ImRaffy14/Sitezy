import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  req: Request,
  context: any, // 👈 bypass typing bug (TEMPORARY)
) {

  const data = await req.json();

  try {

    // Validate input data
    if (!data.email || !data.username) {
      return NextResponse.json(
        { error: "Email and username are required" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
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

    const existingUsername = await prisma.user.findUnique({
      where: { username: data.username },
      select: {
        id: true,
      },
    });

    if (existingUsername) {
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 409 }
      );
    }
    
    const updatedUser = await prisma.user.update({
      where: { email: data.email },
      data,
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
      },
    });
    
    await prisma.userProfile.create({
        data: {
            userId: updatedUser.id,
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

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function DELETE(
//   req: Request,
//   context: any // 👈 bypass typing bug (TEMPORARY)
// ) {
//   const userId = context.params.id;

//   try {
//     await prisma.user.delete({
//       where: { id: userId },
//     });

//     return NextResponse.json(
//       { message: "User deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error deleting user:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
