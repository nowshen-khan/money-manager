import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { Inter } from "next/font/google";

const InterFont = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		default: "Money Manager - Smart Finance",
		template: "%s | Money Manager",
	},
	description: "AI-powered money management for Bangladeshi users",
	keywords: ["finance", "money", "budget", "expense tracker", "Bangladesh"],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="font-sans antialiased">
				<ThemeProvider>
					<SessionProvider>{children}</SessionProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
