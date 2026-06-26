import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
               
            },
            
            async authorize(credentials) {
                //check if credentials were provided
                if(!credentials?.email || !credentials?.password) {
                    throw new Error ("Email and password are required");
                }

                //Find user by email
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email,
                    },

                    include: {
                        role: true,
                        company: true,
                    },
                });

                //user doesn't exist

                if (!user) {
                    throw new Error("user not found");
                }

                //compare password with hashed password in database
                const PasswordMatch = await bcrypt.compare(
                    credentials.password, 
                    user.password
                );

                if (!PasswordMatch) {
                    throw new Error("Invalid credentials");
                }

                //return session user

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role.name,
                    company: user.company.name,
                };
            },
        }),
    ],

    pages: {
        signIn: "/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
    
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.name = user.name;
                token.email = user.email;
                token.company = user.company;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.name = token.name;
                session.user.email = token.email;
            }
            return session;
        }
    }
};
