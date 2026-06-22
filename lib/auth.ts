import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { createServerSupabaseClient } from "@/lib/supabase";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const supabase = createServerSupabaseClient();
        const { data: user, error } = await supabase
          .from("members")
          .select("*")
          .eq("email", credentials.email.toLowerCase())
          .single();

        if (error || !user) return null;

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password_hash
        );
        if (!passwordMatch) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          membershipType: user.membership_type,
          memberNumber: user.member_number,
          status: user.status,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/members/login",
    error: "/members/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.membershipType = (user as any).membershipType;
        token.memberNumber = (user as any).memberNumber;
        token.status = (user as any).status;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub;
        (session.user as any).membershipType = token.membershipType;
        (session.user as any).memberNumber = token.memberNumber;
        (session.user as any).status = token.status;
      }
      return session;
    },
  },
};
