// src/app/api/auth/[...nextauth]/route.ts
import { type NextAuthOptions } from "next-auth";
import { Account, Profile, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { userDB } from "@/lib/dbOperations";
import bcrypt from "bcryptjs";
import type { AdapterUser } from "next-auth/adapters";

interface MyUser extends AdapterUser {
	profession?: string;
}

export const authOptions: NextAuthOptions = {
	providers: [
		// Google OAuth
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			profile(profile) {
				return {
					id: profile.sub,
					name: profile.name,
					email: profile.email,
					image: profile.picture,
				};
			},
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				try {
					const user = await userDB.findUserByEmail(credentials.email);

					if (!user) {
						return null;
					}

					const isPasswordValid = await userDB.verifyPassword(
						credentials.password,
						user.password
					);

					if (!isPasswordValid) {
						return null;
					}

					return {
						id: user._id.toString(),
						email: user.email,
						name: user.name,
						profession: user.profession,
					} as MyUser;
				} catch (error) {
					console.error("Auth error:", error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			// Handle Google OAuth sign-in
			if (account?.provider === "google") {
				try {
					// Check if user already exists
					const existingUser = await userDB.findUserByEmail(user.email!);

					if (!existingUser) {
						// Create new user with Google OAuth
						await userDB.createUser({
							email: user.email!,
							name: user.name!,
							password: await bcrypt.hash(
								Math.random().toString(36) + Date.now().toString(),
								12
							), // Random password
							profession: "other",
							maritalStatus: "single",
							familyMembers: 1,
						});
					}
					return true;
				} catch (error) {
					console.error("Google OAuth error:", error);
					return false;
				}
			}
			return true;
		},
		async jwt({ token, user, account }) {
			if (user) {
				token.id = (user as MyUser).id;
				token.profession = (user as MyUser).profession;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id as string;
				session.user.profession = token.profession as string;
			}
			return session;
		},
		async redirect({ url, baseUrl }) {
			// Redirect to dashboard after sign in
			if (url.startsWith(baseUrl)) return url;
			return `${baseUrl}/dashboard`;
		},
	},
	pages: {
		signIn: "/login",
		newUser: "/register",
	},
	session: {
		strategy: "jwt" as const,
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	secret: process.env.NEXTAUTH_SECRET,
};
