// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Money Manager - Smart Finance Assistant",
	description: "AI-powered money management for Bangladeshi users",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<SessionProvider>
					<main className="min-h-screen bg-background">{children}</main>
				</SessionProvider>
			</body>
		</html>
	);
}
