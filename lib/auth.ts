import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";
import { cookies } from "next/headers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        id: { label: "Id", type: "text" },
      },
      async authorize(credentials) {
        console.log({ credentials });
        if (!credentials?.email || !credentials?.id) {
          return null;
        }

        return {
          id: String(credentials?.id),
          email: String(credentials?.email),
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // recommended for client-side use
    maxAge: 60 * 60 * 24 * 10, // 10 day in seconds
    updateAge: 60 * 60, // refresh session every 1 hour
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 10, // JWT expires after 10 day
  },
  callbacks: {
    async signIn({ account, user }) {
      const cookieStore = await cookies();
      const visit_id = cookieStore.get("VID")?.value || null;
      if (account?.provider === "google") {
        try {
          const res = await axios.post(
            "http://localhost:3000/api/auth/google-auth",
            { ...user, visit_id: visit_id }
          );

          // ✅ Store user_id in the user object so it can be accessed in jwt callback
          user.id = res.data?.userId;
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false; // Reject sign in if API call fails
        }
      }
      return true;
    },
    // 🔹 Customize JWT
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }

      return token;
    },
    // 🔹 Send user data to client
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
      }
      return session;
    },
  },
});
