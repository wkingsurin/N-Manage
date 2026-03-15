import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt, { compare } from "bcryptjs";
import { ZodError } from "zod";
import { signInSchema } from "./lib/zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				try {
					const { email, password } = await signInSchema.parseAsync(
						credentials
					);

					const user = await prisma.user.findUnique({
						where: { email },
					});

					if (!user || !user.password) {
						return null;
					}

					const isMatch = await compare(password, user.password);

					if (!isMatch) {
						return null;
					}

					return {
						id: user.id,
						email: user.email,
					};
				} catch (err) {
					if (err instanceof ZodError) {
						return null;
					}
					throw err;
				}
			},
		}),
	],
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
			}
			return session;
		},
	},
});
