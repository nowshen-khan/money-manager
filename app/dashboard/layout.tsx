"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "loading") return;

		if (!session) {
			router.push("/login");
		}
	}, [session, status, router]);

	if (status === "loading") {
		return (
			<div className="min-h-screen flex items-center justify-center">
				<div className="text-center">
					<div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
					<p className="mt-4 text-muted-foreground">Loading...</p>
				</div>
			</div>
		);
	}

	if (!session) {
		return null;
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Header */}
			<header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
				<div className="container flex h-16 items-center justify-between px-4">
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
							<span className="text-sm font-bold text-white">💰</span>
						</div>
						<span className="text-xl font-bold">MoneyManager</span>
					</div>

					<div className="flex items-center gap-4">
						<span className="text-sm text-muted-foreground">
							Welcome, {session.user?.name}
						</span>
						<ThemeToggle />
						<Button variant="outline" size="sm" onClick={() => signOut()}>
							Logout
						</Button>
					</div>
				</div>
			</header>

			{/* Main Content */}
			<main className="container px-4 py-8">{children}</main>
		</div>
	);
}
