// src/lib/mongodb-adapter.ts
import { Adapter } from "next-auth/adapters";
import mongoose from "mongoose";

// Simple in-memory adapter for development
export function MongoDBAdapter(): Adapter {
	return {
		async createUser(user) {
			// This will be handled by our custom user creation
			return {
				id: user.id,
				email: user.email!,
				emailVerified: null,
				...user,
			};
		},
		async getUser(id) {
			return null;
		},
		async getUserByEmail(email) {
			return null;
		},
		async getUserByAccount({ providerAccountId, provider }) {
			return null;
		},
		async updateUser(user) {
			return user;
		},
		async deleteUser(userId) {
			return;
		},
		async linkAccount(account) {
			return account;
		},
		async unlinkAccount({ providerAccountId, provider }) {
			return;
		},
		async createSession({ sessionToken, userId, expires }) {
			return { sessionToken, userId, expires };
		},
		async getSessionAndUser(sessionToken) {
			return null;
		},
		async updateSession({ sessionToken }) {
			return null;
		},
		async deleteSession(sessionToken) {
			return;
		},
		async createVerificationToken({ identifier, expires, token }) {
			return { identifier, expires, token };
		},
		async useVerificationToken({ identifier, token }) {
			return null;
		},
	};
}
