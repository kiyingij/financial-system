import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

/**
 * POST/api/login
 * Authenticate a user */

export async function POST(request: NextRequest) {
    try{
        //Read json body
        const body = await request.json();
        //Extract email and pasword
        const {email, password} = body;

        //Validate input
        if(!email || !password) {
            return NextResponse.json (
                {
                    success: false,
                    message: "Email and password are required",
                },
                {status: 400}
            );
        }

        //Find user by email
        const user = await prisma.user.findUnique({
            where: {
                email,
            }
        });

        //Check whether user exists

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                {status: 404}
            );
        }

        //Validate password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        //Invalid password

        if (!passwordMatch) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid credentials",
                },
                {status: 401}
            );
        }

        // success login
        return NextResponse.json(
            {
                success: true,
                message: "Login successful",
                user: {
                    id:user.id,
                    name:user.name,
                    email:user.email,
                    roleId:user.roleId
                }
            },
            {status: 200}
        );
    } catch (error) {
        console.error("Login error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error",
            },
            {status: 500}
        );
    }
}
