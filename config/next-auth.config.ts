import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { authOptions } from "@/pages/api/auth/[...nextauth].js";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/utils/db";
import { User } from "@/utils/models";
import bcrypt from "bcrypt";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const { db } = await connectToDatabase();
        const user = await db.collection("users").findOne({ email: credentials.email });

        if (!user) {
          return null;
        }

        const isValidPassword = await bcrypt.compare(credentials.password, user.password);

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          name: user.firstName,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token as any;
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    signOut: "/api/auth/signout",
  },
});