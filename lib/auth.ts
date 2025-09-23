import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

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
        username: { label: "username", type: "text" },
        id: { label: "Id", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.id || !credentials?.username) {
          return null;
        }

        return {
          id: String(credentials?.id),
          name: String(credentials?.username),
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
    async signIn({ account }) {
      console.log("provider:::", account?.provider);
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
