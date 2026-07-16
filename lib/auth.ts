import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";
import { createServerSupabaseClient } from "@/lib/supabase";
import type { NextAuthOptions } from "next-auth";

async function lookupMember(email: string) {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase
    .from("members")
    .select("id, name, email, membership_type, member_number, status")
    .eq("email", email.toLowerCase())
    .single();
  return data ?? null;
}

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "credentials",
    credentials: {
      email:    { label: "Email",    type: "email" },
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
        id:             user.id,
        email:          user.email,
        name:           user.name,
        membershipType: user.membership_type,
        memberNumber:   user.member_number,
        status:         user.status,
      };
    },
  }),
];

// Only register social providers when credentials are configured
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.unshift(
    GoogleProvider({
      clientId:     process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  providers.push(
    FacebookProvider({
      clientId:     process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    })
  );
}

export const authOptions: NextAuthOptions = {
  providers,

  session: { strategy: "jwt" },

  pages: {
    signIn: "/members/login",
    error:  "/members/login",
  },

  callbacks: {
    async signIn({ account, user }) {
      if (account?.provider === "credentials") return true;

      const member = await lookupMember(user.email!);
      if (!member) return "/members/login?error=OAuthNotMember";

      (user as any).membershipType = member.membership_type;
      (user as any).memberNumber   = member.member_number;
      (user as any).status         = member.status;
      (user as any).memberId       = member.id;
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.membershipType = (user as any).membershipType;
        token.memberNumber   = (user as any).memberNumber;
        token.status         = (user as any).status;
        if ((user as any).memberId) token.sub = (user as any).memberId;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id             = token.sub;
        (session.user as any).membershipType = token.membershipType;
        (session.user as any).memberNumber   = token.memberNumber;
        (session.user as any).status         = token.status;
      }
      return session;
    },
  },
};
