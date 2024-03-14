import { PrismaAdapter } from "@auth/prisma-adapter"
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/app/lib/prisma";
import { NextAuthOptions, getServerSession } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auths/signin',
  },
  callbacks: {
    jwt: async ({ token, profile, account, user, }: any) => {
      if (user) {
        token.idToken = user.idToken;
        token.accessToken = user.accessToken;
      }
      return token;
    },

    session: async ({ session, user, account }: any) => {
      session.user = {
        userId: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
      };
      return session;
    },
  }
}


export const getAuthSession = () => getServerSession(authOptions);
