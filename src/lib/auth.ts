import { PrismaAdapter } from "@auth/prisma-adapter";

import { AuthOptions } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "dev-secret";

import bcrypt from "bcrypt";

import { db } from "@/lib/db";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db),

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",

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
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.password) {
          throw new Error("User does not exist");
        }

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token }) {
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }

      return session;
    },
  },

  secret: NEXTAUTH_SECRET,
};