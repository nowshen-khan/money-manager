import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { userOperations } from "@/lib/server/dbOperations";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code",
				},
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
					const user = await userOperations.findUserByEmail(credentials.email);

					if (!user || !user.password) {
						return null;
					}

					const isPasswordValid = await userOperations.verifyPassword(
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
						image: user.image,
					};
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
					const existingUser = await userOperations.findUserByEmail(
						user.email!
					);

					if (!existingUser) {
						// Create new user with Google OAuth
						await userOperations.createUser({
							email: user.email!,
							name: user.name!,
							// No password for OAuth users
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
				token.id = user.id;
			}
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token }) {
			if (token && session.user) {
				session.user.id = token.id as string;
				session.accessToken = token.accessToken as string;
			}
			return session;
		},
	},
	pages: {
		signIn: "/signin",
		newUser: "/register",
		error: "/error",
	},
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30 days
	},
	secret: process.env.NEXTAUTH_SECRET,
};
