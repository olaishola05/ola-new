import { PrismaAdapter } from "@auth/prisma-adapter"
import GitHubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/app/lib/prisma";
import { NextAuthOptions, getServerSession } from 'next-auth';
import AuthService from "../api/services/user.service";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const { email, password } = credentials
          const { user, errors } = await AuthService.login(email, password)
          if (errors) {
            throw new Error(errors?.message);
          }

          return {
            id: user!.id,
            email: user?.email,
            name: user?.name,
            role: user?.role,
            image: user?.image
          };
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
          throw new Error(errorMessage)
        }
      },
    }),

    GitHubProvider({
      name: "GitHub",
      id: "github",
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/auths/signin',
  },
  session: {
    strategy: 'jwt',
  },

  callbacks: {
    jwt: async ({ token, account, user, profile }: any) => {
      if (user) {
        token.id = user.id;
        token.role = user.role
        token.image = user.image
      }
      return token;
    },

    session: async ({ session, user, token, account }: any) => {
      if (token.id) {
        session.user = {
          userId: token.id,
          name: token?.name,
          email: token?.email,
          image: token?.image || token.picture,
          role: token?.role
        }
      }
      return session;
    },
  }
}


export const getAuthSession = () => getServerSession(authOptions);
